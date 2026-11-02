# EPSTAR Algeria — Technical Handoff

## 2026-11-02 — Review of video 192429 (documentation only)

- User asked to analyze and record observations, not implement changes. Reviewed attached112.17s1918x972 video across the timeline, extra full-resolution keyframes and2s menu sequence.
- Findings V01–V12 in VIDEO_REVIEW_20261102_192429.md. Main priorities: simplify competing nav choices; compact/scrollable disclosure at zoom; clear close state; shorter Home/one conversion path; maintain steady hero while reducing reserved whitespace; improve rhythm/contrast and review demo social proof.
- Important evidence boundary: Chrome zoom control100% visible before enlargement at00:58; later compact layout is desktop zoom/reflow, NOT real-phone certification. Opening/closing via toggle visible; outside-click failure, missing child pages, cross-route locale/theme flashes and dashboard/mail outcomes are NOT established by this video.
- No code, menu data, CMS section order, auth, dependencies or production changed. No new automated tests run. Existing v29 gate failures/unknowns remain; this is not a new PASS or release certificate.
- Next: agree proposed IA, then bounded nav zoom/accessibility changes plus regression checks, while resolving v29 launch risks. Notes/continuity bundle only; do not treat it as a code patch.

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

 
## CURRENT — 26 October 2026, v20 Solutions active state LOCAL

User reports only remaining note: Solutions not red when clicked. This suggests v19 navigation improved; not an explicit full PASS, don't invent lifecycle confirmations. v20 navigationActive helper recognizes pathname+hash for section links; Home inactive only while /#services active. PageNavigation synchronizes hash initially and on hashchange/popstate/custom epstar-anchor event. v19 deferred controller dispatches event after replaceState restores hash (replaceState alone does not emit hashchange). Uses existing active class/red/underline/dark palette; aria-current location for section vs page for routes. No scrollspy on manual scroll; active selection follows URL hash. No scroll algorithm/data/CMS change.

Build +56 tests PASS; new2 active-state/history-event regressions; old solutions static test updated from intentionally excluded hash to shared active helper. Browser direct /#services shows ONLY Solutions active, computed light red rgb201,0,24 and aria-current location; click Home makes ONLY Home active, same-home Solutions ONLY Solutions. No production writes/deploy or auth. Preview stopped.

Deliverable EPSTAR_solutions_active_v20.zip overlays v19. Commit: fix: highlight solutions navigation when active. Next user copy/Commit/Push, Solutions from anotherpage+refresh and Home switch, dark palette smoke. Then resume service CMS draft/private-preview/publish/language/media lifecycle (only editor opening PASS previously). Older checkpoints historical.
 
## CURRENT — 26 October 2026, v19 populated Home snapshot + deferred initial Solutions anchor LOCAL

v18 production FAILED Solutions test: user video lands on bestsellers instead of Solutions. Header issue not reported again, but no explicit standalone PASS. Root cause home originally rendered empty products/default CMS then sections inserted/reordered after native hash target calculated. v18 removal of repeated scroll alone insufficient; prior empty-data local test was not representative.

v19: worker public page render branch builds homeInitial only on pathname / using public homeContent(false), publicCatalogue, publicProjects, publicClientLogos in parallel. Per-feed failures log+stable fallback; no browser refetch of seeded published data after hydration. Existing publicContentData request-isolated snapshot extended with optional homeInitial; root existing provider passes it to Home/useHomeContent. Home initializes product mapping/projects/logos from snapshot; published CMS starts from snapshot, no default-to-published replacement. Home hook still fetches authenticated draft when ?preview=home (never SSR drafts); nonseed fallback remains for dev/missingDB. Snapshot only public visible records. No DB/schema/dependency changes; server now pays home-only feed read latency. Full feeds reused (no new limits vs existing UI). CMS data/mapping/order unchanged.

Additional browser check exposed reload race: first observation might show pre-scroll position then settle; explicit controller eliminates native-vs-hydration ownership. Head homeAnchorBootstrap captures initial /#services intent into html dataset, temporarily removes hash via history.replaceState (no route/request), preventing premature native fragment scroll. Home useInitialHomeAnchor waits window.load and fonts.ready, two animation frames, restores hash via replaceState and invokes scrollIntoView once (smooth, instant for reduced-motion). Empty-deps lifecycle, no repeated async-data effects. User wheel/touchmove/scroll keys cancel; teardown removes listeners and frames. Marker consumed only when target exists (StrictMode-safe). Same-document clicks remain normal native anchors; no-JS link remains /#services. Private preview may deliberately alter layout after draft fetch; not a published navigation target. Hidden Solutions section remains intentionally hidden by CMS, no force-show.

Build +54 tests PASS (51 previous + populated published SSR products-before-target and draft privacy; seeded browser fetch guards; initial bootstrap limited to home Solutions hash + one-scroll readiness source regression). Browser local DB seeded four disposable v19-qa products; Home has actual bestsellers section. Tested Catalogue→Solutions, Fitout→Solutions and refresh; final target119.9375px/header84 and featuredProduct present. Immediate observations during smooth movement can show2681px before final120; do not mistake intermediate animation position for final. No frame-by-frame network-throttling trace or production confirmation. QA products removed after testing; no external writes/auth bypass. Preview stopped for delivery.

