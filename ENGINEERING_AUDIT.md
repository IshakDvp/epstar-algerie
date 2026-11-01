# EPSTAR scoped engineering review — v21

## 2026-11-01 — v22 Home PEQG stage 1: readability

- Scope: Home only, after v21. New `app/home-readability.css`, imported by Home and scoped to `.home-page`; navigation/shared pages not restyled. No CMS writes, schema changes or dependencies.
- Scale: body 18px desktop/tablet, 17px phone; meta 14px; actions/footer 16px; responsive section headings 32–48px. Explicit dark heading/muted/accent colors; contrast tests check five named solid palette pairs >=4.5:1, not a full rendered WCAG certification.
- Allow text wrapping, natural button heights, stacked phone hero proof and mobile gallery text in normal flow. Focus-visible outlines retained/enhanced.
- Build PASS. `node --test tests/*.test.mjs`: 60/60 PASS. Browser desktop 1363px AR light/dark and EN: no document horizontal overflow; dark headings rgb(241,245,247), paragraph 18px, meta14px, footer16px.
- Responsive QA used temporary same-origin iframe harness at 390/768px (content375/753px excluding scrollbar): equal scroll/client widths; phone body17px/h1 36px; tablet body18px. Phone AR dark screenshot and FR change checked. Harness removed, not shipped. Not a real-device/browser matrix.
- Local preview initially lacked D1 tables; initialized ONLY isolated .wrangler local SQLite from two existing migrations. No production data touched. Browser feed empty: populated product/project/client-logo card layout NOT VERIFIED in this stage; previous snapshot tests still pass.
- PEQG: G1 scoped architecture PASS; G2/G3/G4 existing regression tests PASS only, full audits NOT VERIFIED; G5 performance NOT VERIFIED; G6 production restore NOT VERIFIED; G7 build/tests/browser checks above PASS; G8 production deployment/rollback NOT VERIFIED. No blanket full-PEQG PASS.
- Open findings: Medium — homepage CMS Arabic client heading/text/all-projects label hardcoded in public Home; Medium — carousel auto-rotates without dedicated pause control (hover pause only); full keyboard/zoom/motion and rendered contrast matrix pending. Do not silently certify or generalize before these are addressed.
- Next: apply v22 over v21, GitHub Desktop Commit/Push; user checks entire populated Home AR/FR/EN and both themes on desktop/phone, especially products, projects, gallery text and request form. Then resolve pending Home PEQG findings and editor/public ordering before rolling scale to other pages. v21 user acceptance still not explicitly confirmed.

2026-11-01. Standard: PEQG v1.0. This is not a complete production audit.

G1 PASS (change scope): explicit editor ordering module, existing public template retained; no new dependencies.
G2 PASS (change scope): no schema/storage shape change. Legacy back value retained unread; existing multi-service draft, revision-conflict and publish/revert tests pass.
G3 PASS (regression scope): existing guest/editor authorization, media validation and cross-origin tests pass. Full dependency/security review NOT VERIFIED.
G4 PASS (regression scope): existing draft/privacy/revision lifecycle tests pass. Real external mail reliability NOT VERIFIED.
G5 NOT VERIFIED: no load measurement in this change.
G6 NOT VERIFIED: original source and overlays recovered, but production database/media restore drill not performed.
G7 PASS: build and 58 tests; public Arabic Pharmacy browser smoke. Authenticated editor visual acceptance NOT VERIFIED.
G8 NOT VERIFIED: update packaged for existing GitHub Desktop/Cloudflare workflow; not deployed here.

No Critical/High findings identified within this UI-only change. This does not certify the rest of the system.
Pending: audit Home, About, Fitout, Offers, Catalogue, Projects, References, Contact and custom pages against their editor ordering. Keep public content untouched while regrouping fields.
