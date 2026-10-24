/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  BUCKET: R2Bucket;
  RESEND_API_KEY?: string;
  MAIL_FROM?: string;
  INITIAL_ADMIN_EMAIL?: string;
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
const MAX_PRODUCT_IMAGES = 8;
const MAX_PRODUCT_IMAGE_SIZE = 8 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "application/acad", "application/x-acad", "application/octet-stream"]);
const ALLOWED_PRODUCT_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8" } });
}

function cleanFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120) || "attachment";
}

const encoder = new TextEncoder();
const hashToken = async (value: string) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)))).map((x) => x.toString(16).padStart(2, "0")).join("");
const randomToken = () => Array.from(crypto.getRandomValues(new Uint8Array(32))).map((x) => x.toString(16).padStart(2, "0")).join("");
const slugify = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

async function requestMagicLink(request: Request, env: Env) {
  const body = await request.json().catch(() => ({})) as { email?: string };
  const email = String(body.email || "").trim().toLowerCase();
  const accepted = json({ ok: true, message: "Si cette adresse est autorisée, un lien de connexion vient d’être envoyé." });
  if (!/^\S+@\S+\.\S+$/.test(email) || !env.RESEND_API_KEY || !env.MAIL_FROM) return accepted;
  let user = await env.DB.prepare("SELECT id, name, role FROM users WHERE email = ? AND active = 1").bind(email).first<{ id:string; name:string; role:string }>();
  if (!user && env.INITIAL_ADMIN_EMAIL?.toLowerCase() === email) {
    const now = new Date().toISOString(); const id = crypto.randomUUID();
    await env.DB.prepare("INSERT INTO users (id, email, name, role, active, created_at, updated_at) VALUES (?, ?, ?, 'admin', 1, ?, ?)").bind(id, email, email.split("@")[0], now, now).run();
    user = { id, name: email.split("@")[0], role: "admin" };
  }
  if (!user) return accepted;
  const token = randomToken(), tokenHash = await hashToken(token), now = new Date(), expires = new Date(now.getTime() + 15 * 60 * 1000).toISOString();
  await env.DB.prepare("INSERT INTO auth_tokens (id, user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?, ?)").bind(crypto.randomUUID(), user.id, tokenHash, expires, now.toISOString()).run();
  const link = new URL("/api/admin/verify", request.url); link.searchParams.set("token", token);
  await fetch("https://api.resend.com/emails", { method:"POST", headers:{ Authorization:`Bearer ${env.RESEND_API_KEY}`, "content-type":"application/json" }, body:JSON.stringify({ from:env.MAIL_FROM, to:[email], subject:"EPSTAR — lien de connexion", html:`<p>Bonjour ${user.name},</p><p>Utilisez ce lien pour accéder au tableau de bord EPSTAR. Il expire dans 15 minutes.</p><p><a href="${link.href}">Accéder au tableau de bord</a></p>` }) });
  return accepted;
}

async function verifyMagicLink(request: Request, env: Env) {
  const token = new URL(request.url).searchParams.get("token") || ""; if (!token) return new Response("Invalid link", { status:400 });
  const tokenHash = await hashToken(token), now = new Date().toISOString();
  const record = await env.DB.prepare("SELECT id, user_id FROM auth_tokens WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?").bind(tokenHash, now).first<{ id:string; user_id:string }>();
  if (!record) return new Response("This sign-in link has expired or was already used.", { status:401 });
  await env.DB.prepare("UPDATE auth_tokens SET used_at = ? WHERE id = ?").bind(now, record.id).run();
  const session = randomToken(), sessionHash = await hashToken(session), expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  await env.DB.prepare("INSERT INTO admin_sessions (id, user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?, ?)").bind(crypto.randomUUID(), record.user_id, sessionHash, expires, now).run();
  return new Response(null, { status:302, headers:{ location:"/admin", "set-cookie":`epstar_admin=${session}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800` } });
}