Deliverable EPSTAR_solutions_snapshot_v19.zip overlays v18. Commit: fix: stabilize home data before solutions navigation. Next user copy/Commit/Push, test Fitout→Solutions with populated production data and refresh on /#services; one movement ends at Solutions, not bestsellers. Test same-home link and reduced-motion/mobile. Do NOT label solved until user confirms; v18 failed publicly. Then resume service CMS lifecycle (only editor-open PASS to date). Older checkpoints historical.
 
## CURRENT — 26 October 2026, v18 header metrics and single hash scroll LOCAL

User video: menu looks smaller after Home→Catalogue, Solutions appears to navigate twice. v18 gives .site-header.unified-header explicit page-independent typography/height/padding/logo metrics in page-navigation.css (desktop84px minheight, links14px/800, navgap24px, AR Alexandria/Latin Manrope; mobile<=980 hidden desktop, <=520 minheight72/logo106x44). Old .desktop-navigation>a rules no longer matched grouped links; explicit descendant rules avoid inherited page styles. Actual browser AR Home and Catalogue both height84/link14/gap24/samefamily verified. No page body typography changed.

Removed Home effect that called scrollIntoView whenever home/client logos/featured product/lang changed. Native /#services link is now the sole scroll owner (same-page and cross-page); sticky scroll-margin120 retained. Prevents async data changes from restarting smooth scrolling. Native scroll anchoring handles normal document reflow; this patch does not server-render all Home data or freeze CMS/image layout. Browser Catalogue→Solutions lands #services top120 with headerbottom84; immediate observation during native smooth motion was1043 then settled120. No instrumented frame-by-frame slow-network capture; production video smoke required. Existing arrowless submenu/touch/keyboard/CMS hierarchy unchanged. v15/16/17 shared SSR menu/theme/language retained. No dependencies/schema/DB writes.

Build +51 tests PASS: previous50, updated obsolete solutions regression to assert no .scrollIntoView invocation and sticky offset; new explicit header metrics/mobile breakpoint guard. Local browser desktop AR metrics and hash landing checked; small-screen manual production check pending. No production deploy/auth/quote submissions. Preview stopped at delivery.

Deliverable EPSTAR_header_anchor_v18.zip overlays v17. Commit: fix: stabilize header metrics and solutions scrolling. Next user copy/Commit/Push, reproduce Home→Products menu size then Products→Solutions and Home→Solutions; confirm one smooth move, test mobile menu and FR/EN. No explicit full production PASS received yet for v15-v17; latest video visually suggests language/theme stable but do not overstate. v13 service lifecycle still only editor opening PASS. Older checkpoints historical.
 
## CURRENT — 25 October 2026, v17 initial language and RTL fix LOCAL

User video shows transient FR/default direction during navigation before AR returns. Unified public language in existing ThemeProvider using LanguageContext/useSiteLanguage. All ten public UI owners now read shared language (home/catalogue/demo+managed product/project-shell covering projects/about/details/fitout/services/quote/offers/custom pages). Removed their independent localStorage read/write effects and document lang/dir mutations. SiteHeader choose delegates to shared setter; JourneyNav reads same context instead of MutationObserver/default FR. CMS editor language and admin language remain independent and untouched.

RootLayout validates epstar-language cookie (ar/en/fr else fr), renders html lang/dir and passes matching initialLang so full page SSR + hydration begin with selected copy/RTL. Head bootstrap migrates preexisting localStorage choice before paint, sets direction and appearance-only cookie, uses existing data-theme-pending guard if SSR choice differs. Provider layout effect aligns both language and theme before clearing guard. Button changes immediately persist lang/dir, localStorage and one-year Path=/ SameSite=Lax cookie. /admin skips public preference initialization to avoid overwriting admin locale or public cookie. Storage exceptions caught. No auth, dependencies, migration or CMS data writes. Existing v15 no-store HTML and v16 theme behavior preserved.

Build +50 tests PASS: previous47 plus language migration/validation/storageblocked; no per-page storage ownership; real built Worker first HTML AR/FR/EN + direction/dark for nine route families (27 render cases), offers heading explicitly correct. v13 static service test updated to assert shared language hook/provider storage rather than obsolete per-page storage. Browser tested AR home→offers→refresh stays AR/RTL, EN toggle + navigate home stays EN/LTR, FR toggle works. No frame-by-frame throttled recording; production user confirmation required. No auth bypass or form submissions; preview stopped for delivery.

Deliverable EPSTAR_language_transition_v17.zip overlays v16. Commit: fix: preserve language and direction before navigation. Next: user copy/Commit/Push/deploy; test same video home→offers→other pages and refresh in AR, repeat FR/EN plus dark. v15/v16 production PASS not explicitly received (video demonstrates dark navigation but do not label full PASS). v14 Solutions confirmation and v13 service lifecycle tests remain pending. Older checkpoints below historical.
 
## CURRENT — 25 October 2026, v16 theme transition fix LOCAL

User clarified video shows transient light flash only, not permanent reset. v16 central ThemeProvider replaces independent theme useState/read/write effects in all ten public UI owners (home, catalogue, demo/managed product, project-shell covering projects/about/details, fitout, services, quote, offers, custom pages). Existing per-page dark classes remain; managed-product loading now also dark. All public theme updates only through provider. Language handling retained; unrelated language initialization race is not part of this patch.

