# EPSTAR Algeria — Technical Handoff

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

The catalogue and realisation pages now render visible dashboard categories as live filters, while keeping demo filters/content available until EPSTAR replaces them. Commit and push this update, then verify `Pharmacie Luxe` filters `Bureau Direction D02` in the catalogue and `Aménagement Pharmacie El Amal` in realisations.