function cookieValue(request: Request, name: string) { return request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1) || ""; }
async function adminUser(request: Request, env: Env) {
  const token = cookieValue(request, "epstar_admin"); if (!token) return null;
  const hash = await hashToken(token), now = new Date().toISOString();
  return env.DB.prepare("SELECT users.id, users.name, users.email, users.role FROM admin_sessions JOIN users ON users.id = admin_sessions.user_id WHERE admin_sessions.token_hash = ? AND admin_sessions.expires_at > ? AND users.active = 1").bind(hash, now).first<{id:string;name:string;email:string;role:string}>();
}
async function adminOverview(request: Request, env: Env) {
  const user = await adminUser(request, env); if (!user) return json({ error:"Unauthorized" }, 401);
  const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM quote_requests WHERE status = 'new'").first<{total:number}>();
  const recent = await env.DB.prepare("SELECT id, request_number AS requestNumber, full_name AS fullName, company_name AS companyName, project_type AS projectType, wilaya, status, created_at AS createdAt FROM quote_requests ORDER BY created_at DESC LIMIT 10").all();
  return json({ user, newRequests:count?.total || 0, recent:recent.results || [] });
}

async function adminRequests(request: Request, env: Env) {
  if (!await adminUser(request, env)) return json({ error:"Unauthorized" }, 401);
  const requests = await env.DB.prepare("SELECT id, request_number AS requestNumber, full_name AS fullName, company_name AS companyName, project_type AS projectType, wilaya, status, created_at AS createdAt FROM quote_requests ORDER BY created_at DESC").all();
  return json({ requests: requests.results || [] });
}
async function adminRequestDetail(request: Request, env: Env, id: string) {
  if (!await adminUser(request, env)) return json({ error:"Unauthorized" }, 401);
  const record = await env.DB.prepare("SELECT id, request_number AS requestNumber, full_name AS fullName, phone, email, company_name AS companyName, job_title AS jobTitle, project_type AS projectType, wilaya, commune_address AS communeAddress, installation_required AS installationRequired, delivery_timeline AS deliveryTimeline, budget_range AS budgetRange, custom_budget AS customBudget, message, language, status, created_at AS createdAt FROM quote_requests WHERE id = ?").bind(id).first<Record<string, unknown>>();
  if (!record) return json({ error:"Not found" }, 404);
  if (request.method === "PATCH") {
    const body = await request.json().catch(()=>({})) as { status?: string }; const allowed = new Set(["new","in_progress","quoted","won","lost","archived"]);
    if (!body.status || !allowed.has(body.status)) return json({ error:"Invalid status" }, 400);
    await env.DB.prepare("UPDATE quote_requests SET status = ?, updated_at = ? WHERE id = ?").bind(body.status, new Date().toISOString(), id).run();
    record.status = body.status;
  }
  const items = await env.DB.prepare("SELECT id, product_name AS productName, product_reference AS productReference, dimensions, finish, quantity FROM quote_request_items WHERE quote_request_id = ?").bind(id).all();
  const attachments = await env.DB.prepare("SELECT id, original_name AS originalName, mime_type AS mimeType, size_bytes AS sizeBytes FROM quote_attachments WHERE quote_request_id = ? ORDER BY created_at").bind(id).all();
  return json({ request:{ ...record, installationRequired: Boolean(record.installationRequired), items:items.results || [], attachments:attachments.results || [] } });
}
async function adminAttachment(request: Request, env: Env, id: string) {
  if (!await adminUser(request, env)) return json({ error:"Unauthorized" }, 401);
  const attachment = await env.DB.prepare("SELECT object_key AS objectKey, original_name AS originalName, mime_type AS mimeType FROM quote_attachments WHERE id = ?").bind(id).first<{objectKey:string;originalName:string;mimeType:string}>();
  if (!attachment) return json({ error:"Not found" }, 404);
  const object = await env.BUCKET.get(attachment.objectKey); if (!object) return json({ error:"File not found" }, 404);
  return new Response(object.body, { headers:{ "content-type":attachment.mimeType, "content-disposition":`attachment; filename="${cleanFileName(attachment.originalName)}"`, "cache-control":"private, no-store" } });
}