RootLayout reads validated epstar-theme cookie from request headers, renders html data-theme and provider with same initialTheme so SSR classes match hydration. Provider persists explicit button choice immediately to html dataset/colorScheme + localStorage + one-year Path=/ SameSite=Lax cookie. Head inline bootstrap migrates old localStorage preference and system fallback before paint; when legacy preference differs from SSR, data-theme-pending hides body only until provider useLayoutEffect synchronously aligns state/removes guard before paint. No-JS leaves SSR content visible (script never sets guard). Storage blocked is caught. Script skips /admin; admin UI theme unchanged. Shared provider persists during client routing; cookies cover native full document links. Cookie is appearance-only, not authentication. Existing v15 HTML no-store prevents serving wrong cached theme/menu. No new dependency/schema/CMS writes. Dark system fallback applies only without an explicit saved preference.

Build +47 tests PASS (44 prior + bootstrap migration/explicit light/storage failure; page ownership guard; built Worker SSR dark html and main classes for 9 route families). Browser UI tested home toggle dark -> Fitout -> refresh -> Solutions dropdown Pharmacy, all stay dark; light toggle works. Browser checks verify resulting state, not frame-by-frame recording under throttled network; user production video reproduction still required. No auth or quote submission. Preview stopped before delivery.

Deliverable EPSTAR_theme_transition_v16.zip overlays v15 (includes only changed files + continuity docs). Commit: fix: preserve theme before page transitions. Next: user copies/Commit/Push/deploy, tests same video path catalogue -> fitout -> pharmacy in dark, repeated refresh, then light and AR/FR/EN. v15 production PASS not yet received; do not claim. v14 Solutions test confirmation and v13 service lifecycle still pending. Older checkpoints below historical.
 
## CURRENT — 25 October 2026, v15 initial navigation SSR fix

User screenshots show About missing temporarily on refresh. Root cause useContent initialized builtinPages then fetched /api/content separately in header/footer, replacing menu after hydration. v15 resolves published publicContentData before public route render in worker/index.ts. Request-isolated AsyncLocalStorage (global Symbol shared across Vinext RSC/SSR bundles) passes snapshot to async RootLayout and client ContentProvider. useContent now reads context only; no delayed fetch or browser cache, preserving CMS labels/order/visibility/children at first HTML and hydration. HTML responses no-store. Assets/API/admin skip snapshot; CMS failure logs and uses consistent builtin fallback. Public GET data logic unchanged, no DB writes or migrations. Root headers() marks dynamic render. Provider contains only public contact/offers/visible pages, never drafts or admin data.

Build and 44 tests PASS, including built Worker SSR custom menu label and two concurrent requests with different snapshots (no cross-request leakage). Existing 42 tests retained. No browser QA this patch; production refresh/slow network and CMS hide/order/rename checks pending. First cloudflare:workers import attempt failed Node artifact verification; replaced with node:async_hooks context and rebuilt successfully. No dependency changes. v14 Solutions behavior unchanged; its production confirmation still pending. v13 service lifecycle remains pending (opening only confirmed).

Deliverable EPSTAR_navigation_ssr_v15.zip overlays v14. Commit: fix: render saved navigation before hydration. After Push/deploy test repeated refresh on /services/chambres, home and custom page: About and saved custom items must remain present, same order; test hide/rename in Pages then reload. No Pages bootstrap needed for v15. Then resume v13 service lifecycle. Older checkpoints below are historical.

## CURRENT checkpoint — 25 October 2026, v14 Solutions navigation LOCAL, production pending

User v13 confirmed service editor opening PASS only. Service draft/publish/language/media tests NOT yet confirmed: user asked how to reach pages and requested this navigation change. User clarified they mean Solutions section, NOT Projects/Our work. v12 Fit-out full lifecycle and sector links previously PASS.

v14 adds protected builtin-solutions registry record: FR Nos solutions / AR حلولنا / EN Our solutions, href /#services, header default true/footer false, default sortOrder25. Four native service records are children with header default true; no duplicate service routes/content created. Existing arrowless pointer hover/touch first-open-second-navigate/ArrowDown/Escape menu reused. Navigation clicks close expanded child panel; programmatic keyboard focus uses preventScroll. Hash link not marked active just because pathname is home. Parent/child ordering/visibility/menu placement/name remain editable in existing Pages controls; Solutions content button opens HomeEditor because it links to a home section, not a new page body.

Legacy adoption: worker/content.ts pageRecords reads marker cms-meta:solutions-navigation-v1. Before marker exists, pure initialSolutionsPages() projects missing builtin Solutions + groups legacy root services into header, without GET writes. Pages/bootstrap atomically INSERT OR IGNOREs missing builtin defaults, then guarded json_set changes ONLY parentId/showInHeader of root service records that do not already have children, and inserts marker. Custom names/order/visibility/footer untouched. Existing custom parent assignments and service roots with children are intentionally preserved to avoid destroying user hierarchies/creating grandchildren; such exceptional services need manual reassignment in admin. After marker exists, staff hiding/detaching/reordering is never reset on later bootstrap. No schema migration, and no CMS body/draft/media is overwritten.

Home #services has scroll-margin-top120px so sticky header does not cover it; Home effect realigns when published home/client-logo/product/locale data arrives. Section can still be hidden by HomeEditor; if intentionally hidden, hide Solutions menu link too. Other routes /#services returns to home anchor. All currently valid parent hierarchy restrictions remain two levels.

