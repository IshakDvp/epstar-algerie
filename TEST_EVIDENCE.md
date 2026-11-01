# v21 evidence — 2026-11-01

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


Environment: isolated restored original GitHub archive plus v2–v20 overlays, Linux, locked npm dependencies. No production records/secrets copied.

- `npm run install:ci`: PASS, locked integrity preflight and 507 packages installed.
- `npm run build`: PASS, ESM Worker artifact validated.
- `node --test tests/service-editor-layout.test.mjs`: 2/2 PASS.
- `node --test tests/*.test.mjs`: 58/58 PASS, 0 failed/skipped. Existing deliberate missing-DB fallback tests emit Public content unavailable logs; tests pass.
- Browser via managed preview: `/services/pharmacies`, Arabic; hero starts with eyebrow then headline/description/request button, no back link; includes/process/gallery/quote/other sections in order.
- Authenticated dashboard visual/draft interactions: NOT VERIFIED in this session; no available authenticated local session. Existing automated API lifecycle and multilingual field-coverage tests pass. User acceptance required.
- Production deployment: NOT PERFORMED. Wider dashboard ordering audit: PENDING.

Regression tests enforce exact service copy-field coverage except deprecated back, no duplicates, both image fields, section ordering and public backlink removal.
