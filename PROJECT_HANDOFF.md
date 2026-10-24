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

## Recent local commits not yet published

- `ddb148c feat: add admin quote request management`
- `66b7b66 feat: manage categories and subcategories in dashboard`
- `cb55142 feat: manage catalogue products in dashboard`

`git push` fails because the executor has no GitHub credentials. `npx wrangler whoami` reports unauthenticated. Do not claim these features are live until they are deployed.

## Dashboard routes

- `/api/admin/overview` — protected overview.
- `/api/admin/requests` — protected quote list.
- `/api/admin/requests/:id` — protected quote detail / status patch.
- `/api/admin/attachments/:id` — protected R2 attachment download.
- `/api/admin/categories` — protected category list/create.
- `/api/admin/categories/:id` — protected category edit/delete.
- `/api/admin/products` — protected product list/create.
- `/api/admin/products/:id` — protected product edit/delete.

## Validation

- `npm run build` passed after both dashboard features.
- Do not add/delete the untracked user file: `public/images/.shop-3d.png.EXMD9g`.

## Exact next action

Restore an authenticated deployment path, publish the local commits, and verify `/admin` in production. Then implement product image uploads and public-catalogue data loading.
