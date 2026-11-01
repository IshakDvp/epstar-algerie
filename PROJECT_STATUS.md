# متابعة مشروع EPSTAR الجزائر

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

 
## الحالة الحالية — 26 أكتوبر 2026، v20 تحديد حلولنا بالأحمر

- تحديد حلولنا حسب رابط القسم مع الخط الأحمر الموجود، وإلغاء تحديد الرئيسية في نفس الحالة.
- التحديد يتابع الضغط والريفرش والرجوع والتقدم، بما فيه انتقال v19 المؤجل. لا تغيير على التمرير أو المحتوى.
- البناء و56 اختبارًا ناجحة؛ المتصفح أكد أن حلولنا وحدها محددة، ثم الرئيسية وحدها عند الرجوع إليها.
- التالي: v20 فوق v19 ثم Commit وPush واختبار التحديد والوضع الليلي، ثم العودة لاختبارات محررات الخدمات.

السجل السابق أدناه للتوثيق.
 
## الحالة الحالية — 26 أكتوبر 2026، v19 معالجة موضع حلولنا مع المنتجات

- اختبار المستخدم لـv18 كشف بقاء المشكلة: الوصول إلى «الأكثر مبيعًا» بدل «حلولنا». التصحيح السابق وحده غير كافٍ.
- تحميل إعدادات ومحتوى الرئيسية والمنتجات والإنجازات والشعارات قبل عرض الصفحة، ثم الاحتفاظ بنفس البيانات أثناء التهيئة.
- الانتقال الأول إلى حلولنا ينتظر جاهزية الصفحة والخطوط ويُنفّذ مرة واحدة؛ التنقل داخل الرئيسية يبقى بالرابط الطبيعي. لا تغيير على بيانات العميل أو المسودات.
- البناء و54 اختبارًا ناجحة. تجربة محلية بأربعة منتجات وقسم الأكثر مبيعًا: الوصول استقر عند120px تحت هيدر84px من المنتجات والتجهيز الكامل وبعد الريفرش. تأكيد المستخدم على الإنتاج مطلوب.
- التالي: v19 فوق v18 ثم Commit وPush واختبار نفس الفيديو. لا نعتبر المشكلة منتهية قبل PASS المستخدم، ثم نرجع لاختبارات محررات الخدمات.

السجل السابق أدناه للتوثيق.
 
## الحالة الحالية — 26 أكتوبر 2026، v18 ثبات الهيدر والانتقال لحلولنا

- تثبيت خط المينيو ومسافاته وارتفاع الهيدر بين الصفحات؛ المقارنة المحلية للرئيسية والمنتجات أعطت نفس القياسات.
- إلغاء إعادة التمرير بعد تحميل بيانات الرئيسية؛ رابط حلولنا يستعمل انتقال المتصفح الأصلي مع المسافة المناسبة تحت الهيدر.
- البناء و51 اختبارًا ناجحة. وصول حلولنا محليًا عند120px والهيدر84px. اختبار نفس الفيديو على الإنتاج والهاتف مطلوب بعد النشر.
- التالي: تحديث v18 فوق v17 ثم Commit وPush؛ الرئيسية إلى المنتجات ثم حلولنا، وتجربة اللغات والهاتف. بعدها نكمل اختبارات محررات الخدمات المتوقفة.

السجل السابق أدناه للتوثيق.
 
## الحالة الحالية — 25 أكتوبر 2026، v17 منع وميض اللغة