Checks: npm run build and 42 automated tests PASS (37 previous +5 solutions tests). Tests cover default native links/children, read-only legacy projection, transactional one-time grouping, preserving titles/order/footer/visibility, post-initialization staff overrides, custom-parent/child safety, sticky hash behavior source wiring. Existing pages-home count updated11→12, reorder test targets a root rather than newly nested final builtin. Initial test fixture lacked updated_at; fixture fixed, full suite rerun PASS. Browser verified header has one Solutions link, arrowless four-child dropdown via keyboard, child opens native Pharmacy page, parent click both from home and Pharmacy lands #services with section top120px/header bottom84px. Dropdown AR/light/dark checked, no desktop horizontal overflow. Desktop mouse-hover/touch admin lifecycle need user smoke check; same existing menu event behavior retained. No production writes/deployment or auth bypass; preview stopped at delivery.

Exact next: overlay EPSTAR_solutions_menu_v14.zip atop v13, Commit 'feat: group service pages under solutions navigation', Push via existing GitHub Desktop, wait Cloudflare Ready. Test Solutions hover shows four children; parent click goes to Solutions section from home and a service page. Open admin Pages once to persist one-time grouping; test drag/reorder/hide persist. Then resume v13 Pharmacy draft/private preview/publish/revert/language/image tests and smoke the other three, before quote content editor. Custom page builder/SEO/dashboard/team/AI remain pending. Do not suggest declined GitHub plugin or deploy old Sites project.

## Historical v13 checkpoint (superseded above)

## CURRENT checkpoint — 25 October 2026, v13 Service editors LOCAL; v12 production fully PASS

User confirmed v12 opening, private draft/preview, language/image changes, publish/revert and all four sector-card quote preselection tests PASS. Previous pending v12 notes below are historical.

v13 adds Pages → each of service-pharmacies/service-bureaux/service-commerces/service-chambres → Contenu — Service. app/admin/service-editor.tsx is keyed by allowlisted ServiceKey, edits each service independently: FR/AR/EN service name/headline/description, six included prestations, four two-field process steps, section headings/copy, request button and other-services labels, localized made-to-measure chip; shared model/photo image URL or protected existing R2 upload. Existing page structure/counts/routes and QuoteForm submission logic retained. No rich HTML, section reorder/visibility or additional rows in this stage. Brand/decorative icon/number labels remain code-owned. Builtin navigation names still managed separately via page metadata.

app/service-content.ts extracts original service defaults and exposes serviceKeys, isServiceKey, serviceKeyForBuiltin, serviceDefaults. service-detail.tsx now uses useServiceContent(key); public feed supplies all four published documents so related-service names reflect their published service title. Preview replaces only current service with its protected draft; other service titles remain published. /services/:slug?preview=service; normal related links do not propagate preview. Language/theme loaded and persisted with readiness guard.

Storage: existing site_settings keys cms-content:service:<allowlisted slug>, each {draft,published,revision}. No migrations/seed writes. worker/service-content.ts strict default-shape/array/string(20k)/total(250k)/safe-media-URL validation and CAS revisions. Public GET /api/content/services returns {services:{...published}}; never exposes drafts. Admin GET/PUT/POST /api/admin/content/services/:slug via existing admin role/origin wrapper; unknown IDs/deeper paths404, DELETE405. Existing media endpoint and orphan-upload limitations retained. Authenticated editor browser/session tests still pending user; never bypass login.

Browser found language switching replaced quote select options (keys used translated text), causing office/retail/residential selection to reset to pharmacy. Fixed all three translated option lists (project/budget/urgency) to stable numeric keys in app/components/quote-form.tsx; default form behavior, required fields and API submission untouched. Service QuoteForm keyed by slug to reinitialize correctly when service route changes. Browser verified pharmacy0/office1/retail2/residential3 and persistence through language changes; did not submit requests.

Validation: npm run build +37 automated tests PASS. tests/service-content.test.mjs adds seven tests covering all defaults/no writes, independent multilingual/media draft/publish/revert, related published title privacy, concurrent CAS, malformed media/shape/size, origin/method/unknown-ID guards, built Worker guest401/editor403, editor syntax/i18n/wiring and quote option identity. Public browser checked all four routes/crosslinks, FR/AR/EN, Arabic RTL, light/dark desktop, image loads, no horizontal overflow, guest private preview unavailable notice. Full tsc still has baseline missing D1Database/Cloudflare globals and older quote types; new service client files had no reported type errors. No production writes or deployment by executor. Preview stopped before handoff.

Exact next: overlay EPSTAR_service_editors_v13.zip atop v12; user Commit 'feat: add independent multilingual service page editors', Push via existing GitHub Desktop and wait Cloudflare Ready. Open Pages → Pharmacies → Content — Service, verify editor. Then draft TEST French headline/preview only; publish/revert, language isolation, image draft+restore; ensure other services unchanged. Repeat smoke save/preview for offices/retail/bedrooms and check selected quote type after language changes. Next implementation after PASS: quote page content editor; rich custom-page builder/SEO and broader dashboard/team/AI remain pending. Do not create old Sites project or suggest declined GitHub plugin.

## Historical v12 checkpoint (superseded above)

