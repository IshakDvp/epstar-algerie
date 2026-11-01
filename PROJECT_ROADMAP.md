# EPSTAR Algeria — Project Roadmap

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


## 2026-11-01 — v21 service editor / public order alignment

- Remove All services backlink from all four service pages and its editable UI field. Legacy `copy.back` remains stored but unused to preserve exact-shape validation and existing drafts; no migration or customer-content overwrite.
- Explicit shared service editor layout: hero (eyebrow/headline/description/button/model), included services, process (eyebrow/title/intro/steps), gallery (photo and text), quote request, other services. Service identity is separate metadata, not a page section.
- Gallery description intentionally reuses hero text; translated editor note explains both locations. Existing draft/revision/publish/media and FR/AR/EN preserved.
- Evidence: `npm run build` PASS; `node --test tests/*.test.mjs` 58/58 PASS. Public Pharmacy Arabic preview inspected in browser: backlink absent, rendered section order confirmed. Authenticated editor visual/lifecycle test NOT VERIFIED here; user acceptance still pending.
- Scope: shared four-service template only. Home/About/Fitout/offers/products/projects/custom-page editor alignment remains PENDING; do not call entire dashboard reviewed.
- Next: apply v21 overlay over current v20 repo; Commit/Push. In Pages > Pharmacy > Content, compare numbered editor sections against public page. Save TEST headline as draft, preview, verify public unchanged; then publish/revert deliberately. Smoke other 3 services and languages/images before wider dashboard rollout.
- Full engineering audit NOT VERIFIED. See ENGINEERING_AUDIT.md and TEST_EVIDENCE.md. No production deployment or data writes performed by assistant.

 
## CURRENT — 26 October 2026, v20 Solutions red active state

- Solutions now uses URL pathname+hash for red active text/underline; Home not selected simultaneously.
- Handles native hash/history and v19 deferred replaceState via explicit notification. Same existing dark styling; no manual-scroll scrollspy.
- Build +56 tests PASS; browser direct section→Home→Solutions shows exactly one correct active item.
- Next: deploy v20 over v19, check red selection/refresh/dark then resume service CMS lifecycle tests.

Historical checkpoint follows.
 
## CURRENT — 26 October 2026, v19 Solutions populated-layout fix

- v18 user video FAILED Solutions: landed at bestsellers after async layout insertion. Earlier empty-data browser check did not cover production.
- Home now gets published CMS/products/projects/logos before SSR, and hydration retains same snapshot. No late public section insertion from re-fetch.
- Initial home #services navigation deferred until load/fonts/layout ready; exactly one controlled scroll. Same-home anchors stay native. No repeated data-driven correction.
- Build +54 tests PASS; browser tested four local QA products (bestsellers present), cross-page Solutions and refresh final target120/header84. Production confirmation pending; no blanket solved claim.
- Next: apply v19 above v18, Commit/Push/deploy and reproduce production video; then return to pending service CMS lifecycle tests.

Historical checkpoint follows.
 
## CURRENT — 26 October 2026, v18 header + Solutions scrolling

- Explicit shared header dimensions/fonts/spacing across page families; mobile breakpoint preserved.
- Removed repeated Home scrollIntoView effect triggered by async data; native hash link owns the single smooth scroll, sticky offset retained.
- Build +51 tests PASS; browser AR Home/Catalogue both84px header/14px links/24px gap; Catalogue→Solutions final target120px/header84px.
- Next: deploy v18 over v17, reproduce user's navigation video and mobile/FR/EN smoke, then resume service CMS lifecycle tests. Production confirmation pending.

Historical checkpoint follows.
 
## CURRENT — 25 October 2026, v17 language transition fix

- Removed temporary default-French render on public page navigation; shared language context, cookie-backed SSR, pre-paint localStorage migration and direction handling.
- Header/JourneyNav share the same selection; dashboard editor/admin locale unchanged. v16 dark-mode fix retained.
- Build +50 tests PASS, first HTML verified in all three languages across nine route families. Browser AR home→offers→refresh, EN navigation and FR toggle verified locally.
- Next: apply v17 over v16, Commit/Push/deploy, user checks video reproduction AR/FR/EN and dark. Then resume service CMS lifecycle (opening only previously PASS).

Historical checkpoint follows.
 
## CURRENT — 25 October 2026, v16 no-light-flash theme handling

- User clarified temporary flash during transitions only. Unified public theme provider; removed independent per-page theme initialization/persistence.
- Cookie-backed SSR and pre-paint migration of existing localStorage choice. Dark main/background before hydration; legacy mismatch guarded until layout synchronization.
- Build +47 tests PASS; local browser dark home→Fitout→refresh→Pharmacy and light toggle verified. Production user confirmation pending for v15/v16.
- Next: deploy v16 over v15, reproduce video path in dark/light and languages; then resume service CMS lifecycle tests (editor opening only PASS).

