# EPSTAR Algeria — Project Roadmap

## 2026-11-02 — v29 / Home PEQG stages A–B (not release approval)

- Read PROJECT_ENGINEERING_QUALITY_STANDARD.md (Library libfile_e8fc552d2cb881919fd5633d51ce8c7e). Source recovery original + ordered v2–v28 verified; no repo recreation/native Sites deploy. Stage A inventory and prechange backup completed. Stage B two controlled fixes + regressions completed. See PEQG_HOME_STAGE1.md for full gates/findings/UX proposal.
- Baseline npm run install:ci PASS, build PASS,73/73 tests PASS. New concurrent magic-link test FAILED on baseline (302/302). Fixed worker/index.ts by conditional token claim, single winner changes===1; after fix302/401, exactly1 session, replay401. No new privilege, migration or credential.
- Shared mobile header now dismisses outside/focus-leave/Escape/desktop breakpoint; Escape returns focus. aria-controls linked to unique menu ID. Event listener cleanup regression passed after replacing boolean capture with shared options object. Old hover/touch submenu, SSR navigation, language/theme, CMS and v28 section order preserved.
- Final build PASS;76/76 tests PASS. Added auth concurrency, header lifecycle and6 anonymous admin API cases. TypeScript check FAIL27 existing diagnostics; no claim of type clean. npm audit flags43 package entries (critical1/high18/moderate23/low1); runtime applicability NOT VERIFIED, no blind upgrades.
- Local populated browser QA:4 synthetic products/3projects/2logos, no broken images. AR light desktop1348 no overflow; AR dark catalogue transition retains lang/theme. Phone375/tablet753 content widths no horizontal overflow. Phone four AR hero slides all930.796875px; FR1018.875px/EN973.390625px, no overflow. Outside/Escape closed mobile state and Escape focus returned. Full real-device/menu/landscape/6combination/admin E2E NOT VERIFIED; harness sequence navigation uncertainty explicitly retained.
- Gate status: G3/G4 FAIL; G1/G2/G5/G6/G7/G8 NOT VERIFIED. No global PEQG PASS or production readiness. Open launch work: dependency reachability/upgrades, Resend non2xx/timeout/delivery visibility, quote idempotency/upload cleanup, backup restore drill, role/CSRF/throttle policy, production monitoring/rollback.
- UX proposal only:5 header links(Home/Solutions/Products/Work/Offers), Fit-out under Solutions, About footer, quote action; shorter hub Home linking to existing detail/form pages. No menu/section records changed until user agrees.
- Backup evidence/peqg-home-stage1/before-v29.zip sha256 a873cd869bbdcced949fd0073f85da9a5ac4840093b738a2ca66c17c4ae0638c. Raw commands/results in evidence/peqg-home-stage1; TEST_EVIDENCE.md updated. No production access, mail or source secrets used.
- Deliver EPSTAR_PEQG_Home_Stage1_v29.zip overlay for v28, containing fixes/tests/docs/evidence. Do not treat as launch certificate. Existing GitHub Desktop/Cloudflare workflow only. Revert v29 code commit to rollback; old token race returns, so prefer forward fix. No DB schema/content writes by this patch.
- Exact next step: triage critical dependency alerts and email failure handling with compatible pinned upgrade plan; obtain IA approval; complete remaining E2E/restore before launch and generalization to other pages.

## 2026-11-02 — v28 agreed Home order and aligned section editors

- User approved proposed Home sequence. New defaults: hero,trust,services,products,projects,about,process,clients,testimonial,quote,cta; footer remains last and extra CMS blocks remain in their existing tail position.
- Important: changing defaults alone would not affect existing DB content. worker/home-content.ts now projects only the exact legacy factory order to the agreed order on read, independently for draft/published, with no GET writes. Team-customized orders remain untouched. Subsequent PUT/POST saves orderVersion:1 in the store envelope, so any deliberately chosen future ordering (even original factory order) persists. Existing optimistic revision and raw-value CAS protection retained; draft text never leaks. No DB migration or remote writes.
- Dashboard order/visibility list and numbered section editor details BOTH iterate draft.sectionOrder. Fields now grouped per public section rather than generic text/photo/link buckets; dedicated media and link fields moved into relevant sections. Hero/solution shared slide copy/model controls live under Hero, explained in AR/FR/EN. Product/project/logo records remain in dedicated managers. Sections retain move/hide and selected content language.
- Added Apply agreed section order button (AR/FR/EN) for customized saved orders. It modifies only local draft.sectionOrder until normal save/publish; copy/images/hidden sections/extra blocks retained. Removed obsolete helper intro. Fixed previously hardcoded AR client tag/heading/text and All projects label to use actual CMS fields, now consistent with editor.
- Tests: npm run build PASS, verified ESM Worker artifact; final node --test tests/*.test.mjs73/73 PASS, no failures/skips. Added3 tests for agreed order/editor mapping, content-preserving read projection, readonly legacy upgrade, saved future custom ordering, publication and revision conflicts. Updated SSR snapshot regression from obsolete products-before-solutions expectation to approved solutions-before-products; seeded legacy order confirms SSR upgrade and private draft exclusion. First test run correctly flagged old ordering assertion; final run passes after expectation update.
- Browser/dashboard interactive visual acceptance NOT VERIFIED due existing preview policy limitation; no workaround. Full PEQG NOT VERIFIED, not PASS. User must verify production section order, section editors' numbering/locale, saved custom order/hide, draft preview and explicit publish, native Solutions anchor. No claim of full dashboard field-level visual audit.
- Deliverable EPSTAR_home_order_dashboard_v28.zip overlay for v27. Existing GitHub Desktop Commit/Push -> Cloudflare workflow; no new project/deployment by assistant. Exact next step: deploy, check default order or use agreed-order button for customized content, publish desired draft after reviewing, then user PASS.
- Rollback: revert v28 code commit. GET projection made no persistent writes. If staff saved/published v28 order, reverting code alone does not restore their old chosen ordering; use editor to restore the previous order and publish. No content deleted.

## 2026-11-02 — v27 compact footer refinement

- User rejected v26 footer screenshot as too empty/tall and approved narrower-scope repair. Only shared footer markup/CSS and its regression test changed; hero and CMS section order untouched.
- Removed visible Contact heading. Email then phone are icon links grouped in one block, with compact outlined WhatsApp button beside them. Icons are inline SVG aria-hidden, focusable=false; text remains accessible. Logo/contact vertically center in top row, padding reduced to24px, row gaps12px, lower navigation divider padding12px. Copyright remains centered below horizontal wrapping links.
- Phone<=640px stacks centered logo/contact before nav/copyright; contact row wraps safely, long email wraps, text is LTR-isolated. Preserved optional address/hours/social links and configured CMS navigation/child links. Empty social container no longer rendered.
- Verified npm run build PASS (Worker ESM/hosting artifact). Final node --test tests/*.test.mjs70/70 PASS, zero failures/skips. Added compact footer regression; updated breakpoint expectation from560 to640. No dependency, auth, DB, environment or deployment changes.
- Browser visual/responsive geometry NOT VERIFIED due prior preview browser policy limitation; no workaround used. Build/source assertions are not visual acceptance. Full PEQG remains NOT VERIFIED. User should check AR/FR/EN light/dark, phone/desktop, Home and other pages with shared footer, mail/tel/WhatsApp links, optional long details and menu children.
- Delivery EPSTAR_footer_compact_v27.zip overlay for installed v26; Commit/Push existing GitHub Desktop flow. Roll back by reverting this commit, no DB rollback. Next: obtain user visual PASS, then agree section ordering (v26 proposal still pending).

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

