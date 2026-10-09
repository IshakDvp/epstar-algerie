# EPSTAR — Latest Cloudflare export

Export date: 2026-10-09

This is the latest complete source package prepared for the EPSTAR Cloudflare Worker.

Included updates:

- Updated responsive header with active-page state.
- Arabic, French and English interface with remembered language.
- Light and dark modes, including the correct dark-logo behavior.
- Mobile menu.
- Product catalogue and product request flow.
- Full fit-out project journey.
- Projects page that preserves Arabic when opened from the Arabic interface.
- Offers page: **عروضنا / Nos offres / Offers**, with a small **جديد / NOUVEAU / NEW** label.
- Demo products, demo projects and demo offers.
- Unified footer across the primary pages.
- WhatsApp request flow for +213551984778.

Cloudflare settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`
- Production branch: `main`

Do not add `nodejs_compat` in the Cloudflare dashboard; it is already configured once in `wrangler.jsonc`.
