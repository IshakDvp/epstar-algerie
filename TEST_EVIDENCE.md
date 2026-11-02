# v21 evidence — 2026-11-01

## 2026-11-02 — v26 steady hero / plain path prompt / shared footer

- Reviewed attached Recording 2026-11-02 155757.mp4 (20.67s) at 2/9/17s and supplied screenshots. User rejects v25 expandable guidance and requests stable hero, shared compact footer and a review of section order.
- Home shows only start.ask as a plain paragraph above both existing path cards. Removed disclosure, arrow and helper copy from public rendering. Old eyebrow/hint/step values remain in saved schema, untouched; editor now shows only the active question/card fields and explains archived helper values in AR/FR/EN.
- Each of the four slide headings/descriptions/tag titles participates in a shared CSS grid sizing area, with aria-hidden invisible sizing copies. Active content stays visible, one semantic h1 only; no JS measurement or text clipping. The longest wrapping content reserves stable space for the current language/viewport. Image box remains fixed at the responsive desktop/tablet/phone media height; content can grow safely for longer CMS edits. This is stability across slides, not one pixel height for all device sizes/languages.
- Shared SiteFooter now puts logo at logical start and contact at logical end (mirrored for Arabic); email first, then phone. Removed visible Navigation heading and brand description. Existing WhatsApp/address/hours/social links remain. Lower nav is centered horizontal flex with wrapping when space requires; copyright is centered in a full-width third row with explicit LTR direction. Shared CSS covers native/managed pages and both themes; menu placement/children are retained.
- Build: npm run build PASS (ESM Worker + hosting manifest validation). node --test tests/*.test.mjs:69/69 PASS, no skips/failures. Added steady-grid and shared-footer regression assertions; updated v25 guidance expectations to new approved behavior. No dependencies, migrations, secrets, production data or deployment changed.
- Browser visual/geometry certification NOT VERIFIED: previous preview URL/security policy block remains a verification limitation; no browser workaround attempted. Source/build tests do not prove equal measured slide heights. Production checks required across all four slides, AR/FR/EN and light/dark at phone/tablet/desktop widths; footer must be checked outside Home too. Full PEQG remains NOT VERIFIED, not PASS.
- Section order intentionally unchanged pending agreement. Proposed: hero,trust,services,products,projects,about,process,clients,testimonial,quote,cta. Rationale: explain solutions and show work before conversion form. Keep CMS order/visibility authoritative; do not force source defaults over saved ordering. Extra Home blocks remain as before.
- Deliverable EPSTAR_home_steady_footer_v26.zip is an overlay for v25. Existing GitHub Desktop Commit/Push -> Cloudflare workflow. Exact next step: user deploys/tests this UI patch and agrees/amends proposed section sequence; then align actual CMS ordering and editor in a separate bounded change.

## 2026-11-02 — v25 fluid Home and Arabic hierarchy

- User approved removing fixed-width Home section shells and reducing stacked Arabic hero text, following video 152132. Scope: Home only; no new dependency, migration, auth or production changes.
- Hero, section-pad (including managed blocks), quote form, testimonial and footer now use fluid width and shared clamp-based side gutters. Paragraphs retain readable 65ch measures; these are text limits, not section container caps. Responsive phone/tablet gutters remain.
- Hero paths show title + short description. Native keyboard-operable details/summary keeps the existing question, eyebrow, help and path labels available on demand; path labels also describe each link accessibly. All saved CMS keys/links retained, no DB rewrite. Home editor explains these presentation roles in AR/FR/EN.
- Arabic headings use normal tracking, lighter hierarchy and more line height; secondary text/capabilities/trust labels use lighter weights. Featured image and solution illustration scale with viewport; footer uses balanced columns and isolated LTR phone/email.
- Verification: npm run build PASS (verified ESM Worker/hosting artifact); node --test tests/*.test.mjs 67/67 PASS, no failures/skips. Includes two fluid-width/content-preservation regressions. Full TypeScript baseline is NOT certified clean.
- Browser: initial local EN empty-state DOM verified disclosure + two paths. Isolated local D1/R2 fixtures were prepared (4 products,3 projects,2 logos), not production and not packaged. After preview restart, browser reload was denied by URL/security policy; no workaround attempted. Therefore final populated render, three-language light/dark screenshots and responsive overflow measurements for v25 are NOT VERIFIED. Earlier v24 measurements do not certify v25.
- Full PEQG remains NOT VERIFIED, not PASS. Production visual acceptance and AR/FR/EN desktop/mobile light/dark checks required after overlay deployment; validate guidance expand/collapse, both links, managed sections, form, footer and no horizontal scroll. No claim the Home page is finalized.
- Delivery: EPSTAR_home_fluid_ar_v25.zip overlay for v24; replace matching files only, Commit/Push via existing GitHub Desktop workflow. No native Sites publish, secrets or QA fixtures included. Pending unrelated email vars/source sync and complete dashboard/public ordering audit remain unchanged.

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