## CURRENT checkpoint — 25 October 2026, v12 Fit-out editor LOCAL; v11 production fully PASS

User confirmed all About editor tests: open, draft/private preview, publish, revert, language independence, image upload/private preview/restore. These confirmations supersede older pending v11 notes below.

v12: app/fitout-content.ts retains existing Start Project copy/media; app/start-project/page.tsx uses useFitoutContent. Four fixed sector IDs (pharmacies/bureaux/commerces/chambres) and /quote?sector= destinations remain code-owned; overall study stays /quote. Editor changes FR/AR/EN page/step/sector labels and descriptions, shared four images (existing protected R2 upload), not routing, sector count or quote submission behavior. Plain React text, fixed-size arrays, existing layout.

Pages → Fit-out → Contenu — Aménagement opens app/admin/fitout-editor.tsx (same draft/preview/publish behavior and dirty protections as About). site_settings key cms-content:fitout, no migrations. worker/fitout-content.ts validates strict default shape, 20k-string/250k-total, image safe URLs and CAS revisions; GET does not seed. Public GET /api/content/fitout published-only; admin GET/PUT/POST /api/admin/content/fitout behind existing admin-role + origin guard. /start-project?preview=fitout fetches protected draft; guests see explicit unavailable notice and defaults, never draft. Existing sidebar dirty warning limitation/orphan uploads remain as in About.

Incidental checks found low-contrast dark step backgrounds and unpersisted language in Start Project; fixed scoped dark steps/CTA colors and saved epstar-language on language change. Browser verified four loaded images, Arabic RTL/dark layout without desktop horizontal overflow, correct Pharmacy preselection on quote, Arabic retained after hydration, and guest preview unavailable notice. No authenticated admin preview/editor browser session available; user production lifecycle/upload tests remain pending. No production writes/deployment by executor; do not create old Sites project, do not suggest GitHub plugin.

New tests/fitout-content.test.mjs covers default/read-only GET, media/multilingual private draft/publish/revert, stale/concurrent writes, URL/array/size validation, origin/method guards, built Worker guest401/editor403, translation and editor wiring. Build and 30 tests passed before final CSS/language refinements; final outcome recorded at delivery. Full tsc baseline Cloudflare/older quote type failures remain, not a globally clean typecheck.

Exact next: overlay EPSTAR_fitout_editor_v12.zip atop v11, Commit 'feat: add multilingual fitout page draft editor', Push via existing GitHub Desktop, wait Cloudflare Ready. Open Pages → Fit-out content, then user-test draft/private preview, publish/revert, text-language independence and media replacement/restore. Verify four cards still preselect correct quote type and language. Services editors next, then quote content, rich custom-page builder/SEO, broader dashboard/team roles/AI. PROJECT_ROADMAP.md and PROJECT_STATUS.md updated alongside source.

## Historical v11 checkpoint (superseded by current above)

## CURRENT checkpoint — 25 October 2026, v11 About editor LOCAL, v10 production PASS

The user confirmed v8 ordering/footer, home draft/private preview/publish/revert, subpage placement and v10 arrowless/dark-mode fixes PASS. All older pending statements below are historical and superseded by this checkpoint.

v11 adds Pages → About → Contenu — À propos. app/about-content.ts extracts every current FR/AR/EN page text and five existing images unchanged. AboutEditor edits all copy (including fixed-size stats/value/method arrays), media through existing protected R2 upload, and projects button link. Language selector edits localized text, independent of admin UI locale. Existing layout retained; section count/order remains fixed; no rich HTML, extra blocks or section visibility controls in this stage. Decorative brand labels and shared quote form remain outside this editor.

Storage: site_settings key cms-content:about = {draft,published,revision}; no migration. worker/about-content.ts validates exact default shape/array sizes, strings <=20k and total <=250k, safe images/links, and compare-and-swap revisions. Public GET /api/content/about returns published only, never seeds DB. Admin GET/PUT/POST /api/admin/content/about is routed through existing admin-role authentication and same-origin write guard. PUT saves draft, POST publishes after client confirmation. Preview /about?preview=about uses protected admin GET, no public token. Guests receive unavailable notice and defaults, never draft. No production writes by executor.

Client: useAboutContent loads public/draft config; AboutEditor disables fields while saving/uploading and prevents preview of unsaved changes. Back/reload and browser unload warn for dirty state. Sidebar navigation is not covered by that back warning. Media settings shared among languages; texts independent; no automatic translation. Failed saves preserve draft input; 409 asks reload. Uploads may remain orphaned if abandoned (existing media behavior).

Checks: build +25 automated tests passed before semantic tuple-label refinement; final validation recorded at delivery below. New about tests cover read-only defaults, multilingual draft/private/publish/revert, two concurrent saves (200/409), URL/shape/size rejection, origin/method guards, deployed Worker guest401/editor403, editor syntax/i18n/wiring. Browser public page FR/AR+RTL/light/dark checked: all images loaded, no desktop horizontal overflow; private preview guest warning verified. No authenticated admin browser session available; user must test editor save/upload/preview/publish. Full tsc remains affected by baseline Cloudflare/global and older quote tuple issues; do not claim globally clean.