type CategoryInput = { titleFr?: string; titleAr?: string; titleEn?: string; parentId?: string | null; isVisible?: boolean };
type ProductInput = { reference?:string; nameFr?:string; nameAr?:string; nameEn?:string; categoryId?:string|null; dimensions?:string; finishes?:string; materials?:string; isFeatured?:boolean; isVisible?:boolean };
type ProductImageRecord = { id:string; productId:string; objectKey:string; altFr:string; altAr:string; altEn:string; sortOrder:number; createdAt:string };
async function adminCategories(request: Request, env: Env) {
  if (!await adminUser(request, env)) return json({ error:"Unauthorized" }, 401);
  if (request.method === "GET") {
    const categories = await env.DB.prepare("SELECT id, parent_id AS parentId, slug, title_fr AS titleFr, title_ar AS titleAr, title_en AS titleEn, is_visible AS isVisible, sort_order AS sortOrder FROM categories ORDER BY parent_id IS NOT NULL, sort_order, title_fr").all();
    return json({ categories:categories.results || [] });
  }
  const body = await request.json().catch(()=>({})) as CategoryInput;
  const titleFr = String(body.titleFr || "").trim(); if (!titleFr) return json({ error:"Le nom français est requis." }, 400);
  const now = new Date().toISOString(), id = crypto.randomUUID(); let slug = slugify(titleFr) || `categorie-${id.slice(0, 8)}`;
  const exists = await env.DB.prepare("SELECT id FROM categories WHERE slug = ?").bind(slug).first(); if (exists) slug = `${slug}-${id.slice(0, 6)}`;
  await env.DB.prepare("INSERT INTO categories (id, parent_id, slug, title_fr, title_ar, title_en, is_visible, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(id, body.parentId || null, slug, titleFr, String(body.titleAr || titleFr).trim(), String(body.titleEn || titleFr).trim(), body.isVisible === false ? 0 : 1, now, now).run();
  return json({ ok:true, id }, 201);
}
async function adminCategory(request: Request, env: Env, id: string) {
  if (!await adminUser(request, env)) return json({ error:"Unauthorized" }, 401);
  if (request.method === "DELETE") {
    const used = await env.DB.prepare("SELECT (SELECT COUNT(*) FROM categories WHERE parent_id = ?) + (SELECT COUNT(*) FROM products WHERE category_id = ?) AS total").bind(id, id).first<{total:number}>();
    if ((used?.total || 0) > 0) return json({ error:"Cette catégorie contient des éléments. Masquez-la ou déplacez son contenu avant suppression." }, 409);
    await env.DB.prepare("DELETE FROM categories WHERE id = ?").bind(id).run(); return json({ ok:true });
  }
  const body = await request.json().catch(()=>({})) as CategoryInput;
  const titleFr = String(body.titleFr || "").trim(); if (!titleFr) return json({ error:"Le nom français est requis." }, 400);
  if (body.parentId === id) return json({ error:"Une catégorie ne peut pas être son propre parent." }, 400);
  const result = await env.DB.prepare("UPDATE categories SET parent_id = ?, title_fr = ?, title_ar = ?, title_en = ?, is_visible = ?, updated_at = ? WHERE id = ?").bind(body.parentId || null, titleFr, String(body.titleAr || titleFr).trim(), String(body.titleEn || titleFr).trim(), body.isVisible === false ? 0 : 1, new Date().toISOString(), id).run();
  if (!result.meta.changes) return json({ error:"Not found" }, 404); return json({ ok:true });
}
async function adminProducts(request: Request, env: Env) {
  if (!await adminUser(request, env)) return json({ error:"Unauthorized" }, 401);
  if (request.method === "GET") {
    const products = await env.DB.prepare("SELECT products.id, products.reference, products.slug, products.name_fr AS nameFr, products.name_ar AS nameAr, products.name_en AS nameEn, products.category_id AS categoryId, categories.title_fr AS categoryTitle, products.dimensions, products.finishes, products.materials, products.is_featured AS isFeatured, products.is_visible AS isVisible, (SELECT COUNT(*) FROM product_images WHERE product_images.product_id = products.id) AS imageCount FROM products LEFT JOIN categories ON categories.id = products.category_id ORDER BY products.created_at DESC").all();
    return json({ products: products.results || [] });
  }
  const body = await request.json().catch(()=>({})) as ProductInput; const reference = String(body.reference || "").trim().toUpperCase(), nameFr = String(body.nameFr || "").trim();
  if (!reference || !nameFr) return json({ error:"La référence et le nom français sont requis." }, 400);
  const existing = await env.DB.prepare("SELECT id FROM products WHERE reference = ?").bind(reference).first(); if (existing) return json({ error:"Cette référence existe déjà." }, 409);
  const now = new Date().toISOString(), id = crypto.randomUUID(); let slug = slugify(nameFr) || `produit-${id.slice(0, 8)}`;
  const slugExists = await env.DB.prepare("SELECT id FROM products WHERE slug = ?").bind(slug).first(); if (slugExists) slug = `${slug}-${id.slice(0, 6)}`;
  await env.DB.prepare("INSERT INTO products (id, category_id, slug, reference, name_fr, name_ar, name_en, dimensions, finishes, materials, is_featured, is_visible, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(id, body.categoryId || null, slug, reference, nameFr, String(body.nameAr || nameFr).trim(), String(body.nameEn || nameFr).trim(), String(body.dimensions || "").trim(), JSON.stringify(String(body.finishes || "").split(",").map(v=>v.trim()).filter(Boolean)), JSON.stringify(String(body.materials || "").split(",").map(v=>v.trim()).filter(Boolean)), body.isFeatured ? 1 : 0, body.isVisible === false ? 0 : 1, now, now).run();
  return json({ ok:true, id }, 201);
}
async function adminProduct(request: Request, env: Env, id: string) {
  if (!await adminUser(request, env)) return json({ error:"Unauthorized" }, 401);
  if (request.method === "DELETE") {
    const images = await env.DB.prepare("SELECT object_key AS objectKey FROM product_images WHERE product_id = ?").bind(id).all<{objectKey:string}>();
    await env.DB.prepare("DELETE FROM products WHERE id = ?").bind(id).run();
    await Promise.all((images.results || []).map((image) => env.BUCKET.delete(image.objectKey)));
    return json({ ok:true });
  }
  const body = await request.json().catch(()=>({})) as ProductInput; const reference = String(body.reference || "").trim().toUpperCase(), nameFr = String(body.nameFr || "").trim();
  if (!reference || !nameFr) return json({ error:"La référence et le nom français sont requis." }, 400);
  const duplicate = await env.DB.prepare("SELECT id FROM products WHERE reference = ? AND id != ?").bind(reference, id).first(); if (duplicate) return json({ error:"Cette référence existe déjà." }, 409);
  const result = await env.DB.prepare("UPDATE products SET category_id=?, reference=?, name_fr=?, name_ar=?, name_en=?, dimensions=?, finishes=?, materials=?, is_featured=?, is_visible=?, updated_at=? WHERE id=?").bind(body.categoryId || null, reference, nameFr, String(body.nameAr || nameFr).trim(), String(body.nameEn || nameFr).trim(), String(body.dimensions || "").trim(), JSON.stringify(String(body.finishes || "").split(",").map(v=>v.trim()).filter(Boolean)), JSON.stringify(String(body.materials || "").split(",").map(v=>v.trim()).filter(Boolean)), body.isFeatured ? 1 : 0, body.isVisible === false ? 0 : 1, new Date().toISOString(), id).run();
  if (!result.meta.changes) return json({ error:"Not found" }, 404); return json({ ok:true });
}

function imageResponse(object: R2ObjectBody, contentType: string, cacheControl: string) {
  return new Response(object.body, { headers:{ "content-type":contentType || "application/octet-stream", "cache-control":cacheControl, etag:object.httpEtag } });
}
async function adminProductImages(request: Request, env: Env, productId: string) {
  if (!await adminUser(request, env)) return json({ error:"Unauthorized" }, 401);
  const product = await env.DB.prepare("SELECT id FROM products WHERE id = ?").bind(productId).first();
  if (!product) return json({ error:"Produit introuvable." }, 404);
  if (request.method === "GET") {
    const images = await env.DB.prepare("SELECT id, product_id AS productId, object_key AS objectKey, alt_fr AS altFr, alt_ar AS altAr, alt_en AS altEn, sort_order AS sortOrder, created_at AS createdAt FROM product_images WHERE product_id = ? ORDER BY sort_order, created_at").bind(productId).all<ProductImageRecord>();
    return json({ images:(images.results || []).map((image) => ({ ...image, url:`/api/admin/product-images/file/${image.id}` })) });
  }
  const form = await request.formData();
  const files = form.getAll("images").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (!files.length) return json({ error:"Sélectionnez au moins une image." }, 400);
  const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM product_images WHERE product_id = ?").bind(productId).first<{total:number}>();
  if ((count?.total || 0) + files.length > MAX_PRODUCT_IMAGES) return json({ error:`Maximum ${MAX_PRODUCT_IMAGES} photos par produit.` }, 400);
  for (const file of files) {
    if (!ALLOWED_PRODUCT_IMAGE_TYPES.has(file.type) || file.size > MAX_PRODUCT_IMAGE_SIZE) return json({ error:"Images JPG, PNG ou WEBP uniquement (8 Mo maximum par image)." }, 400);
  }
  const now = new Date().toISOString(); const inserted: ProductImageRecord[] = [];
  let sortOrder = count?.total || 0;
  for (const file of files) {
    const id = crypto.randomUUID(); const objectKey = `product-images/${productId}/${id}-${cleanFileName(file.name)}`;
    await env.BUCKET.put(objectKey, file.stream(), { httpMetadata:{ contentType:file.type } });
    await env.DB.prepare("INSERT INTO product_images (id, product_id, object_key, alt_fr, alt_ar, alt_en, sort_order, created_at) VALUES (?, ?, ?, '', '', '', ?, ?)").bind(id, productId, objectKey, sortOrder++, now).run();
    inserted.push({ id, productId, objectKey, altFr:"", altAr:"", altEn:"", sortOrder:sortOrder - 1, createdAt:now });
  }
  return json({ ok:true, images:inserted.map((image) => ({ ...image, url:`/api/admin/product-images/file/${image.id}` })) }, 201);
}
async function adminProductImage(request: Request, env: Env, id: string) {
  if (!await adminUser(request, env)) return json({ error:"Unauthorized" }, 401);
  const image = await env.DB.prepare("SELECT id, product_id AS productId, object_key AS objectKey FROM product_images WHERE id = ?").bind(id).first<{id:string;productId:string;objectKey:string}>();
  if (!image) return json({ error:"Image introuvable." }, 404);
  if (request.method === "DELETE") { await env.DB.prepare("DELETE FROM product_images WHERE id = ?").bind(id).run(); await env.BUCKET.delete(image.objectKey); return json({ ok:true }); }
  const first = await env.DB.prepare("SELECT id FROM product_images WHERE product_id = ? ORDER BY sort_order, created_at LIMIT 1").bind(image.productId).first<{id:string}>();
  if (first?.id !== id) {
    await env.DB.batch([
      env.DB.prepare("UPDATE product_images SET sort_order = sort_order + 1 WHERE product_id = ?").bind(image.productId),
      env.DB.prepare("UPDATE product_images SET sort_order = 0 WHERE id = ?").bind(id),
    ]);
  }
  return json({ ok:true });
}
async function adminProductImageFile(request: Request, env: Env, id: string) {
  if (!await adminUser(request, env)) return json({ error:"Unauthorized" }, 401);
  const image = await env.DB.prepare("SELECT object_key AS objectKey FROM product_images WHERE id = ?").bind(id).first<{objectKey:string}>();
  if (!image) return json({ error:"Not found" }, 404); const object = await env.BUCKET.get(image.objectKey); if (!object) return json({ error:"File not found" }, 404);
  return imageResponse(object, object.httpMetadata?.contentType || "", "private, no-store");
}
async function publicCatalogue(request: Request, env: Env) {
  const url = new URL(request.url); const ids = (url.searchParams.get("ids") || "").split(",").filter(Boolean).slice(0, 30);
  const where = ids.length ? `AND products.id IN (${ids.map(() => "?").join(",")})` : "";
  const products = await env.DB.prepare(`SELECT products.id, products.slug, products.reference, products.name_fr AS nameFr, products.name_ar AS nameAr, products.name_en AS nameEn, products.dimensions, products.finishes, products.materials, products.is_featured AS isFeatured, categories.id AS categoryId, categories.parent_id AS parentId, categories.title_fr AS categoryFr, categories.title_ar AS categoryAr, categories.title_en AS categoryEn, parents.id AS parentCategoryId, parents.title_fr AS parentFr, parents.title_ar AS parentAr, parents.title_en AS parentEn, (SELECT id FROM product_images WHERE product_id = products.id ORDER BY sort_order, created_at LIMIT 1) AS imageId FROM products LEFT JOIN categories ON categories.id = products.category_id LEFT JOIN categories parents ON parents.id = categories.parent_id WHERE products.is_visible = 1 ${where} ORDER BY products.is_featured DESC, products.created_at DESC`).bind(...ids).all<Record<string, unknown>>();
  const categories = ids.length ? [] : await env.DB.prepare("SELECT id, parent_id AS parentId, slug, title_fr AS titleFr, title_ar AS titleAr, title_en AS titleEn FROM categories WHERE is_visible = 1 ORDER BY parent_id IS NOT NULL, sort_order, title_fr").all();
  return json({ products:(products.results || []).map((product) => ({ ...product, imageUrl:product.imageId ? `/api/catalogue/images/${product.imageId}` : null })), categories:categories.results || [] });
}
async function publicProduct(request: Request, env: Env, slug: string) {
  const product = await env.DB.prepare("SELECT products.id FROM products WHERE slug = ? AND is_visible = 1").bind(slug).first<{id:string}>();
  if (!product) return json({ error:"Not found" }, 404);
  const url = new URL(request.url); url.pathname = "/api/catalogue"; url.searchParams.set("ids", product.id);
  return publicCatalogue(new Request(url, request), env);
}
async function publicProductImage(env: Env, id: string) {
  const image = await env.DB.prepare("SELECT product_images.object_key AS objectKey FROM product_images JOIN products ON products.id = product_images.product_id WHERE product_images.id = ? AND products.is_visible = 1").bind(id).first<{objectKey:string}>();
  if (!image) return json({ error:"Not found" }, 404); const object = await env.BUCKET.get(image.objectKey); if (!object) return json({ error:"File not found" }, 404);
  return imageResponse(object, object.httpMetadata?.contentType || "", "public, max-age=86400");
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
    if (url.pathname === "/api/admin/request-link" && request.method === "POST") return requestMagicLink(request, env);
    if (url.pathname === "/api/admin/verify" && request.method === "GET") return verifyMagicLink(request, env);
    if (url.pathname === "/api/admin/overview" && request.method === "GET") return adminOverview(request, env);
    if (url.pathname === "/api/admin/requests" && request.method === "GET") return adminRequests(request, env);
    const requestMatch = url.pathname.match(/^\/api\/admin\/requests\/([^/]+)$/);
    if (requestMatch && (request.method === "GET" || request.method === "PATCH")) return adminRequestDetail(request, env, requestMatch[1]);
    const attachmentMatch = url.pathname.match(/^\/api\/admin\/attachments\/([^/]+)$/);
    if (attachmentMatch && request.method === "GET") return adminAttachment(request, env, attachmentMatch[1]);
    if (url.pathname === "/api/admin/categories" && (request.method === "GET" || request.method === "POST")) return adminCategories(request, env);
    const categoryMatch = url.pathname.match(/^\/api\/admin\/categories\/([^/]+)$/);
    if (categoryMatch && (request.method === "PATCH" || request.method === "DELETE")) return adminCategory(request, env, categoryMatch[1]);
    if (url.pathname === "/api/admin/products" && (request.method === "GET" || request.method === "POST")) return adminProducts(request, env);
    const productMatch = url.pathname.match(/^\/api\/admin\/products\/([^/]+)$/);
    if (productMatch && (request.method === "PATCH" || request.method === "DELETE")) return adminProduct(request, env, productMatch[1]);
    const productImagesMatch = url.pathname.match(/^\/api\/admin\/products\/([^/]+)\/images$/);
    if (productImagesMatch && (request.method === "GET" || request.method === "POST")) return adminProductImages(request, env, productImagesMatch[1]);
    const productImageFileMatch = url.pathname.match(/^\/api\/admin\/product-images\/file\/([^/]+)$/);
    if (productImageFileMatch && request.method === "GET") return adminProductImageFile(request, env, productImageFileMatch[1]);
    const productImageMatch = url.pathname.match(/^\/api\/admin\/product-images\/([^/]+)$/);
    if (productImageMatch && (request.method === "PATCH" || request.method === "DELETE")) return adminProductImage(request, env, productImageMatch[1]);
    if (url.pathname === "/api/catalogue" && request.method === "GET") return publicCatalogue(request, env);
    const publicProductMatch = url.pathname.match(/^\/api\/catalogue\/products\/([^/]+)$/);
    if (publicProductMatch && request.method === "GET") return publicProduct(request, env, publicProductMatch[1]);
    const publicImageMatch = url.pathname.match(/^\/api\/catalogue\/images\/([^/]+)$/);
    if (publicImageMatch && request.method === "GET") return publicProductImage(env, publicImageMatch[1]);

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