- توحيد اللغة للصفحات العامة بدل بدء كل صفحة بالفرنسية؛ العربية وRTL يتحمّلان مع الصفحة من البداية، مع ترحيل الاختيار المحفوظ سابقًا.
- الهيدر والتنبيهات يستعملان نفس الاختيار. لغات محررات المحتوى والداشبورد مستقلة كما كانت، وتصحيح الدارك محفوظ.
- البناء و50 اختبارًا ناجحة. تجربة المتصفح: الرئيسية إلى عروضنا ثم الريفرش بالعربية، التنقل بالإنجليزية، والتبديل للفرنسية نجحت محليًا.
- التالي: تحديث v17 فوق v16 ثم Commit وPush؛ اختبار مسار الفيديو والريفرش باللغات الثلاث والدارك. تأكيد المستخدم للإنتاج مطلوب قبل استكمال اختبارات محررات الخدمات.

السجل السابق أدناه للتوثيق.
 
## الحالة الحالية — 25 أكتوبر 2026، v16 منع وميض اللايت

- المستخدم وضّح أن اللايت يظهر مؤقتًا عند التنقل فقط، وليس تغييرًا دائمًا.
- توحيد الثيم للصفحات العامة، تحميل الاختيار المحفوظ مع الصفحة وتهيئته قبل ظهور المحتوى؛ الحفاظ على إعدادات اللغات والمحتوى.
- البناء و47 اختبارًا ناجحة. تجربة محلية: دارك في الرئيسية ثم التجهيز الكامل والريفرش والصيدليات؛ التبديل للايت يعمل.
- التالي: تحديث v16 فوق v15 ثم Commit وPush؛ إعادة نفس مسار الفيديو واختبار الريفرش واللغات. تأكيد المستخدم للإنتاج ما زال مطلوبًا، ثم نرجع لاختبارات محررات الخدمات.

السجل السابق أدناه للتوثيق.
 
## الحالة الحالية — 25 أكتوبر 2026، v15 ثبات المينيو عند الريفرش

- السبب: عرض المينيو الافتراضي ثم استبداله بإعدادات الداشبورد بعد تحميل الصفحة.
- التصحيح: تحميل المحتوى المنشور قبل عرض الصفحة ومشاركته بين الهيدر والفوتر، دون تغيير البيانات أو إعدادات الفريق.
- البناء و44 اختبارًا ناجحة، منها ظهور الاسم المحفوظ في HTML الأول وعزل طلبين متزامنين. اختبار المتصفح والإنتاج عند المستخدم مطلوب.
- التالي: نسخ تحديث v15 فوق v14 ثم Commit وPush؛ اختبار الريفرش في الرئيسية وغرف النوم وصفحة مخصصة. ثم متابعة اختبارات محررات الخدمات التي لم يؤكد المستخدم منها إلا فتح المحرر.

السجل السابق أدناه للتوثيق.

## الحالة الحالية — 25 أكتوبر 2026، v14 قائمة حلولنا

- أكد المستخدم أن المقصود «حلولنا» وليس «أعمالنا». أضفناها في المينيو العلوي بثلاث لغات، والضغط ينقل إلى سكشن حلولنا في الرئيسية حتى من صفحة أخرى.
- الخدمات الأربع الحالية صارت صفحات فرعية افتراضيًا تحتها، بنفس روابطها ومحرراتها، مع القائمة المنسدلة بدون سهم. الأسماء والترتيب والظهور ما زالت قابلة للتحكم من الصفحات.
- تجهيز الربط مرة واحدة يحافظ على أسماء الفريق وترتيبها وظهورها في الفوتر؛ لا يعيد فرض التجميع بعد تعديل الفريق. الترتيبات المخصصة السابقة لا تُكسر، ولا يُنشأ مستوى ثالث.
- نجح البناء و42 اختبارًا. فُحص فتح الفرعيات والتنقل للقسم من الرئيسية والصيدليات ووضوح الوضعين محليًا؛ اختبار الهوفر والهاتف عند المستخدم مطلوب بعد النشر.
- v13: نجاح فتح محرر الخدمة مؤكد فقط. المسودة والمعاينة والنشر والإرجاع واللغات والصور للخدمات ما زالت تنتظر استكمال الاختبار، فلا تعتبرها ناجحة بعد.
- التالي: نشر v14 فوق v13، اختبار حلولنا وفتح قسم الصفحات لحفظ التجميع الأولي، ثم نكمل اختبارات الخدمات قبل محرر محتوى صفحة الطلب.

