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
- Product-image management and public catalogue data integration are implemented locally: JPG/PNG/WEBP uploads, primary image, secure deletion, public image delivery, managed product details and quote-cart support.
- Realisations management is implemented locally: multilingual project details, location/category, visibility, feature flag, photo uploads and public project cards.

## Current

- Build is passing locally after the product-image/public-catalogue work.
- The product-image/public-catalogue work is ready to be committed and pushed from GitHub Desktop; it is not yet on production.

## Next

1. Commit and push the product-image/public-catalogue update from GitHub Desktop.
2. In production, edit `Bureau Direction D02`, upload at least one image and verify it on `/catalogue` and in the quote request.
3. Improve catalogue filtering to use the live dashboard categories only, then retire demo entries when EPSTAR has supplied its catalogue.
4. Add projects and client-logo management.
5. Add team members/roles and later the AI quote assistant.
