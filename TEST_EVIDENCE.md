# v21 evidence — 2026-11-01

Environment: isolated restored original GitHub archive plus v2–v20 overlays, Linux, locked npm dependencies. No production records/secrets copied.

- `npm run install:ci`: PASS, locked integrity preflight and 507 packages installed.
- `npm run build`: PASS, ESM Worker artifact validated.
- `node --test tests/service-editor-layout.test.mjs`: 2/2 PASS.
- `node --test tests/*.test.mjs`: 58/58 PASS, 0 failed/skipped. Existing deliberate missing-DB fallback tests emit Public content unavailable logs; tests pass.
- Browser via managed preview: `/services/pharmacies`, Arabic; hero starts with eyebrow then headline/description/request button, no back link; includes/process/gallery/quote/other sections in order.
- Authenticated dashboard visual/draft interactions: NOT VERIFIED in this session; no available authenticated local session. Existing automated API lifecycle and multilingual field-coverage tests pass. User acceptance required.
- Production deployment: NOT PERFORMED. Wider dashboard ordering audit: PENDING.

Regression tests enforce exact service copy-field coverage except deprecated back, no duplicates, both image fields, section ordering and public backlink removal.