## الحالة الحالية — 25 أكتوبر 2026، v13 محررات الخدمات الأربع

- أكد المستخدم نجاح جميع اختبارات التجهيز الكامل v12، بما فيها النشر والإرجاع واللغات والصور وروابط أنواع المشاريع الأربعة.
- أُضيف محرر مستقل لكل خدمة: الصيدليات والمكاتب والمحلات وغرف النوم. النصوص بثلاث لغات، قائمة التجهيزات ومراحل العمل والصورتان، مع المسودة والمعاينة الخاصة والنشر المنفصل لكل صفحة.
- بقيت روابط الخدمات ونموذج التسعير ووظيفة الإرسال كما هي. صُحح خلل اكتُشف بالمتصفح كان يغيّر نوع المشروع عند تبديل لغة النموذج؛ مفاتيح خيارات المشروع والميزانية والمدة أصبحت ثابتة.
- نجح البناء و37 اختبارًا آليًا. فُحصت الصفحات الأربع واللغات والاتجاه والوضعان والصور والاختيار التلقائي وحماية المعاينة محليًا؛ اختبارات محرر المسؤول عند المستخدم لم تتم بعد.
- بعد نشر v13 فوق v12: الصفحات ← الصيدليات ← محتوى — الخدمة. نختبر المسودة والمعاينة أولًا ثم النشر والإرجاع واللغات والصور واستقلال بقية الخدمات. بعد نجاح الخدمات ننتقل لمحرر محتوى صفحة الطلب.
- ملفات السجل الأقدم أدناه تاريخية؛ هذه الحالة الحالية تتقدم عليها. لا تغيير للمخطط ولا كتابة إنتاجية من طرفنا.

## الحالة الحالية — 25 أكتوبر 2026، v12 محرر التجهيز الكامل

- أكد المستخدم نجاح جميع اختبارات «من نحن»: المسودة والمعاينة الخاصة والنشر والإرجاع، استقلال اللغات ورفع الصورة وإرجاعها.
- أضفنا «محتوى — التجهيز الكامل» ضمن الصفحات: العناوين ونصوص المراحل وأسماء ووصف المساحات الأربع وصورها، بثلاث لغات ومسودة ومعاينة ونشر مستقل.
- روابط أنواع المشاريع ثابتة لضمان وصول كل بطاقة إلى نوع الطلب الصحيح؛ نموذج الطلب وإرساله لم يتغيرا. حُسّن تباين المراحل ليلًا وحفظ اللغة المختارة عند الانتقال إلى الطلب.
- بعد نشر v12 فوق v11: افتح المحرر، ثم اختبر المسودة والمعاينة والنشر والإرجاع واللغات والصور، وبعدها انتقال البطاقات لنوع المشروع الصحيح. اختبارات المستخدم لهذه النسخة لم تُنجز بعد.
- الخطوة التالية بعد الاختبار: محررات صفحات الخدمات، ثم محتوى صفحة الطلب. الحالات الأقدم أدناه تاريخية.

## الحالة الحالية — 25 أكتوبر 2026، v11 جاهزة للنشر فوق v10

