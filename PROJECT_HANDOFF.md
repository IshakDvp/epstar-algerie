# EPSTAR Algeria — Technical Handoff

## Current source and stopping point — 24 October 2026

Confirmed production blocker from screenshot `image(20261024-193838).png`: first product ph-c01 fails because env.ASSETS is undefined. Generated Wrangler assets config previously had only directory, no binding. Fix: `assets: { binding: "ASSETS" }` in localBindingConfig of vite.config.ts. Verify generated dist/server/wrangler.json retains binding, deploy config overlay and retry admin import. No production DB or R2 writes performed by this fix.

Latest checkpoint: user deployed v2 and clicked import; screenshot `image(20261024-193256).png` reports generic import interruption. Added admin-only error detail and candidate ID, with URL redaction. Deploy diagnostic overlay, retry import, collect exact message. Existing imported records are preserved; production cause remains unknown. Previous SQLite mock test does not verify actual production schema/bindings.

Active source: `/workspace/scratch/b8c9077386e2/restore/source/epstar-algerie-main`, restored from Library file `libfile_22cc07094d848191affa47ec68859704`. Older checkout is stale.

This update replaces catalogue/project filters with shared root+child state, fixes All (including uncategorised products), removes visible labels and follows AR RTL / FR-EN LTR alignment. Both public lists/details use DB records; existing homepage/offers presentation remains unchanged. Quote selection no longer doubles seeded product IDs.

`worker/import-demo.ts` and protected GET/POST `/api/admin/import-demo` import one allowlisted item per POST. Admin overview button sequentially imports 8 products and 6 projects. ASSETS images copy to R2, D1 records/images use batch. Existing slug/reference matches and category slug/name+parent matches are reused without replacing user data. Retry skips saved records and preserves edits. No schema changes. D02 may be skipped because already present.

Validation: `npm run build` and `node --test tests/demo-import.test.mjs` passed. Production import and browser verification pending. Deploy overlay through GitHub Desktop, wait for Ready, admin overview → Importer les produits et réalisations démo; keep tab open until Terminé. Then verify All/parent/child in catalogue and projects, imported dashboard records, images and an edit. Do not claim production migration complete until verified.

## Repository and deployment

- Local repo: `/workspace/scratch/b8c9077386e2/epstar-algerie`
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

The catalogue and realisation pages now render dashboard categories hierarchically: parent categories only in the first row and their child categories only after selecting the parent. Commit and push this correction, then verify `Pharmacies` → `Pharmacie Luxe` → `Aménagement Pharmacie El Amal`.