Historical checkpoint follows.
 
## CURRENT — 25 October 2026, v15 stable first-render navigation

- Fixed default-to-saved menu replacement after refresh using server-loaded public CMS snapshot and shared provider (header/footer/other content consumers).
- Request-isolated context, no browser cache; published content only, no data writes/migrations. HTML no-store.
- Build +44 tests PASS including real built Worker first HTML and concurrent isolation; browser/production user test pending.
- Next: apply v15 atop v14, Commit/Push, test refresh on service/home/custom pages and saved menu visibility/order. Then complete v13 service draft/preview/publish/languages/media tests. v14 public navigation confirmation pending.

Historical checkpoint follows.

## CURRENT — 25 October 2026, v14 Solutions menu ready for deployment

- User confirmed v13 editor opening only, then requested easier public access. Service content lifecycle tests remain pending, not PASS yet.
- Added Solutions/Nos solutions/حلولنا top-menu link to /#services, with four existing services as child pages. Same arrowless hover/touch/keyboard dropdown; fixed native service URLs and CMS bodies unchanged.
- One-time safe legacy grouping with read-only pre-bootstrap projection; later staff ordering/visibility/parent changes preserved. Custom hierarchies protected; header/footer placement still managed from Pages.
- Sticky-header anchor offset and async home realignment added; browser home+cross-page anchor landing and AR/light/dark submenu checked. Build +42 tests PASS.
- Next: deploy v14 above v13, test menu hover/section link and admin persistence, resume service draft/publish/media tests, then quote editor. Rich custom pages/SEO/dashboard/team roles/AI remain pending.

## CURRENT — 25 October 2026, v13 Service editors ready for user deployment

- User confirmed full v12 Fit-out lifecycle, language/images and four sector → quote defaults PASS.
- Implemented independent editors for pharmacies, offices, retail and bedrooms, retaining original content/design. Multilingual text, fixed six included items/four steps, two images per service; private draft/preview/publish/revision conflict protection. Related service names follow published titles, never drafts.
- Fixed a browser-observed quote form language-switch regression: option identity now stable for project/budget/urgency, service form resets only on slug change. API submission unchanged, no requests sent in QA.
- Build +37 tests PASS. Public browser four routes/selected project types, language switches, images, RTL/light/dark and guest preview privacy checked. Admin editor lifecycle still pending user deployment.
- No migrations/production writes. Overlay v13 atop v12; existing GitHub Desktop Commit/Push. Next: test all service editors, then quote content editor. Rich custom pages/SEO, dashboard/team roles and AI remain pending.

## CURRENT — 25 October 2026, v12 Fit-out editor ready for deployment

- v11 About editor production lifecycle, multilingual independence and image upload/restore all confirmed PASS by user.
- Added Fit-out editor: existing three-language text, steps, four sector card labels/descriptions and four shared images; draft/private preview/publish with existing admin guard/CAS. Original sector IDs and quote destinations stay fixed, request handling unchanged.
- Also fixed scoped dark step/CTA contrast and persistence of chosen language when following sector link. Browser verified Arabic RTL/dark, loaded images/no desktop overflow, Pharmacy quote preselection+Arabic persistence and guest preview protection.
- No migrations/production writes. v12 overlay atop v11, user Commit/Push. Authenticated fit-out editor lifecycle and media tests pending after deployment.
- Next: deploy/test fit-out, then services and quote content editors; custom-page builder/SEO, dashboard/team roles and AI remain pending. Historical pending states below are superseded by this checkpoint.

## CURRENT — 25 October 2026, v11 About editor ready for deployment

- User confirmed PASS: page ordering/footer, home draft/private preview/publish/revert, subpage creation, v10 arrowless menu and dark-mode fixes.
- Added multilingual About editor under Pages, retaining all existing content/design. Editable text, key figures, commitments/expertise/team copy, five images and projects link. Draft/private preview/explicit publish with revision conflict protection; existing admin auth and R2 media.
- Public browser FR/AR/RTL/light/dark checked; all images load and no horizontal overflow at desktop. About editor authenticated UI and lifecycle await user production tests; automated coverage includes privacy, publish/revert and concurrency.
- No schema migrations or production writes. v11 overlay atop v10; Commit/Push through existing GitHub Desktop workflow.
- Next: deploy/test About draft, preview, publish/revert, image upload and language independence. Then fitout/services/quote editors. Rich custom-page builder/SEO and broader dashboard/team/AI remain pending.