- أكد المستخدم نجاح ترتيب الصفحات والفوتر، ومسودة الرئيسية ومعاينتها ونشرها وإرجاعها، والصفحات الفرعية وتصحيحات القائمة والوضع الليلي في v10.
- أُضيف محرر «محتوى — من نحن» ضمن الصفحات: النصوص بثلاث لغات، الأرقام والالتزامات والخبرات والفريق، خمس صور ورابط المشاريع. المحتوى الحالي محفوظ والتصميم لم يتغير.
- الحفظ مسودة منفصلة، المعاينة خاصة بالمسؤول، والنشر إجراء مستقل مع تأكيد. حماية من تعارض الحفظ؛ لا تغيير لقاعدة البيانات ولا كتابة إنتاجية من طرفنا.
- بعد النشر: عدّل عنوانًا فرنسيًا بكلمة TEST، احفظ وعاين، تأكد أن الموقع العادي لم يتغير، ثم اختبر النشر والإرجاع. بعدها تبديل لغة النصوص ورفع صورة.
- بقية محررات التجهيز والخدمات والطلب لم تُنفّذ بعد. المعلومات الأقدم أدناه تاريخية وتُرجع لهذه الحالة عند التعارض.

آخر تحديث: 25 أكتوبر 2026 — حزمة pages-order-footer v8، فوق v7 المنشورة.

## تصحيح v8 — الترتيب والفوتر وتوضيح اللغة

لقطات المستخدم تؤكد نشر v7 وظهور سجل الصفحات ومحرر الرئيسية، وتؤكد ظهور صفحة الاختبار في القائمة العلوية. لا تعتبر حفظ/معاينة/نشر الرئيسية ناجحة إنتاجيًا بعد؛ لم يؤكد المستخدم هذه الاختبارات.

- ترتيب الصفحات بالسحب على الحاسوب أو أزرار ↑↓ للهاتف ولوحة المفاتيح. الحفظ تلقائي ويؤثر في الترتيب المشترك للقائمة العلوية والفوتر. تتحرك الصفحة الرئيسية مع صفحاتها الفرعية، والفرع يعاد ترتيبه بين إخوته فقط؛ تغيير الصفحة الأم يتم من نموذج التعديل.
- معالجة ترتيب جميع العناصر ضمن عملية واحدة، دون إعادة كتابة النصوص أو خيارات ظهورها. الصفحات الجديدة تضاف آخر الترتيب افتراضيًا.
- تصحيح خلل الفوتر: كان العنصر الداخلي يحمل class باسم footer، فأخذ تنسيق الفوتر الكامل. أصبح الاسم page-nav-footer، مع حاوية روابط مضغوطة ومنفصلة.
- قائمة اللغة في محرر الرئيسية أصبحت بعنوان «لغة النصوص التي ستعدلها»، مع شرح أنها لا تغير لغة الداشبورد أو ترتيب الأقسام. لرؤية أثرها افتح «نصوص الصفحة» أو «البانر ومسارات الزائر»؛ تتغير قيم النصوص داخل الحقول حسب اللغة المحددة. الصور والروابط وترتيب الأقسام مشتركة بين اللغات.
- نجح build و19 اختبارًا آليًا. عاينا الفوتر محليًا: ارتفاعه نحو 444px في قياس المتصفح، وكل رابط نحو 32px، دون تجاوز أفقي. لم تُختبر عملية السحب داخل جلسة admin في المتصفح بعد، ويجب اختبارها بعد النشر.

اختبار v8: انسخ EPSTAR_pages_order_footer_v8.zip فوق المشروع الحالي، Commit بعنوان `fix: page ordering footer layout and content language guidance` ثم Push. بعد نجاح النشر اسحب صفحة الاختبار إلى آخر صفحة رئيسية وتأكد من الحفظ بعد التحديث وفي القائمتين، وجرّب الأسهم. راجع الفوتر باللغات الثلاث. ثم افتح محرر الرئيسية → نصوص الصفحة → بدّل لغة المحتوى وتأكد من تغير قيم الحقول دون تغيير لغة الواجهة. أكمل بعدها اختبارات المسودة/المعاينة/النشر الموجودة في سجل v7 أدناه.

## آخر نقطة توقف — v7

طلب المستخدم تحكمًا كاملًا بالمحتوى، واتفقنا على التنفيذ على مراحل. هذه المرحلة تضيف إدارة أماكن ظهور الصفحات وسجل الصفحات الحالية، ومحرر محتوى الرئيسية. **ليست كل أقسام جميع الصفحات قابلة للتحرير بعد.**

