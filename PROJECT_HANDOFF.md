# EPSTAR Algeria — Technical Handoff

## Current source and stopping point — 24 October 2026, v5

Production v4 confirmed successful by user: demo import added 13 and skipped existing D02; follow-up filter/edit test reported passed. Earlier ASSETS blocker is resolved.

Active source: /workspace/scratch/b8c9077386e2/restore/source/epstar-algerie-main. The old epstar-algerie checkout is stale. User deploys through existing GitHub Desktop repository; do not create a new Cloudflare or Sites project. No executor push credentials.

v5 implemented locally, not yet deployed: admin offers/contact/custom pages, public managed offers and /pages/:slug, shared footer contact and published nested page links, quote WhatsApp/email recipients and selected-offer message. New APIs require admin role; public content excludes drafts and children of hidden parents. Two page levels only; parent delete blocked while children exist. Content is plain text rendered by React, never HTML.

Persistence uses existing site_settings: contact plus cms:offers:<id> / cms:pages:<id> JSON records. No schema migration. R2 cms/<uuid> for offer uploads (JPG/PNG/WEBP, 8 MiB). Demo offer import is explicit and idempotent. Existing images are retained on replace/delete; orphan cleanup deferred.

Entry points: worker/content.ts, app/content-model.ts, app/admin/content-manager.tsx + CSS, app/components/use-content.ts, app/offers/managed-offers.tsx, app/pages/[slug]/page.tsx. API: GET /api/content; GET/POST/PUT/DELETE /api/admin/content/{offers,pages}[/:id]; POST /api/admin/content/offers/import; GET/PUT /api/admin/content/contact; POST /api/admin/content/media; GET /api/content/media/:id. Admin authentication wrapper is in worker/index.ts.

Build passed and 7 node tests passed, including actual built Worker 401/403 and offers/page HTML route checks. Full tsc remains blocked by baseline Cloudflare types and quote/start-project tuple errors (no claim of a clean typecheck). Browser QA unavailable: managed preview failed with vite not found. Production test pending. See PROJECT_STATUS.md for Arabic deployment/test checklist and known limitations. New pages are client-rendered with an unavailable state, not HTTP404; SEO and rich text are deferred. Homepage product/project sections still static.

## Repository and deployment

- Active local source: `/workspace/scratch/b8c9077386e2/restore/source/epstar-algerie-main` (older checkout is stale).
- Remote: `https://github.com/IshakDvp/epstar-algerie.git`
- Worker: `epstar-algerie`
- Production URL: `https://epstar-algerie.ishakdib-contact.workers.dev`
- D1 database: `epstar-algerie-db` (`33fadf06-2c4a-44d7-872d-5dadaa452e35`)
- R2 binding: `BUCKET` -> `site-creator-r2`

## Important environment values

- `INITIAL_ADMIN_EMAIL` = `ishakdib.contact@gmail.com`
- `RESEND_API_KEY` is a Cloudflare secret.
- `MAIL_FROM` = `EPSTAR <onboarding@resend.dev>` (temporary sender).

## Published baseline

- Dashboard management was pushed through GitHub Desktop and Cloudflare deployed commit message `feat: EPSTAR dashboard management` successfully on 24 October 2026 (Cloudflare version `db6f18ee`).
- Production verification passed for admin login, categories/subcategories, and the test product `Bureau Direction D02`.

The executor itself still has no GitHub credentials; use the user's GitHub Desktop for future pushes.

## Dashboard routes

- `/api/admin/overview` — protected overview.
- `/api/admin/requests` — protected quote list.
- `/api/admin/requests/:id` — protected quote detail / status patch.
- `/api/admin/attachments/:id` — protected R2 attachment download.
- `/api/admin/categories` — protected category list/create.
- `/api/admin/categories/:id` — protected category edit/delete.
- `/api/admin/products` — protected product list/create.
- `/api/admin/products/:id` — protected product edit/delete.
- `/api/admin/products/:id/images` — protected product-image list/upload (JPG, PNG, WEBP; 8 MB each; max 8).
- `/api/admin/product-images/:id` — protected primary-image patch/delete.
- `/api/admin/product-images/file/:id` — protected image preview.
- `/api/catalogue` — public managed-product list, including primary image URLs; supports `?ids=id1,id2` for the quote cart.
- `/api/catalogue/products/:slug` — public managed-product detail.
- `/api/catalogue/images/:id` — public cached product image.
- `/api/admin/projects` and `/api/admin/projects/:id` — protected realisation CRUD.
- `/api/admin/projects/:id/images` and `/api/admin/project-images/file/:id` — protected project photo upload/preview.
- `/api/projects` and `/api/projects/images/:id` — public realisation feed and images.
- `/api/projects/:slug` — public managed-realisation detail and ordered gallery images.
- `/api/admin/client-logos` — protected client-logo list/upload; JPG, PNG or WEBP, 8 MB maximum.
- `/api/admin/client-logos/:id` — protected visibility update/delete.
- `/api/admin/client-logos/file/:id` and `/api/client-logos/:id` — protected preview and public logo file.
- `/api/client-logos` — public visible client-logo list for the homepage.

## Validation

- `npm run build` passed after client-logo management and the public trust-section implementation.
- Production client-logo lifecycle passed on 24 October 2026: test logo `Tijaro` uploaded, listed with visibility controls, and displayed on the home page.
- Do not add/delete the untracked user file: `public/images/.shop-3d.png.EXMD9g`.
- Do not add/delete the untracked generated file `.epstar-project-language-footer.tar.gz.L9hrSy`.

## Exact next action

Copy v5 overlay into the existing GitHub Desktop clone, commit and push; wait for Cloudflare success. Admin → Nos offres → import demo offers. Then verify an offer edit/photo/hide, contact footer/quote links, main page + child publish/hide, and FR/AR/EN mobile. Record results in PROJECT_STATUS.md. No new project, migration or credential change required.
