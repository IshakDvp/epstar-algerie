# EPSTAR Algeria — Technical Handoff

## Current source and stopping point — 25 October 2026, v7 LOCAL / production pending

User approved full content control staged: menus/page registry first, then existing page section editors starting with home. v7 implements those menus and home editor only. Do NOT claim all built-in page bodies are editable. Remaining about/fitout/services/quote section editors and rich custom-page blocks are next after tests.

v6 production confirmed by user PASS: admin locale/RTL persistence, automatic offers in admin/public, offer title save+revert, hide+republish, contact save/footer and cleanup. Screenshots confirm custom test page saved and linked in footer. Subpage production test pending. These confirmations supersede v6 pending status below.

Page registry: app/page-registry.ts holds 11 allowlisted built-ins with immutable native routes. Page records in cms:pages:<id> gain showInHeader/showInFooter and server-owned builtinId. Legacy custom pages default footer=true/header=false. POST pages/bootstrap INSERT OR IGNOREs built-ins; public read merges missing defaults without writes. Deleting built-ins is blocked; visible flag only controls their menu links, never disables routes. Custom visibility still gates public content. navigationPages builds placement-specific trees; child becomes root if its visible parent is excluded from that placement. Shared PageNavigation uses keyboard-accessible details for desktop/mobile children; SiteHeader/SiteFooter now share records. Existing custom records are not replaced. Raw builtinId spoofing on create is ignored. Slug collisions with built-in internal slugs do not rewrite custom pages.

Home: app/home-content.ts retains current defaults, translations/media/links. HomeEditor under Pages → Home content supports editable text/media/buttons, fixed-size existing sector arrays, order/visibility of 11 sections and 20 optional plain-text/image/button blocks (extras after existing sections). Hero sector count remains four. app/page.tsx renders existing section markup in saved order and loads managed catalogue/project feeds instead of static records; featured product then next 3 products, not measured sales rankings. Client logos still managed. Extra content is rendered safely as React text, no HTML execution.

Storage: site_settings key cms-content:home JSON {draft,published,revision}; no schema migration. GET /api/content/home is published-only. Authenticated admin GET/PUT/POST /api/admin/content/home gets draft, saves draft, or publishes respectively. Same-origin guard and admin-role wrapper retained. Optimistic compare-and-swap protects against stale concurrent saves. Shape, safe URL, duplicate block/order and size checks before writes. Home preview /?preview=home requests protected draft endpoint; no public preview tokens. Publish remains explicit. Media uses existing protected R2 upload endpoint.

Validation: build and 17 automated tests passed, full tsc still baseline Cloudflare Worker types + quote/start-project tuple issues. Public browser preview French/Arabic/RTL checked, no horizontal overflow at current desktop viewport. Local D1 initially had no schema and showed Vite error overlay; applied existing drizzle/0000 schema using --local with .wrangler/state only, reloaded successfully. No admin browser session used; authenticated editor and submenu UI need production verification. No production data or deployment writes by executor. Source remains /workspace/scratch/b8c9077386e2/restore/source/epstar-algerie-main. Deliver v7 overlay atop v6 through existing GitHub Desktop repo.

Exact next: copy v7 overlay → commit `feat: page menus and home content editor` → Push → Cloudflare Ready. Test custom page header/footer/both/neither, child navigation and native-route preservation. Test home draft save, ordinary-site unchanged, authenticated preview, explicit publish, revert, images/order/hide/extras. See Arabic PROJECT_STATUS.md checklist. Then implement section editors for other built-ins. Opening hours structured single-entry widget remains deferred.

## Previous checkpoint — 25 October 2026, v6 (historical)

Latest checkpoint supersedes the v5 deployment state below: user screenshots confirm v5 deployed and sections visible, but asks corrections before CRUD testing. v6 implemented locally, awaiting GitHub Desktop overlay/push and production tests. No external writes/deploy performed by executor.

v6 changes: one admin-main-menu with all 8 permitted views; admin-account-area contains separate account/role and locale picker. No cms-shortcuts navigation remains in JSX. Responsive single menu can wrap under brand/account on smaller screens. AdminI18nProvider/useAdminI18n, messages.ts (over 200 FR-source/AR/EN entries), epstar-admin-language persisted separately from public language; Arabic dir rtl, locale dates, labels/status/known notices translated. Content translations remain editable in all 3 languages regardless of UI locale. Locale switching does not key/remount forms.

Offers no longer require manual import: ContentManager load POSTs /api/admin/content/offers/bootstrap, then GETs list. Legacy /import aliases the same one-shot operation. A transactional D1 batch conditionally inserts 3 original bundled offers and cms-meta:offers-initialized marker. Existing keys/slugs are preserved; later edits/deletes are never overwritten/resurrected. Public and admin GET remain read-only. Marker is outside cms:offers: prefix. No migration.

Validation: build passed; 11 automated tests passed (content, bootstrap preservation/deletion, i18n coverage, menu structure, Worker auth/render, demo import/filter). Browser preview http://terminal.local:4173/admin: FR → AR → reload (dir rtl, lang ar retained) → EN passed; Arabic screenshot visually checked. Authenticated admin header/forms not browser-tested because preview has no signed-in session. Full tsc still has known baseline Cloudflare/quote page typing failures. See PROJECT_STATUS.md for exact production checks.

Source reconstructed from original GitHub ZIP plus v2/v3/v4/v5 Library overlays after workspace maintenance, then dependencies restored with npm run install:ci. New files app/admin/i18n.tsx, app/admin/messages.ts, tests/admin-i18n.test.mjs. Changed admin/page, content-manager+CSS, components/import-demo, worker/content, tests/content. Do not use an old checkout. Deliverable EPSTAR_dashboard_menu_languages_v6.zip is an overlay atop deployed v5. No full repository or secrets in ZIP.

## Previous checkpoint — 24 October 2026, v5 (historical)

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

Copy EPSTAR_pages_home_editor_v7.zip overlay into the existing GitHub Desktop clone containing v6. Commit `feat: page menus and home content editor`, push, wait for Cloudflare Ready. Start with menu placement on the existing test page, then subpage navigation, then home draft/preview/publish/revert, media/ordering/extra sections. Follow PROJECT_STATUS.md v7 checklist. No new project, migration or credential change required. After production PASS, implement remaining built-in section editors.
