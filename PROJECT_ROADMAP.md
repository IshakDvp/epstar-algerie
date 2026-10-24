# EPSTAR Algeria — Project Roadmap

## 24 October 2026 — current delivery

- Production import reported interrupted with a generic error. Root cause unconfirmed. Admin-only diagnostics now include allowlisted item ID and bounded error detail (URLs redacted). Await production retry message; do not claim import success.

- Restored source from the user's GitHub ZIP after the earlier temporary download disappeared.
- Shared parent/child filters in catalogue and projects; All fixed; visible headings removed; language-direction alignment applied.
- Catalogue/project public listings and detail routes use database records, without static demo fallback. Existing home/offers presentation remains unchanged.
- Admin overview has a protected, retryable demo-import button: 8 product candidates and 6 project candidates; existing references/slugs are skipped. Packaged images are copied to R2.
- Build and SQLite tests passed. Production changes/import have NOT been executed. Next: deploy via GitHub Desktop, wait for Ready, then admin overview → Importer les produits et réalisations démo.

## Completed

- Public multilingual EPSTAR website with demo catalogue and projects.
- Quote request form: client, logistics, budget, urgency, product selection and attachments.
- Cloudflare D1 persistence and R2 file storage for quote requests.
- Magic-link admin access using Resend; temporary admin is `ishakdib.contact@gmail.com`.
- Dashboard overview and protected quote-request management: search, status workflow, details and protected attachment downloads.
- Dashboard category and subcategory management: create, edit, show/hide and safe delete.
- Dashboard product management: create, edit, show/hide and delete products with reference, category, dimensions, finishes and materials.
- Production deployment through GitHub → Cloudflare Workers Builds has been restored and verified on 24 October 2026.
- Production CRUD test passed: Pharmacy parent category, Standard/VIP/Luxe subcategories and test product `Bureau Direction D02` were saved successfully.
- Product-image management and public catalogue integration are live and verified: JPG/PNG/WEBP uploads, primary image, secure deletion, public image delivery, managed product details and quote-cart support.
- Realisations management is live and verified: multilingual project details, location/category, visibility, feature flag, photo upload and public cards. Test realisation: `Aménagement Pharmacie El Amal`.
- Dashboard-managed realisation detail pages are live and verified: project card, multilingual details and ordered gallery.

## Current

- Client-logo management and the public trust/references section are live and verified. Test logo `Tijaro` was uploaded, listed in the dashboard, and displayed on the homepage.

## Next

1. Push and verify the corrected realisation hierarchy: main category first, then its live subcategories.
2. Retire demo entries progressively as EPSTAR adds its genuine catalogue and projects.
3. Add team members/roles and later the AI quote assistant.
