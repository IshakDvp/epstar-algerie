# EPSTAR Algeria — Project Roadmap

## 25 October 2026 — v6 correction, local validation passed / deployment pending

- User screenshots confirm v5 deployed; before CRUD tests requested a unified menu, separate user/role, dashboard languages, and existing offers populated automatically.
- Implemented one responsive navigation with all 8 sections and a separate account + language selector. FR/AR/EN interface translation, RTL, locale dates and persisted admin-only language preference. Content itself is not automatically translated or rewritten.
- Offers bootstrap now automatic on opening admin offers; explicit protected POST and transactional one-time marker preserve records, edits and deliberate deletion. No public GET writes, no schema migration.
- Build and 11 tests pass; local login language switching/RTL/reload persistence passed in browser. Authenticated admin production checks pending; full tsc baseline issues remain documented.
- Deliver v6 overlay through existing GitHub Desktop → Cloudflare. Then follow PROJECT_STATUS.md checklist before further work.

## 24 October 2026 — historical delivery v5 (deployed, see v6 above)

- Previous import/filter phase: production passed, confirmed by user. 13 added, 1 existing record skipped. ASSETS fix resolved.
- Implemented locally: offers management and explicit import of three demo offers; contact settings integrated into shared footer and quote sending; multilingual main/subpages, visibility/order and safe hierarchy; initial dashboard content navigation and responsive forms.
- No new migration; existing D1 site_settings and R2 are used.
- Build and 7 automated tests passed. Full tsc has existing baseline issues; local browser preview unavailable. v5 deployment and production tests pending.
- Start here for continuity and exact tests: PROJECT_STATUS.md, then PROJECT_HANDOFF.md.
- Next after production verification: broader dashboard UX, managed homepage sections, team/roles, rich page editing/SEO and AI assistant.

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

1. Push v6, verify unified menu/languages/automatic offers, then contact and main/subpages (PROJECT_STATUS.md checklist).
2. Improve dashboard UX, migrate remaining homepage sections and rich page editing/SEO.
3. Retire demo entries progressively, add team roles and the AI quote assistant.