- لكل صفحة اختيار مستقل: القائمة العلوية / الفوتر / كلاهما / بدون رابط في القوائم. القوائم المشتركة تستعمل نفس البيانات باللغات الثلاث، مع الصفحات الفرعية. إن اختيرت الفرعية وحدها لمكان لا تظهر فيه الأم، تظهر كرابط مستقل في ذلك المكان.
- سجل 11 صفحة أساسية: الرئيسية، المنتجات، التجهيز الكامل، العروض، الإنجازات، من نحن، طلب السعر، وخدمات المجالات الأربعة. يتم تجهيز السجل تلقائيًا عند فتح الصفحات. روابط الصفحات الأساسية ثابتة ولا تُحذف؛ إخفاؤها يعني إخفاء رابط القائمة، وليس تعطيل وظائفها.
- الرئيسية → «محتوى الرئيسية»: نصوص بثلاث لغات، صور ورفعها، روابط الأزرار، ترتيب وإخفاء الأقسام الـ11، وإضافة حتى 20 قسمًا بسيطًا (عنوان، نص، صورة، زر) بعد الأقسام الحالية.
- الرئيسية تدعم حفظ مسودة ثم معاينتها داخل جلسة المسؤول ثم نشرها. المسودة لا تظهر في API العام. يمنع الحفظ فوق نسخة عُدلت من جلسة أخرى عبر رقم مراجعة.
- منتجات وإنجازات الرئيسية أصبحت مرتبطة ببيانات الداشبورد، وشعارات العملاء بقيت مرتبطة به. بطاقة «المنتج المميز» تستخدم أول منتج مميز أو أول منتج ظاهر، والبطاقات التالية أول ثلاثة منتجات أخرى؛ ليست إحصاءات مبيعات فعلية.
- المنتجات والعروض والإنجازات لها زر للانتقال إلى القسم المختص. تحرير أقسام «من نحن» و«التجهيز الكامل» والخدمات وصفحة الطلب **ما زال للمرحلة التالية**؛ تعديل القائمة لها متاح الآن.

## نتائج اختبارات المستخدم حتى v6

- اللغة العربية وRTL وحفظ اللغة: PASS.
- ظهور العروض الثلاثة تلقائيًا في الداشبورد والموقع: PASS.
- تعديل عنوان عرض وحفظه ثم إرجاعه: PASS.
- إخفاء عرض وإعادة نشره: PASS.
- حفظ عنوان التواصل وظهوره في الفوتر ثم تنظيف النص التجريبي: PASS.
- إنشاء صفحة اختبار وظهورها في الفوتر: مؤكد باللقطات. اختيار أماكن القوائم غير متاح في v6 ويضاف الآن. الصفحات الفرعية لم تُختبر إنتاجيًا بعد.

## اختبار v7 بعد النشر

1. انسخ EPSTAR_pages_home_editor_v7.zip فوق نفس المشروع الذي يحتوي v6، ثم Commit بعنوان `feat: page menus and home content editor` وPush. لا تغيّر أي إعداد نشر أو قاعدة بيانات؛ لا توجد migration جديدة.
2. الصفحات → افتح صفحة الاختبار الموجودة → فعّل القائمة العلوية فقط واحفظ → حدّث الموقع وتأكد من ظهورها فوق واختفائها من الفوتر. ثم جرّب الفوتر فقط، ثم الاثنين. لا تغيّر روابط الصفحات الأساسية.
3. أنشئ صفحة فرعية تجريبية منشورة واربطها بصفحة الاختبار، وفعّل نفس المكان للأم والفرعية. اختبر سهم القائمة العلوية ولوحة المفاتيح وقائمة الهاتف والعربية والفرنسية والإنجليزية.
4. في سجل الصفحات اضغط «محتوى الرئيسية». اختر لغة المحتوى، وعدّل مؤقتًا عنوان «من نحن» داخل الرئيسية، ثم «حفظ المسودة».
5. افتح الموقع العادي: لا يظهر التعديل. اضغط «معاينة»: يظهر التعديل مع تنبيه المسودة. المعاينة تتطلب جلسة admin نفسها؛ ليست رابطًا عامًا للمشاركة.
6. انشر وتأكد أن الموقع العادي يعرض التعديل بعد التحديث. أعد النص الأصلي وانشر مجددًا.
7. جرّب إخفاء قسم وإرجاعه، وتحريك قسم ثم إعادة ترتيبه، ورفع صورة تجريبية، وإضافة قسم إضافي ثم إخفائه. احفظ المسودة وعاين قبل النشر.
8. اختبر أن منتجات وإنجازات الرئيسية تفتح العناصر الصحيحة من قاعدة البيانات. سجّل نتائج الاختبارات ثم نبدأ محررات بقية الصفحات.