Delivery: overlay EPSTAR_about_editor_v11.zip atop v10 in user's existing GitHub Desktop repo; Commit 'feat: add multilingual about page draft editor', Push, wait Cloudflare Ready. Exact next test: Pages → About → Content; change French title with TEST, save draft, preview (TEST only there), public remains unchanged, then publish and revert. Test text-language independence and image replacement afterward. Remaining: fitout/services/quote content editors, richer custom pages/SEO, dashboard improvements, team roles, AI assistant. Do not create/redeploy an old Sites project or suggest declined GitHub plugin.

## Historical checkpoints (below)

## Current source and stopping point — 25 October 2026, v8 LOCAL / production pending

User screenshots confirm v7 deployed: 12 page records (11 built-ins + custom test page), test page visible in header, home editor visible. Home draft/publish tests still NOT user-confirmed. Requested drag ordering, footer correction and explanation of editor language selector.

v8: pageTreeOrder/movePage in app/page-registry.ts preserve parent groups; page list supports native desktop drag and accessible up/down buttons for touch/keyboard. Only sibling movement; moving roots carries children; parent change remains in edit form. POST /api/admin/content/pages/reorder validates exact current ID set, updates only JSON sortOrder in one D1 batch (json_set on existing records), preserving content/placement fields. New custom pages append after max order. Same order used by header/footer. No migration.

Footer root cause: PageNavigation gave nested groups class footer, matching the global .footer grid/padding. Changed to page-nav-footer/page-nav-header and scoped compact link wrappers in SiteFooter/page-navigation.css. Browser preview confirmed compact five-link footer ~444px, individual links ~32px and no horizontal overflow at current desktop viewport. Actual drag workflow not browser-tested due lack of admin session; helper/API regression tests cover persistence/parent groups/content preservation.

Home language selector is now explicitly labelled Language of the text you are editing, with explanation and prompt to open Page text / Hero and visitor journeys. It selects localized form values only, NOT admin UI locale, media or section order. No automatic translation. Build + 19 tests passed. No production writes/deploys by executor. Deliver EPSTAR_pages_order_footer_v8.zip overlay atop v7; user commits/pushes via existing GitHub Desktop repo. Update PROJECT_STATUS.md after user verification.

Exact next: commit `fix: page ordering footer layout and content language guidance`, deploy v8, test move test-page last and reload/menu propagation, arrows, footer FR/AR/EN, then text-language switching in expanded home fields. Continue pending home draft/preview/publish tests, followed by remaining built-in page editors.

## Previous checkpoint — 25 October 2026, v7 (historical)

User approved full content control staged: menus/page registry first, then existing page section editors starting with home. v7 implements those menus and home editor only. Do NOT claim all built-in page bodies are editable. Remaining about/fitout/services/quote section editors and rich custom-page blocks are next after tests.

v6 production confirmed by user PASS: admin locale/RTL persistence, automatic offers in admin/public, offer title save+revert, hide+republish, contact save/footer and cleanup. Screenshots confirm custom test page saved and linked in footer. Subpage production test pending. These confirmations supersede v6 pending status below.

Page registry: app/page-registry.ts holds 11 allowlisted built-ins with immutable native routes. Page records in cms:pages:<id> gain showInHeader/showInFooter and server-owned builtinId. Legacy custom pages default footer=true/header=false. POST pages/bootstrap INSERT OR IGNOREs built-ins; public read merges missing defaults without writes. Deleting built-ins is blocked; visible flag only controls their menu links, never disables routes. Custom visibility still gates public content. navigationPages builds placement-specific trees; child becomes root if its visible parent is excluded from that placement. Shared PageNavigation uses keyboard-accessible details for desktop/mobile children; SiteHeader/SiteFooter now share records. Existing custom records are not replaced. Raw builtinId spoofing on create is ignored. Slug collisions with built-in internal slugs do not rewrite custom pages.

Home: app/home-content.ts retains current defaults, translations/media/links. HomeEditor under Pages → Home content supports editable text/media/buttons, fixed-size existing sector arrays, order/visibility of 11 sections and 20 optional plain-text/image/button blocks (extras after existing sections). Hero sector count remains four. app/page.tsx renders existing section markup in saved order and loads managed catalogue/project feeds instead of static records; featured product then next 3 products, not measured sales rankings. Client logos still managed. Extra content is rendered safely as React text, no HTML execution.

Storage: site_settings key cms-content:home JSON {draft,published,revision}; no schema migration. GET /api/content/home is published-only. Authenticated admin GET/PUT/POST /api/admin/content/home gets draft, saves draft, or publishes respectively. Same-origin guard and admin-role wrapper retained. Optimistic compare-and-swap protects against stale concurrent saves. Shape, safe URL, duplicate block/order and size checks before writes. Home preview /?preview=home requests protected draft endpoint; no public preview tokens. Publish remains explicit. Media uses existing protected R2 upload endpoint.

Validation: build and 17 automated tests passed, full tsc still baseline Cloudflare Worker types + quote/start-project tuple issues. Public browser preview French/Arabic/RTL checked, no horizontal overflow at current desktop viewport. Local D1 initially had no schema and showed Vite error overlay; applied existing drizzle/0000 schema using --local with .wrangler/state only, reloaded successfully. No admin browser session used; authenticated editor and submenu UI need production verification. No production data or deployment writes by executor. Source remains /workspace/scratch/b8c9077386e2/restore/source/epstar-algerie-main. Deliver v7 overlay atop v6 through existing GitHub Desktop repo.

