# EPSTAR Algeria — Project Roadmap

## Completed

- Public multilingual EPSTAR website with demo catalogue and projects.
- Quote request form: client, logistics, budget, urgency, product selection and attachments.
- Cloudflare D1 persistence and R2 file storage for quote requests.
- Magic-link admin access using Resend; temporary admin is `ishakdib.contact@gmail.com`.
- Dashboard overview and protected quote-request management: search, status workflow, details and protected attachment downloads.
- Dashboard category and subcategory management: create, edit, show/hide and safe delete.
- Dashboard product management: create, edit, show/hide and delete products with reference, category, dimensions, finishes and materials.

## Current

- Build is passing locally.
- Two dashboard commits are ready locally but are not yet deployed because the development runtime has neither GitHub nor Cloudflare deployment authentication.
- Existing live deployment remains the previous production version.

## Next

1. Restore a deployment path and publish commits `ddb148c` and `66b7b66`.
2. Test quote management and category CRUD on production.
3. Add product photos, then use database products in the public catalogue.
4. Add projects and client-logo management.
5. Add team members/roles and later the AI quote assistant.