## التحقق المحلي v7

نجح البناء و17 اختبارًا آليًا للصفحات والقوائم والمسودة/النشر والمراجعات وحماية API، بالإضافة للاختبارات السابقة. عاينا الرئيسية بالفرنسية والعربية وRTL دون تجاوز أفقي في قياس المتصفح المستخدم. كانت قاعدة المعاينة المحلية فارغة؛ طبقنا ملف schema السابق محليًا فقط ثم نجح العرض. لم نسجّل دخول مسؤول في المعاينة، لذا واجهة محرر الرئيسية والقوائم الفرعية تحتاج اختبارًا داخل جلسة المستخدم بعد النشر. فحص TypeScript الكامل ما زال متأثرًا بتعريفات Cloudflare وأنواع صفحات الطلب السابقة، ولم تظهر أخطاء نوعية جديدة في واجهات v7.

## سجل v6 السابق (للتاريخ؛ تعليمات v7 أعلاه هي الحالية)

## أين وصلنا؟

العميل أكد نجاح اختبار المرحلة السابقة: فلاتر المنتجات والإنجازات، واستيراد المحتوى التجريبي. الاستيراد أضاف 13 عنصرًا وتجاوز عنصرًا موجودًا دون تكرار.

لقطات المستخدم تؤكد نشر v5 وظهور أقسام العروض والتواصل والصفحات. اختبارات حفظ هذه الأقسام لم تبدأ بعد: طلب المستخدم أولًا تصحيح القائمة، وإضافة لغات الداشبورد، وتحميل العروض الحالية تلقائيًا. تصحيح v6 منفذ محليًا وينتظر Commit وPush والاختبار المنشور.

## تصحيح v6 الحالي

- جميع الأقسام الثمانية في قائمة واحدة، دون شريط منفصل لأقسام المحتوى. حساب المستخدم ودوره خارج القائمة في كتلة مستقلة.
- اختيار Français / العربية / English في الدخول والداشبورد. تترجم الواجهة والنماذج والأزرار والحالات والرسائل المعروفة، ويتغير الاتجاه والتاريخ وفق اللغة. تحفظ اللغة في epstar-admin-language دون تغيير لغة الموقع العام أو النصوص التي أدخلها الفريق.
- عند فتح «عروضنا» تُجهّز العروض الثلاثة الحالية تلقائيًا في قاعدة البيانات مرة واحدة؛ لا يلزم زر استيراد يدوي. النسخ الحالية بنفس المعرف أو الرابط لا تُستبدل. علامة دائمة تمنع إعادة العرض بعد حذفه أو استبداله لاحقًا.
- تجهيز العروض عملية POST محمية للمسؤول، وليس كتابة داخل API القراءة العامة. لا تعديل على حسابات الدخول أو الأسرار أو النشر.

## هذه المرحلة