Exact next: copy v7 overlay → commit `feat: page menus and home content editor` → Push → Cloudflare Ready. Test custom page header/footer/both/neither, child navigation and native-route preservation. Test home draft save, ordinary-site unchanged, authenticated preview, explicit publish, revert, images/order/hide/extras. See Arabic PROJECT_STATUS.md checklist. Then implement section editors for other built-ins. Opening hours structured single-entry widget remains deferred.

## Previous checkpoint — 25 October 2026, v6 (historical)

Latest checkpoint supersedes the v5 deployment state below: user screenshots confirm v5 deployed and sections visible, but asks corrections before CRUD testing. v6 implemented locally, awaiting GitHub Desktop overlay/push and production tests. No external writes/deploy performed by executor.

v6 changes: one admin-main-menu with all 8 permitted views; admin-account-area contains separate account/role and locale picker. No cms-shortcuts navigation remains in JSX. Responsive single menu can wrap under brand/account on smaller screens. AdminI18nProvider/useAdminI18n, messages.ts (over 200 FR-source/AR/EN entries), epstar-admin-language persisted separately from public language; Arabic dir rtl, locale dates, labels/status/known notices translated. Content translations remain editable in all 3 languages regardless of UI locale. Locale switching does not key/remount forms.

Offers no longer require manual import: ContentManager load POSTs /api/admin/content/offers/bootstrap, then GETs list. Legacy /import aliases the same one-shot operation. A transactional D1 batch conditionally inserts 3 original bundled offers and cms-meta:offers-initialized marker. Existing keys/slugs are preserved; later edits/deletes are never overwritten/resurrected. Public and admin GET remain read-only. Marker is outside cms:offers: prefix. No migration.

Validation: build passed; 11 automated tests passed (content, bootstrap preservation/deletion, i18n coverage, menu structure, Worker auth/render, demo import/filter). Browser preview http://terminal.local:4173/admin: FR → AR → reload (dir rtl, lang ar retained) → EN passed; Arabic screenshot visually checked. Authenticated admin header/forms not browser-tested because preview has no signed-in session. Full tsc still has known baseline Cloudflare/quote page typing failures. See PROJECT_STATUS.md for exact production checks.

Source reconstructed from original GitHub ZIP plus v2/v3/v4/v5 Library overlays after workspace maintenance, then dependencies restored with npm run install:ci. New files app/admin/i18n.tsx, app/admin/messages.ts, tests/admin-i18n.test.mjs. Changed admin/page, content-manager+CSS, components/import-demo, worker/content, tests/content. Do not use an old checkout. Deliverable EPSTAR_dashboard_menu_languages_v6.zip is an overlay atop deployed v5. No full repository or secrets in ZIP.

## Previous checkpoint — 24 October 2026, v5 (historical)

Production v4 confirmed successful by user: demo import added 13 and skipped existing D02; follow-up filter/edit test reported passed. Earlier ASSETS blocker is resolved.

Active source: /workspace/scratch/b8c9077386e2/restore/source/epstar-algerie-main. The old epstar-algerie checkout is stale. User deploys through existing GitHub Desktop repository; do not create a new Cloudflare or Sites project. No executor push credentials.

v5 implemented locally, not yet deployed: admin offers/contact/custom pages, public managed offers and /pages/:slug, shared footer contact and published nested page links, quote WhatsApp/email recipients and selected-offer message. New APIs require admin role; public content excludes drafts and children of hidden parents. Two page levels only; parent delete blocked while children exist. Content is plain text rendered by React, never HTML.

Persistence uses existing site_settings: contact plus cms:offers:<id> / cms:pages:<id> JSON records. No schema migration. R2 cms/<uuid> for offer uploads (JPG/PNG/WEBP, 8 MiB). Demo offer import is explicit and idempotent. Existing images are retained on replace/delete; orphan cleanup deferred.

Entry points: worker/content.ts, app/content-model.ts, app/admin/content-manager.tsx + CSS, app/components/use-content.ts, app/offers/managed-offers.tsx, app/pages/[slug]/page.tsx. API: GET /api/content; GET/POST/PUT/DELETE /api/admin/content/{offers,pages}[/:id]; POST /api/admin/content/offers/import; GET/PUT /api/admin/content/contact; POST /api/admin/content/media; GET /api/content/media/:id. Admin authentication wrapper is in worker/index.ts.

Build passed and 7 node tests passed, including actual built Worker 401/403 and offers/page HTML route checks. Full tsc remains blocked by baseline Cloudflare types and quote/start-project tuple errors (no claim of a clean typecheck). Browser QA unavailable: managed preview failed with vite not found. Production test pending. See PROJECT_STATUS.md for Arabic deployment/test checklist and known limitations. New pages are client-rendered with an unavailable state, not HTTP404; SEO and rich text are deferred. Homepage product/project sections still static.

## Repository and deployment

- Active local source: `/workspace/scratch/b8c9077386e2/restore/source/epstar-algerie-main` (older checkout is stale).
- Remote: `https://github.com/IshakDvp/epstar-algerie.git`
- Worker: `epstar-algerie`
- Production URL: `https://epstar-algerie.ishakdib-contact.workers.dev`
- D1 database: `epstar-algerie-db` (`33fadf06-2c4a-44d7-872d-5dadaa452e35`)
- R2 binding: `BUCKET` -> `site-creator-r2`

