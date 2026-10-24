# EPSTAR Algeria — Project Roadmap

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

## Current

- Dynamic public detail pages for dashboard-managed realisations are implemented locally and build-tested. Each card will open its own gallery/detail page after the next deployment.

## Next

1. Commit and push the managed-realisation detail-page update from GitHub Desktop.
2. In production, click `Aménagement Pharmacie El Amal` → `Voir le projet` and verify its detail page and gallery.
3. Improve catalogue and realisation filters to use live dashboard categories only, then retire demo entries as EPSTAR provides content.
4. Add client-logo management.
5. Add team members/roles and later the AI quote assistant.
