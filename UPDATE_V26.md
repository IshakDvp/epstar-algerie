# EPSTAR v26 — steady hero and shared footer

Overlay for v25. Replace matching paths in the existing repository, then Commit/Push using the established GitHub Desktop and Cloudflare workflow. No new project, migration or variable changes.

Commit: `Stabilize hero slides and simplify shared footer`

- Only the plain path question remains above both cards; no expandable helper panel. Previous helper values remain saved but not displayed.
- All four slide texts reserve the longest wrapped height at each screen size. Image box height stays consistent within that breakpoint. No content clipping; no universal fixed height across all languages/devices.
- Shared footer: mirrored logo/contact sides; email then phone; horizontal lower navigation; centered copyright. Links wrap on narrow devices rather than overflow. WhatsApp and existing optional contact details remain.
- Home editor lists only the active path fields and explains preserved legacy helper values.

Verification: build PASS;69/69 automated tests PASS. Final visual browser verification NOT VERIFIED because of the preview security-policy restriction. Full PEQG is not PASS.

After deployment, check:

1. All four hero slides: same top/bottom positions in each language; no jump below the hero. Test desktop/tablet/phone, light/dark. Tap solutions tabs to switch deliberately (the same active state drives the hero), or wait for the slider without hovering over it.
2. Plain path question and both existing links; no disclosure arrow/panel.
3. Footer on Home AND catalogue/service/managed pages: logo/contact opposite sides; email then phone; bottom links horizontal; copyright centered; Arabic contact values readable LTR.
4. Narrow-device link wrapping, keyboard focus, optional contact/social data, footer child pages. Do not submit forms just to test layout.

Section order has NOT been overwritten. Proposal for approval: hero -> trust -> solutions -> products -> projects -> about -> process -> clients -> testimonial -> quote -> final CTA. Saved CMS order and visibility remain authoritative.

Rollback: revert the v26 commit and push. No database rollback required.