- «Nos offres»: إنشاء وتعديل وحذف العروض، صور JPG/PNG/WEBP حتى 8 ميغا، نصوص بثلاث لغات، ترتيب وإظهار/إخفاء. زر لاستيراد العروض التجريبية الثلاثة دون استبدال التعديلات.
- «Coordonnées»: الهاتف، واتساب، البريد، العنوان، أوقات العمل، فيسبوك وإنستغرام. ترتبط بالتذييل المشترك وروابط إرسال طلب عرض السعر. لا تغير حساب الدخول أو إعدادات Resend.
- «Pages & sous-pages»: صفحات رئيسية وفرعية بمستويين، محتوى نصي بثلاث لغات، رابط URL، مسودة/نشر وترتيب. تظهر المنشورة في التذييل، ورابطها /pages/identifiant. إخفاء الصفحة الأم يخفي صفحاتها الفرعية أيضًا.
- تحسين أولي للداشبورد: اختصارات إدارة المحتوى، حالة القسم النشط، نماذج واضحة متجاوبة، معاينة الصورة، رسائل حفظ وأخطاء، وتعطيل الأزرار أثناء العمليات.
- إدارة الأقسام الجديدة للمسؤول admin فقط، وليست للمحرر editor.

## النشر والاختبار بالترتيب

1. فك EPSTAR_dashboard_menu_languages_v6.zip وانسخ محتوياته إلى مجلد المستودع الحالي بعد v5، مع الحفاظ على المسارات. لا تنشئ مشروع Cloudflare جديدًا.
2. GitHub Desktop: Commit بعنوان `fix: unify dashboard navigation languages and offers bootstrap` ثم Push.
3. انتظر نجاح النشر في Cloudflare ثم افتح /admin وأعد تحميل الصفحة.
4. تأكد من وجود قائمة واحدة للأقسام، وحساب المستخدم منفصلًا. جرّب العربية والفرنسية والإنجليزية، ثم أعد التحميل للتأكد من حفظ اللغة، دون فقدان النصوص أثناء تبديلها.
5. افتح Nos offres وانتظر التحميل التلقائي للعروض الثلاثة دون زر استيراد. افتح /offers، ثم عدّل عنوان عرض وصورته وأخفه وتأكد من النتيجة بعد تحديث الموقع. لا تنفذ اختبار حذف إلا على عنصر تجريبي مخصص للحذف.
6. Coordonnées → غيّر العنوان/أوقات العمل أولًا للاختبار واحفظ. تأكد من ظهورها في التذييل. اختبر الهاتف وواتساب والبريد بالقيم الصحيحة.
7. Pages & sous-pages → أنشئ صفحة principale برابط `test-page`، ثم sous-page برابط `test-child` واربطها بالأولى. فعل Publier لكليهما. افتحهما من التذييل.
8. أخف الصفحة الأم وتأكد أن الاثنين اختفيا من الروابط والمحتوى العام. لا يسمح بحذف الأم قبل نقل/حذف الصفحات التابعة.
9. اختبر الفرنسية والعربية والإنجليزية والهاتف. بعد النجاح سجل النتيجة هنا وفي PROJECT_HANDOFF.md.

## ملفات الاستئناف في محادثة جديدة

أرفق هذا الملف وPROJECT_HANDOFF.md وPROJECT_ROADMAP.md، ومعها أحدث ZIP للمستودع من GitHub إذا تعذر الوصول إلى الملفات الحالية. وضح آخر Commit منشور ونتيجة الاختبار، ولا ترسل مفاتيح API أو أسرارًا.

## ما لم يكتمل بعد

