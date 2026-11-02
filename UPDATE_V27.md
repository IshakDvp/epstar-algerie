# EPSTAR v27 — compact shared footer

Overlay for v26. Replace the matching files in your existing repository, then Commit/Push.

Commit: `Refine compact footer layout and contact actions`

Only footer design changed. No hero/section-order/database/config changes.

- No visible Contact heading; email and phone have outline icons.
- WhatsApp is a compact button next to contact links.
- Top row vertically centered; less padding and shorter lower-row gaps.
- At phone widths logo/contact stack and center; lower links wrap instead of overflow.
- Existing optional contact details, social links and managed footer pages remain.

Build PASS;70/70 automated tests PASS. Final visual acceptance NOT VERIFIED; full PEQG not PASS.

After successful deployment, hard-refresh Home and another page. Check AR/FR/EN light/dark at desktop/phone widths, email/phone direction, link actions and navigation wrapping. Confirm the visual result before moving on.

Rollback: revert this commit and push; no data rollback needed.