## Important environment values

- `INITIAL_ADMIN_EMAIL` = `ishakdib.contact@gmail.com`
- `RESEND_API_KEY` is a Cloudflare secret.
- `MAIL_FROM` = `EPSTAR <onboarding@resend.dev>` (temporary sender).

## Published baseline

- Dashboard management was pushed through GitHub Desktop and Cloudflare deployed commit message `feat: EPSTAR dashboard management` successfully on 24 October 2026 (Cloudflare version `db6f18ee`).
- Production verification passed for admin login, categories/subcategories, and the test product `Bureau Direction D02`.

The executor itself still has no GitHub credentials; use the user's GitHub Desktop for future pushes.

## Dashboard routes

- `/api/admin/overview` — protected overview.
- `/api/admin/requests` — protected quote list.
- `/api/admin/requests/:id` — protected quote detail / status patch.
- `/api/admin/attachments/:id` — protected R2 attachment download.
- `/api/admin/categories` — protected category list/create.
- `/api/admin/categories/:id` — protected category edit/delete.
- `/api/admin/products` — protected product list/create.
- `/api/admin/products/:id` — protected product edit/delete.
- `/api/admin/products/:id/images` — protected product-image list/upload (JPG, PNG, WEBP; 8 MB each; max 8).
- `/api/admin/product-images/:id` — protected primary-image patch/delete.
- `/api/admin/product-images/file/:id` — protected image preview.
- `/api/catalogue` — public managed-product list, including primary image URLs; supports `?ids=id1,id2` for the quote cart.
- `/api/catalogue/products/:slug` — public managed-product detail.
- `/api/catalogue/images/:id` — public cached product image.
- `/api/admin/projects` and `/api/admin/projects/:id` — protected realisation CRUD.
- `/api/admin/projects/:id/images` and `/api/admin/project-images/file/:id` — protected project photo upload/preview.
- `/api/projects` and `/api/projects/images/:id` — public realisation feed and images.
- `/api/projects/:slug` — public managed-realisation detail and ordered gallery images.
- `/api/admin/client-logos` — protected client-logo list/upload; JPG, PNG or WEBP, 8 MB maximum.
- `/api/admin/client-logos/:id` — protected visibility update/delete.
- `/api/admin/client-logos/file/:id` and `/api/client-logos/:id` — protected preview and public logo file.
- `/api/client-logos` — public visible client-logo list for the homepage.

## Validation

- `npm run build` passed after client-logo management and the public trust-section implementation.
- Production client-logo lifecycle passed on 24 October 2026: test logo `Tijaro` uploaded, listed with visibility controls, and displayed on the home page.
- Do not add/delete the untracked user file: `public/images/.shop-3d.png.EXMD9g`.
- Do not add/delete the untracked generated file `.epstar-project-language-footer.tar.gz.L9hrSy`.

## Exact next action

Copy EPSTAR_pages_order_footer_v8.zip overlay atop v7. Commit `fix: page ordering footer layout and content language guidance`, Push, wait for Cloudflare Ready. Test page ordering/refresh/menu propagation, footer layout and content-language switching; continue home draft/preview/publish/revert checks before implementing remaining page editors. See current PROJECT_STATUS.md.
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

## 2026-11-02 — v30 approved two-path Solutions navigation

- Header defaults: Home, Solutions, Offers, Projects, About. Solutions keeps native /#services anchor and has only Fit-out (/start-project) and Ready-made products (/catalogue). Initial labels AR منتجات جاهزة / FR Produits prêts / EN Ready-made products are editable through Pages; custom labels are preserved.
- All four sector pages and their content remain. They are not header children; Home solutions links remain, and Fit-out now includes links to their detail pages. Original sector quote cards remain unchanged.
- Read-only projection supports existing records immediately. Authenticated Pages bootstrap persists the one-time cms-meta:solutions-navigation-v2 migration using raw-value conditional updates; later team edits are not reset. Custom children of the two moved native pages are promoted to roots to avoid a third level; custom pages/content/footer flags are retained.
- Compact header shows the two child links directly, parent anchor works directly, close icon is explicit, links have minimum44px targets, panel scrolling is bounded. Desktop parent highlights on either child route; aria-current remains for exact destination.
- Verified: npm run build PASS; node --test tests/*.test.mjs77/77 PASS, zero failures/skips. Local desktop browser confirmed five roots and exactly two Solutions children using ArrowDown; Home sector detail link observed. Local preview reports missing client_logos table (fresh unseeded local D1), so populated visual/mobile/admin/end-to-end matrix NOT VERIFIED. No production DB changes, deployment, email sending or dependency upgrades performed.
- v29 atomic magic-link claim, header dismissal, theme/language SSR and previous Home/footer fixes preserved. Full PEQG is NOT PASSED; previous launch blockers remain.
- Delivery: overlay EPSTAR_solutions_two_paths_v30.zip on installed v29. Copy files, Commit/Push existing repo, then open Dashboard > Pages once to persist structure. Review custom root links if present. Test anchor, both destinations, sector access, renamed labels, mobile and AR/FR/EN light/dark.
- Rollback: revert code commit; persisted menu changes require editing Pages structure or restoring an approved DB backup. Code rollback does not undo saved menu data. Do not delete pages or migration markers blindly.