- التحسين الشامل لتصميم الداشبورد والصلاحيات وإدارة أعضاء الفريق.
- محرر صفحات غني/بناء أقسام وسحب وإفلات؛ هذه النسخة تعرض النص بأمان دون HTML. الصفحات الجديدة لا تستبدل صفحات الموقع الأساسية.
- SEO للصفحات المخصصة، استجابة 404 فعلية للصفحة غير المنشورة، المعاينة الخاصة للمسودات، وسجل التعديلات.
- تنظيف الصور اليتيمة بعد استبدال صورة عرض؛ حذف العرض لا يمسح ملف R2 آليًا تفاديًا لحذف صورة مشتركة.
- تحرير محتوى بقية الصفحات الحالية ونظام أقسام غني للصفحات الجديدة. الرئيسية نُقلت الآن إلى محرر مستقل، والمنتجات والإنجازات فيها إلى البيانات المدارة في v7.
- المساعد الذكي، تحسين رفع الصور في الأقسام القديمة، وترجمة بيانات الأبعاد/التشطيبات المستوردة.

## تحقق تقني

نجح build و11 اختبارًا آليًا، تشمل السابق مع قاموس الترجمة وتغطية نصوص الواجهة والقائمة الموحدة، وتجهيز العروض مرة واحدة وعدم إعادة المحذوف. لا توجد migration جديدة: المحتوى محفوظ كسجلات JSON مستقلة في جدول site_settings الموجود، والصور في R2.

فحص TypeScript الشامل ما زال متأثرًا بأخطاء تعريفات Cloudflare وأنواع صفحات الطلب السابقة؛ build ليس فحص أنواع كاملًا. نجحت المعاينة المحلية بعد استعادة الاعتمادات: صفحة الدخول بالعربية والإنجليزية، اتجاه RTL، وحفظ اللغة بعد إعادة التحميل. لم ندخل إلى لوحة مسؤول في المعاينة، ولم نكتب في قاعدة بيانات الإنتاج. اختبار الداشبورد داخل جلسة المستخدم بعد النشر مطلوب.
## v9 — subpage menu usability (25 October 2026)

- User confirmed v8 ordering/footer PASS and home draft/private preview/publish/revert PASS.
- Subpage creation/placement works (screenshots); desktop hover was missing and arrow target too small.
- Header menus now open on fine-pointer mouse hover across parent link and arrow; pointer leave closes. Native details click/keyboard retained; Escape closes and returns focus. Toggle target at least 44×44px. Parent title remains a link. Touch uses tap.
- No DB/API/schema changes or production writes. Deliver v9 overlay atop v8; user commits/pushes via GitHub Desktop. Next: verify parent-to-child hover, mobile tap, AR/FR/EN and keyboard. Remaining built-in page content editors pending.

## v10 — arrowless navigation and dark-mode fixes (25 October 2026)

- User screenshots confirmed hover opens; requested removal of arrow, readable dark dropdown and managed-page header, underline below child text, closer dropdown.
- Replaced details/arrow with controlled arrowless parent link and submenu. Mouse hover opens; coarse/touch first click opens, second navigates parent. ArrowDown opens/focuses first child, Tab follows links, Escape closes/focuses parent; blur outside closes. aria-expanded/controls and aria-current provided.
- Scoped header/dropdown dark palette to html[data-theme], independent of page wrapper; managed pages also now receive theme/RTL classes. Underline drawn under inline label, not old inherited anchor pseudo-element. Dropdown top overlaps parent bottom by 1px to avoid hover gap.
- No database or API changes. v10 overlays v9; user must Commit/Push and verify production AR/FR/EN, light/dark, desktop hover and mobile first/second tap. Full CMS remaining-page editors pending.

v11 final verification: npm run build and all 25 automated tests PASS after final label changes. Browser public FR/AR/light/dark and guest preview privacy verified; authenticated editor/upload workflow still pending user. Preview stopped. Overlay includes source/tests/continuity docs only, no credentials, local DB, media copies or build outputs.

v12 final verification: npm run build and all 30 automated tests PASS after final dark-contrast/language changes. Public browser checks passed as described above; authenticated admin lifecycle pending user deployment. Preview stopped. ZIP contains source/tests/docs only; no secrets, runtime DB, or build artifacts.