## Historical checkpoints (below)

## 25 October 2026 — v8 correction, local checks passed / deployment pending

- v7 deployed per screenshots; page registry/header links and home editor visible. Full home draft/publish production test not yet confirmed.
- Added parent-preserving page drag order + up/down buttons, automatic order-only batch persistence and append-on-create.
- Fixed footer CSS class collision (nested groups accidentally inherited global footer grid/padding); local browser checked compact layout.
- Clarified content-language selector vs dashboard language; localized text fields change, shared ordering/media do not.
- Build and 19 tests passed; production ordering/editor interactions pending. Deploy v8 and complete PROJECT_STATUS.md checks before continuing remaining page-body editors.

## 25 October 2026 — v7 Pages/menu registry + home editor, LOCAL / deployment pending

- v6 production tests confirmed: locale/RTL persistence, offer population/edit/hide/republish, contact footer update/cleanup, and custom page creation/footer link. Subpage tests still pending.
- Independent header/footer flags, shared nested navigation and 11 built-in page records preserving native routes and protected from deletion. Existing custom pages remain footer-linked by default.
- Home editor: multilingual text/images/links, section ordering/visibility and simple extra blocks; private drafts, admin preview, explicit publish and revision-conflict guard.
- Homepage catalogue/projects now managed database feeds; original design retained. Other built-in bodies are NOT editable yet; registry offers appropriate next-stage notices or jumps to existing modules.
- Build + automated checks passed. Public home browser French/Arabic RTL passed after local schema setup. Admin editor/submenus still require production user checks; baseline full-typecheck issues remain.
- Next: deploy v7, complete PROJECT_STATUS.md tests, then about/fitout/services/quote editors and richer custom-page content. This is a staged CMS, not a completed full-site page builder.

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

1. Push v8, verify ordering/footer/content-language, then finish page/subpage and home draft/preview/publish tests (PROJECT_STATUS.md).
2. Add remaining built-in page section editors, rich custom-page editing/SEO, then broader dashboard UX.
3. Retire demo entries progressively, add team roles and the AI quote assistant.
## v9 — subpage menu usability (25 October 2026)

- User confirmed v8 ordering/footer PASS and home draft/private preview/publish/revert PASS.
- Subpage creation/placement works (screenshots); desktop hover was missing and arrow target too small.
- Header menus now open on fine-pointer mouse hover across parent link and arrow; pointer leave closes. Native details click/keyboard retained; Escape closes and returns focus. Toggle target at least 44×44px. Parent title remains a link. Touch uses tap.
- No DB/API/schema changes or production writes. Deliver v9 overlay atop v8; user commits/pushes via GitHub Desktop. Next: verify parent-to-child hover, mobile tap, AR/FR/EN and keyboard. Remaining built-in page content editors pending.

v9 validation: npm run build passed; 19 existing automated tests plus navigation-hover regression test passed (20 total). Browser interaction not verified in this turn; production hover/touch test pending user deployment.

## v10 — arrowless navigation and dark-mode fixes (25 October 2026)

- User screenshots confirmed hover opens; requested removal of arrow, readable dark dropdown and managed-page header, underline below child text, closer dropdown.
- Replaced details/arrow with controlled arrowless parent link and submenu. Mouse hover opens; coarse/touch first click opens, second navigates parent. ArrowDown opens/focuses first child, Tab follows links, Escape closes/focuses parent; blur outside closes. aria-expanded/controls and aria-current provided.
- Scoped header/dropdown dark palette to html[data-theme], independent of page wrapper; managed pages also now receive theme/RTL classes. Underline drawn under inline label, not old inherited anchor pseudo-element. Dropdown top overlaps parent bottom by 1px to avoid hover gap.
- No database or API changes. v10 overlays v9; user must Commit/Push and verify production AR/FR/EN, light/dark, desktop hover and mobile first/second tap. Full CMS remaining-page editors pending.

v10 validation: build and 20 automated tests passed. Browser visual/interaction QA not run this turn; user production checks pending. Exact next action: overlay EPSTAR_navigation_dark_arrowless_v10.zip atop v9, Commit/Push, test all five reported points.

v11 final verification: npm run build and all 25 automated tests PASS after final label changes. Browser public FR/AR/light/dark and guest preview privacy verified; authenticated editor/upload workflow still pending user. Preview stopped. Overlay includes source/tests/continuity docs only, no credentials, local DB, media copies or build outputs.

v12 final verification: npm run build and all 30 automated tests PASS after final dark-contrast/language changes. Public browser checks passed as described above; authenticated admin lifecycle pending user deployment. Preview stopped. ZIP contains source/tests/docs only; no secrets, runtime DB, or build artifacts.

