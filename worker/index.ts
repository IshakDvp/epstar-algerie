/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  BUCKET: R2Bucket;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "application/acad", "application/x-acad", "application/octet-stream"]);

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8" } });
}

function cleanFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120) || "attachment";
}

async function createQuoteRequest(request: Request, env: Env): Promise<Response> {
  if (!env.DB || !env.BUCKET) return json({ error: "Service de demandes indisponible." }, 503);
  const form = await request.formData();
  const read = (name: string) => String(form.get(name) || "").trim();
  const required = ["name", "phone", "email", "project", "wilaya"];
  if (required.some((name) => !read(name))) return json({ error: "Veuillez compléter les champs obligatoires." }, 400);
  const email = read("email");
  if (!/^\S+@\S+\.\S+$/.test(email)) return json({ error: "Adresse e-mail invalide." }, 400);

  const attachments = form.getAll("attachments").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (attachments.length > MAX_ATTACHMENTS) return json({ error: `Maximum ${MAX_ATTACHMENTS} fichiers autorisés.` }, 400);
  for (const file of attachments) {
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (file.size > MAX_ATTACHMENT_SIZE || !extension || !["pdf", "jpg", "jpeg", "png", "dwg"].includes(extension) || (file.type && !ALLOWED_ATTACHMENT_TYPES.has(file.type))) {
      return json({ error: "Un fichier est invalide. Formats acceptés : PDF, JPG, PNG, DWG (10 Mo max)." }, 400);
    }
  }

  let items: Array<{ id?: string; name: string; reference?: string; thumbnail?: string; dimensions?: string; finish?: string; quantity?: number }> = [];
  try { items = JSON.parse(read("items") || "[]"); } catch { return json({ error: "Produits sélectionnés invalides." }, 400); }
  if (!Array.isArray(items)) return json({ error: "Produits sélectionnés invalides." }, 400);

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const requestNumber = `EPS-${now.slice(0, 10).replaceAll("-", "")}-${id.slice(0, 6).toUpperCase()}`;
  const uploaded: Array<{ id: string; objectKey: string; originalName: string; mimeType: string; sizeBytes: number }> = [];
  for (const file of attachments) {
    const attachmentId = crypto.randomUUID();
    const objectKey = `quote-attachments/${id}/${attachmentId}-${cleanFileName(file.name)}`;
    await env.BUCKET.put(objectKey, file.stream(), { httpMetadata: { contentType: file.type || "application/octet-stream" } });
    uploaded.push({ id: attachmentId, objectKey, originalName: file.name, mimeType: file.type || "application/octet-stream", sizeBytes: file.size });
  }

  const statements = [
    env.DB.prepare(`INSERT INTO quote_requests (id, request_number, status, language, full_name, phone, email, company_name, job_title, project_type, wilaya, commune_address, installation_required, delivery_timeline, budget_range, custom_budget, message, created_at, updated_at) VALUES (?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(id, requestNumber, read("language") || "fr", read("name"), read("phone"), email, read("company"), read("role"), read("project"), read("wilaya"), read("address"), read("installation") === "yes" ? 1 : 0, read("urgency") || null, read("budget") || null, read("customBudget"), read("message"), now, now),
    ...items.slice(0, 30).map((item) => env.DB.prepare(`INSERT INTO quote_request_items (id, quote_request_id, product_id, product_name, product_reference, thumbnail_key, dimensions, finish, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(crypto.randomUUID(), id, item.id || null, String(item.name || "Produit sur mesure"), String(item.reference || ""), String(item.thumbnail || ""), String(item.dimensions || ""), String(item.finish || ""), Math.max(1, Math.min(9999, Number(item.quantity) || 1)))),
    ...uploaded.map((file) => env.DB.prepare(`INSERT INTO quote_attachments (id, quote_request_id, object_key, original_name, mime_type, size_bytes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`)
      .bind(file.id, id, file.objectKey, file.originalName, file.mimeType, file.sizeBytes, now)),
  ];
  try { await env.DB.batch(statements); } catch (error) { console.error("quote persistence failed", error); return json({ error: "Impossible d’enregistrer votre demande. Réessayez dans un instant." }, 500); }
  return json({ ok: true, requestNumber });
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    if (url.pathname === "/api/quote") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
      return createQuoteRequest(request, env);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
