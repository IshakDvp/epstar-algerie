# EPSTAR — Home PEQG stage 1 / v29

Date: 2026-11-02. Scope: reconstructed original + ordered v2–v28 overlays; Home, shared navigation, language/theme, Home CMS and admin entry. This is NOT production release approval. No production data, mail, credentials or remote writes used.

## UX recommendation — awaiting agreement

Use a short hub Home, not the whole brochure and full request form on one page.

| Header | Destination / purpose |
| --- | --- |
| Home | Home |
| Solutions | Existing Home solutions anchor + current pharmacy/office/retail/bedroom child pages |
| Products | Catalogue |
| Our work | Projects |
| Offers | Offers |
| Quote action | Existing quote/start-project flow; retain cart access as secondary action |

Move About to footer. Put Fit-out under Solutions rather than a competing top-level choice. Preserve all current URLs and CMS records; do not delete pages. Keep parent hover, keyboard and touch behavior. Do not implement this hierarchy by hardcoding a second navigation independent of CMS.

Recommended Home: hero/two paths -> trust -> compact solution overview -> selected products -> selected work -> one compact quote CTA -> footer. A genuine client strip is optional when real references exist. About, detailed process and testimonials belong in existing About/Fit-out content; the full form remains on the dedicated request flow. Do not create a new page for every small section. Existing Home sections should be hidden/reused, not erased; saved translations and team controls retained.

No IA/menu/section deletion was applied in v29. v28 agreed ordering remains authoritative until user approves shortening.

## Architecture and preserved baseline

- Vinext/React; entry worker/index.ts -> app/layout.tsx providers -> app/page.tsx. Vite build retains ESM Worker and ASSETS binding.
- Public CMS SSR snapshot uses request-isolated context; Home products/projects/logos present before hydration. Shared cookie-backed locale/theme + pre-paint handling retained.
- D1 DB holds CMS/settings, catalogue/projects/quotes and auth; R2 BUCKET holds media/attachments; Resend sends magic links.
- Home drafts/published values and optimistic revision/raw-value CAS retained, including v28 legacy-order projection and explicit saved orderVersion.
- Node24.22.1/npm11.9.0 Linux local environment. No dependency versions changed. No schema migration.

## Gate verdicts — whole-gate, not individual test labels

| Gate | Status | Evidence / gap |
| --- | --- | --- |
| G1 Architecture | NOT VERIFIED | Entry points and recovery inventory documented; full module/deployment reproducibility review pending |
| G2 Integrity | NOT VERIFIED | Home CAS/draft/order regressions pass; quote idempotency/R2 failure cleanup/migration rollback not proven |
| G3 Security | FAIL | Single-use race fixed; 6 anonymous admin cases rejected; dependency advisories untriaged, complete role/CSRF/rate-limit review pending |
| G4 Reliability | FAIL | Email response failures ignored and submission retry behavior unproven; menu dismissal improved |
| G5 Performance | NOT VERIFIED | Viewport checks are not load tests; no LCP/CLS/p50/p95/load/memory budget evidence |
| G6 Recovery | NOT VERIFIED | Source backup exists, but no D1+R2 restore drill, retention or RPO/RTO agreement |
| G7 Tests | NOT VERIFIED | 76 automated tests pass; scoped browser evidence below; real-device/authenticated-admin E2E incomplete |
| G8 Production | NOT VERIFIED | No live deployment/monitoring/rollback drill or environment/mail delivery certification |

## Ranked findings

