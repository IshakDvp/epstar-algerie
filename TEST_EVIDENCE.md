# v21 evidence — 2026-11-01

## 2026-11-01 — v24 compact Home hero / complete light surfaces

- User videos 204524/204916 showed v23 still too tall, inconsistent spacing and dark surfaces in light mode; no whole-page visual acceptance claimed.
- Modified Home-only app/home-layout.css: intrinsic desktop grid hero replaces legacy minimum heights; text and image in separate columns with natural height, full-width equal path cards. Mobile retains visual-first flow; media tag is in grid flow BELOW image box, not over product. No content clipping/line clamp/fixed hero height. Four original hero sectors and all CMS copy preserved.
- New app/home-presentation.ts strips leading Arabic/Latin numeric step prefixes from alternative path labels for display only; no DB mutation or changes to editor fields, links, drafts/publish or section order.
- Section rhythm reduced from72 to48px desktop /32px phone; tighter clients, solutions image/text, footer groups. Existing v23 readable About, request form, project captions and review retained.
- Light palette now explicit for featured product, selected solution, footer, final CTA and highlighted method card. About red CTA text forced white across states. Red brand CTA/review surfaces intentionally retained; light mode does not mean removing brand red. Dark palette retained.
- Baseline source original + ordered v2–v23 archives restored. npm run install:ci PASS. npm run build PASS; node --test tests/*.test.mjs:65/65 PASS (0 failed/skipped), including three new Home compact/label/palette regressions. No new dependencies, migrations or auth changes.
- Browser desktop1363px sampled FR light hero659px, equal button border-box widths~320px, both bottom613px; AR light hero552px; EN light580px. Heights vary with current slider/text by design. No measured horizontal overflow. Palette computed white feature/solution, footer rgb237/242/244, CTA white text on rgb201/0/24.
- Responsive iframe390/768px (content375/753 excluding scrollbar): phone FR hero1091px with long copy; AR dark949px, scrollWidth=clientWidth375. Tag top equals image bottom (no overlap). These are natural content heights, not a promise to fit entire mobile hero in one viewport. Phone/tablet screenshots reviewed; no real-device or full viewport/zoom matrix certification.
- Local populated QA:4 synthetic products,3 projects,2 logos, bundled image bytes in local R2 only; no production writes. .wrangler/qa-v24/node_modules excluded. Temporary public iframe harness removed before final build. Initial missing local schema overlay resolved by local migration/seed and preview restart. No security bypass.
- PEQG: scoped build/regression and browser evidence PASS as above, NOT full Home PEQG. Full rendered contrast matrix, keyboard/200% zoom, real-device/Safari and performance/backup/production rollback remain NOT VERIFIED. Existing pending CMS Arabic hardcoded labels and carousel pause audit remain open.
- Apply v24 over v23, Commit/Push via GitHub Desktop; no assistant deployment. User checks entire populated Home AR/FR/EN light/dark on desktop/phone, especially hero/buttons and formerly dark cards/CTA/footer. Do not generalize to other pages until accepted.
- Rollback: restore v23 app/page.tsx and app/home-layout.css, remove new home-presentation.ts and home-compact.test.mjs; no database rollback. Retained v23 ZIP is source backup.


## 2026-11-01 — v23 Home composition correction (after v22)

- User rejected visual balance in populated production video. v22 technical checks were not visual approval; full Home PEQG remains NOT VERIFIED.
- Added `app/home-layout.css`, scoped to `main.home-page`; Home imports after readability. No storage/schema/route/form submission changes, no dependencies, no changes to section order/visibility or content. Apply over v22.
- Client logos use centered wrapping layout, no empty four-column slots; reduced section spacing. About uses two readable columns plus full-width reasons strip. Showcase image/text now in separate flow rows. Projects are responsive equal cards with captions on solid surfaces below images. Review uses content-sized block (300px in sampled desktop AR), not stretched by photo intrinsic height.
- Quote intro above centered form (max1000px); solid light/dark surfaces, readable 16px controls, explicit overrides for legacy !important colors, phone single column. Sticky-header anchor offsets for About/Projects/Contact.
- Build `npm run build`: PASS. `node --test tests/*.test.mjs`: 62/62 PASS, 0 skipped/failed. New tests check scoping, retained CMS ordering, caption flow/logo layout/form structure. Static assertions do NOT replace visual review.
- Browser local populated fixtures: 4 products, 3 projects, 2 logos; all representative image endpoints loaded. About text column 618px at desktop1363px; project cards ~488px high with static captions; review300px. AR dark and FR light checked; EN initial layout inspected. No horizontal document overflow in measured desktop state.
- Responsive temporary iframe QA at390/768px (content375/753): scrollWidth equals clientWidth. Phone project card333px, static captions; form341px, one301px content column; tablet form703px, two313.5px content columns. No real-device/Safari/200% zoom/full keyboard audit: NOT VERIFIED.
- QA only: `.wrangler/state` isolated local D1 initialized from existing migrations; `qa-v23/seed.mjs` generated synthetic records, two local R2 objects via wrangler --local. First preview had missing-table overlay; restart after local seeding resolved it. No production data copied or written. QA files, local DB/R2, dependencies and screenshots excluded from update ZIP. Temporary public iframe harness removed before final build.
- Backup/rollback: retained v22 ZIP is prechange baseline; reverse app/page.tsx import and remove new stylesheet/test to undo v23. No DB rollback required. Cloudflare production deployment and rollback drill NOT VERIFIED.
- PEQG: scoped G1/G7 evidence above; earlier API data/privacy/security regression tests remain PASS in tested cases, NOT a full audit. G5 load/performance, G6 production restore, G8 production readiness remain NOT VERIFIED. Pending full rendered contrast, motion/pause, keyboard, zoom and CMS editor-order audit.
- Next: user copies v23 over v22, Commit/Push, then tests actual Home clients/products/about/solutions/form/projects/review at AR/FR/EN and both themes, desktop and phone. Do not generalize to other pages before user acceptance. No deployment by assistant.


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