| ID | Severity | State | Finding / launch action |
| --- | --- | --- | --- |
| SEC-01 | High | FIXED locally | Two concurrent magic-link reads could both create sessions. Baseline race test returned302/302. Atomic conditional UPDATE + changes===1 now returns302/401 and exactly1 session; replay401. A failure after token claim fails closed; user requests a new link. Not an authentication redesign. |
| NAV-01 | Medium | FIXED locally | Mobile disclosure lacked outside/Escape/focus-leave/desktop-resize dismissal and aria-controls. Added bounded listener lifecycle, focus return on Escape, cleanup and controlled ID. Existing submenu behavior preserved. |
| DEP-01 | Critical alert / applicability NOT VERIFIED | OPEN launch hold | npm audit flags43 vulnerable package entries:1 critical,18 high,23 moderate,1 low. Critical entry is next16.2.6; suggested version16.4.4. Vinext runtime differs from Next server and some advisories are Windows/feature-specific: this is NOT proof of a reachable production exploit, nor permission to dismiss it. Triage runtime reachability, plan compatible pinned upgrades, rerun audit/build/regressions before release approval. Do not run audit fix --force. |
| REL-01 | High | OPEN | requestMagicLink awaits Resend but does not check response.ok or set a timeout; missing MAIL_FROM/key returns same generic success. Preserve anti-enumeration but add sanitized operational failure evidence, bounded timeout and delivery test. No production mail was sent. |
| REL-02 | High | OPEN | Home quote submit has no in-flight guard or server idempotency key. Source inspection shows retry/double-click duplication risk; not yet reproduced with a real persistent request. Add isolated repeat-operation/fault tests, then one-request guarantee and upload cleanup. |
| OPS-01 | High | NOT VERIFIED | D1+R2 backup/restore, rollback and alerting lack fresh evidence. Before launch: export/test restore synthetic DB+media, document owner/retention/RPO/RTO, then approved production backup workflow. |
| SEC-02 | High risk review | NOT VERIFIED | Complete role matrix, request-link throttling, cross-origin mutation policy and upload negative tests not complete. CMS rejects non-admin in source; other operational APIs mostly require any active user. Product policy must specify intended roles before changing permissions. |
| TYPE-01 | Medium | OPEN | tsc --noEmit exits2 with27 diagnostics (Cloudflare types plus existing quote tuple typing). Build passes but not a clean type check; do not suppress errors. |
| UX-01 | Medium | PROPOSED | Too many top-level choices and duplicated long-form content. Agree short hub IA, then apply via CMS with rollback and navigation regressions. |

Release rule: no unresolved Critical finding; High risks need documented owner/mitigation/explicit acceptance. Owner for unresolved decisions: project owner Ishak; remedy before launch, not silently accepted by this report. Automated PASS is not global PEQG PASS.

## Browser evidence (local only, synthetic content)

Restored isolated D1 with existing migrations;4 synthetic products,3 projects,2 logos, images seeded to LOCAL R2. No production records imported, QA fixture files not shipped.

- Desktop AR light Home: clientWidth=scrollWidth1348;3 product cards + featured,3 work cards,2 logos;0 broken images. Screenshot reviewed internally.
- AR dark Home -> catalogue: DOM lang ar, dir rtl, theme dark retained after navigation. AR light transition also observed. This does not prove absence of every intermediate-frame flash.
- Phone390 iframe (content375): AR dark no horizontal overflow, hero930.796875px. Four explicit solution selections: [930.796875,930.796875,930.796875,930.796875]. Hero/solution DOM copy synchronized after settling.
- Tablet768 iframe (content753): scrollWidth753. Responsive screenshot reviewed internally, not real-device approval.
- Phone FR dark Home: width/scroll375, hero1018.875; EN dark Home973.390625, no overflow. Language switches and RTL/LTR observed; not full6-combination/zoom matrix.
- Mobile open aria-expanded true -> outside action false. Escape false and focusReturned true. Unit test covers focus-leave/desktop-resize/listener cleanup. One multi-action harness sequence later reached catalogue; cause not attributed, so complete outside-click/non-navigation behavior still needs fresh real-device E2E.
- Authenticated admin browser flow, landscape rotation, keyboard full tab traversal, every menu/child page, light-mode phone matrix and production flash videos NOT VERIFIED.

## Next fast stages

1. Resolve DEP-01 applicability/compatible upgrades and REL-01 delivery fault tests before approving launch; preserve source snapshot.
2. Add quote idempotency/upload failure tests and restore drill; fill security role/CSRF/throttle matrix.
3. Get agreement on the short hub/menu above; implement via dashboard data, then test routes, keyboard/touch and locale/theme before/after.
4. Complete phone/landscape/desktop6 locale-theme combinations and authenticated draft/save/preview/publish E2E; then repeat the same matrix for catalogue, services, work and offers.

No date-based shortcut or global PASS. Ship bounded fixes/evidence while keeping each outstanding risk visible.
