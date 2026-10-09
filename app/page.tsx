"use client";

import { useEffect, useMemo, useState } from "react";
import QuoteForm from "./components/quote-form";
import {useQuoteCart} from "./components/use-quote-cart";
import SiteHeader from "./components/site-header";
import { catalog, metaFor, type Lang } from "./catalogue/data";

type Theme = "light" | "dark";

const data = {
  fr:{
    nav:["Accueil","À propos","Services","Projets","Contact"], quote:"Demander un devis", overline:"CONCEPTION • FABRICATION • INSTALLATION",
    sectors:[
      ["Pharmacies","Agencement pharmacie","Des pharmacies pensées pour mieux servir.","Comptoirs, rayonnages, réserves et espaces conseil conçus sur mesure pour un parcours fluide et professionnel."],
      ["Bureaux","Espaces de travail","Des bureaux qui inspirent confiance.","Accueil, postes de travail, rangements et salles de réunion adaptés à votre organisation et à votre image."],
      ["Commerces","Espaces de vente","Des commerces qui mettent vos produits en valeur.","Vitrines, présentoirs et mobilier commercial pensés pour attirer, guider et faciliter la vente."],
      ["Chambres","Mobilier intérieur","Des chambres conçues autour de votre confort.","Dressings, lits, chevets et rangements fabriqués selon vos dimensions, vos besoins et votre style."]],
    projects:"Découvrir nos projets", talk:"Parler de votre projet", stats:[["10+","Années d’expérience"],["4","Univers spécialisés"],["100%","Fabrication sur mesure"]], choose:"Choisir un secteur",
    aboutTag:"À PROPOS D’EPSTAR", aboutTitle:"Un savoir-faire complet, réuni sous un même toit.", aboutText:"EPSTAR accompagne les professionnels et les particuliers dans la création d’espaces fonctionnels, élégants et durables. Notre équipe prend en charge chaque étape, de l’étude jusqu’à l’installation.", aboutLink:"Découvrir l’entreprise", fromStudy:"Depuis l’étude\njusqu’à la pose.", why:"Pourquoi nous choisir ?", points:["Un projet sur mesure","Une fabrication maîtrisée","Un suivi de bout en bout"],
    solutions:"NOS SOLUTIONS", universes:"Quatre univers.\nUne même exigence.", solutionsText:"Chaque projet commence par l’écoute et se termine par un espace prêt à vivre ou à travailler.", more:"En savoir plus",
    formTag:"UN PROJET EN TÊTE ?", formTitle:"Transformons votre idée\nen un espace concret.", formText:"Décrivez-nous votre projet et recevez une première orientation de notre équipe.", name:"Nom complet", phone:"Téléphone", type:"Type de projet", message:"Votre message", send:"Envoyer la demande",
    method:"NOTRE MÉTHODE", methodTitle:"Un processus clair, sans surprise.", methodText:"Vous validez chaque étape avant de passer à la suivante.", steps:[["Écoute & relevé","Nous étudions vos besoins et prenons les mesures précises."],["Conception","Nous définissons l’implantation, les matières et le rendu."],["Fabrication","Chaque élément est produit sur mesure avec un contrôle des finitions."],["Installation","Nos équipes livrent, posent et ajustent votre espace."]],
    works:"RÉALISATIONS", worksTitle:"Des espaces qui parlent\npar leurs détails.", worksText:"Une sélection de visuels temporaires. Les projets réels EPSTAR seront ajoutés ensuite.", project:"PROJET", view:"Voir le projet",
    review:"AVIS CLIENT • DÉMONSTRATION", reviewText:"Une équipe attentive, un projet bien suivi et un résultat conforme à ce que nous avions imaginé.", client:"Client EPSTAR", clientType:"Projet d’aménagement professionnel",
    ctaTag:"EPSTAR ALGÉRIE", ctaTitle:"Votre prochain espace\ncommence ici.", ctaText:"Parlons de vos besoins, de vos dimensions et de votre vision.", study:"Demander une étude", footerText:"Conception, fabrication et aménagement sur mesure.", navigation:"Navigation", temp:"Coordonnées temporaires", copy:"Version de démonstration."
  },
  ar:{
    nav:["الرئيسية","من نحن","خدماتنا","مشاريعنا","اتصل بنا"], quote:"اطلب عرض سعر", overline:"تصميم • تصنيع • تركيب",
    sectors:[
      ["الصيدليات","تجهيز الصيدليات","صيدليات مصممة لخدمة أفضل.","كاونترات ورفوف ومساحات تخزين واستشارة مصنّعة حسب الطلب لتوفير حركة عمل احترافية وسلسة."],
      ["المكاتب","مساحات العمل","مكاتب تعكس الثقة والاحتراف.","استقبال ومحطات عمل وخزائن وقاعات اجتماعات مصممة بما يناسب تنظيمك وهوية مؤسستك."],
      ["المحلات","مساحات البيع","محلات تبرز منتجاتك بصورة أفضل.","واجهات ووحدات عرض وأثاث تجاري مصمم لجذب العميل وتسهيل الحركة والبيع."],
      ["غرف النوم","الأثاث الداخلي","غرف نوم مصممة حول راحتك.","خزائن ودواليب وأسرّة وطاولات جانبية مصنّعة حسب المقاسات والاحتياجات والأسلوب المطلوب."]],
    projects:"استكشف مشاريعنا", talk:"تحدث معنا عن مشروعك", stats:[["+10","سنوات من الخبرة"],["4","مجالات متخصصة"],["100%","تصنيع حسب الطلب"]], choose:"اختر المجال",
    aboutTag:"من نحن", aboutTitle:"خبرة متكاملة تحت سقف واحد.", aboutText:"ترافق EPSTAR المحترفين والأفراد في إنشاء مساحات عملية وأنيقة ودائمة. يتولى فريقنا جميع مراحل المشروع من الدراسة والتصميم إلى التصنيع والتركيب.", aboutLink:"اكتشف الشركة", fromStudy:"من الدراسة\nإلى التركيب.", why:"لماذا تختار EPSTAR؟", points:["حلول مصممة حسب الطلب","جودة تصنيع خاضعة للرقابة","متابعة كاملة للمشروع"],
    solutions:"حلولنا", universes:"أربعة مجالات.\nمعيار واحد للجودة.", solutionsText:"يبدأ كل مشروع بفهم احتياجاتك وينتهي بمساحة جاهزة للاستخدام والعمل.", more:"اعرف المزيد",
    formTag:"لديك مشروع؟", formTitle:"نحوّل فكرتك\nإلى مساحة حقيقية.", formText:"صف لنا مشروعك وسيتواصل معك فريقنا لتقديم التوجيه الأولي.", name:"الاسم الكامل", phone:"رقم الهاتف", type:"نوع المشروع", message:"تفاصيل المشروع", send:"إرسال الطلب",
    method:"طريقة عملنا", methodTitle:"خطوات واضحة من دون مفاجآت.", methodText:"تعتمد كل مرحلة بعد مراجعتها وقبل الانتقال إلى المرحلة التالية.", steps:[["الاستماع والقياس","ندرس احتياجاتك ونأخذ القياسات الدقيقة للموقع."],["التصميم","نحدد التوزيع والخامات والتصور النهائي."],["التصنيع","نصنّع كل قطعة حسب الطلب مع مراقبة التشطيبات."],["التركيب","نوصّل ونركّب ونضبط المساحة حتى التسليم."]],
    works:"مشاريعنا", worksTitle:"مساحات تتحدث\nمن خلال تفاصيلها.", worksText:"الصور الحالية تجريبية وسيتم استبدالها بمشاريع EPSTAR الحقيقية.", project:"مشروع", view:"عرض المشروع",
    review:"رأي عميل • تجريبي", reviewText:"فريق متعاون، متابعة منظمة، ونتيجة مطابقة لما تصورناه للمشروع.", client:"عميل EPSTAR", clientType:"مشروع تجهيز مساحة مهنية",
    ctaTag:"EPSTAR الجزائر", ctaTitle:"مساحتك القادمة\nتبدأ من هنا.", ctaText:"تحدث معنا عن احتياجاتك ومقاساتك ورؤيتك للمشروع.", study:"اطلب دراسة مشروعك", footerText:"تصميم وتصنيع وتجهيز المساحات حسب الطلب.", navigation:"روابط الموقع", temp:"بيانات تواصل مؤقتة", copy:"نسخة تجريبية."
  },
  en:{
    nav:["Home","About","Services","Projects","Contact"], quote:"Request a quote", overline:"DESIGN • MANUFACTURING • INSTALLATION",
    sectors:[
      ["Pharmacies","Pharmacy fit-out","Pharmacies designed to serve better.","Custom counters, shelving, storage and consultation areas built for a smooth and professional workflow."],
      ["Offices","Workspaces","Offices that inspire confidence.","Reception desks, workstations, storage and meeting rooms tailored to your organization and brand."],
      ["Retail","Sales spaces","Stores that showcase products better.","Displays, showcases and retail furniture designed to attract, guide and support every sale."],
      ["Bedrooms","Interior furniture","Bedrooms designed around your comfort.","Wardrobes, beds, nightstands and storage made to your dimensions, needs and style."]],
    projects:"Explore our projects", talk:"Discuss your project", stats:[["10+","Years of experience"],["4","Specialist sectors"],["100%","Custom manufacturing"]], choose:"Choose a sector",
    aboutTag:"ABOUT EPSTAR", aboutTitle:"Complete expertise under one roof.", aboutText:"EPSTAR helps professionals and individuals create functional, elegant and durable spaces. Our team manages every stage, from the initial study through manufacturing and installation.", aboutLink:"Discover the company", fromStudy:"From study\nto installation.", why:"Why choose us?", points:["A fully custom project","Controlled manufacturing quality","End-to-end project follow-up"],
    solutions:"OUR SOLUTIONS", universes:"Four sectors.\nOne standard.", solutionsText:"Every project starts by listening and ends with a space ready to live or work in.", more:"Learn more",
    formTag:"HAVE A PROJECT?", formTitle:"Let’s turn your idea\ninto a real space.", formText:"Tell us about your project and receive initial guidance from our team.", name:"Full name", phone:"Phone", type:"Project type", message:"Your message", send:"Send request",
    method:"OUR PROCESS", methodTitle:"A clear process, with no surprises.", methodText:"You approve every stage before we move to the next one.", steps:[["Brief & survey","We study your needs and take precise site measurements."],["Design","We define the layout, materials and final visualization."],["Manufacturing","Every item is custom-built with controlled finishing."],["Installation","Our team delivers, installs and adjusts your space."]],
    works:"PROJECTS", worksTitle:"Spaces that speak\nthrough their details.", worksText:"Current visuals are temporary and will be replaced with real EPSTAR projects.", project:"PROJECT", view:"View project",
    review:"CLIENT REVIEW • DEMO", reviewText:"An attentive team, a well-managed project and a result that matched what we had imagined.", client:"EPSTAR Client", clientType:"Professional fit-out project",
    ctaTag:"EPSTAR ALGERIA", ctaTitle:"Your next space\nstarts here.", ctaText:"Let’s discuss your needs, dimensions and project vision.", study:"Request a study", footerText:"Custom design, manufacturing and fit-out.", navigation:"Navigation", temp:"Temporary contact details", copy:"Demo version."
  }
};

const images=["/images/pharmacy.png","/images/office.png","/images/shop.png","/images/bedroom.png"];
const models=["/images/pharmacy-premium.png","/images/office-premium.png","/images/shop-premium.png","/images/bedroom-3d.png"];
const slugs=["pharmacies","bureaux","commerces","chambres"];
const icons=["✦","▦","◇","⌂"];

export default function Home(){
  const [lang,setLang]=useState<Lang>("fr");
  const [theme,setTheme]=useState<Theme>("light");
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);
  const {cart,setCart}=useQuoteCart();
  
  const t=data[lang]; const rtl=lang==="ar";
  const sectors=useMemo(()=>t.sectors.map((s,i)=>({title:s[0],short:s[1],heading:s[2],text:s[3],image:images[i],model:models[i],icon:icons[i]})),[t]);
  useEffect(()=>{const saved=localStorage.getItem("epstar-language");if(saved==="ar"||saved==="fr"||saved==="en")setLang(saved)},[]);
  useEffect(()=>{document.documentElement.lang=lang;localStorage.setItem("epstar-language",lang);document.documentElement.dir=rtl?"rtl":"ltr"},[lang,rtl]);
  useEffect(()=>{const saved=localStorage.getItem("epstar-theme") as Theme|null;const preferred=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";setTheme(saved||preferred)},[]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;localStorage.setItem("epstar-theme",theme)},[theme]);
  useEffect(()=>{if(paused)return;const timer=setInterval(()=>setActive(v=>(v+1)%4),6500);return()=>clearInterval(timer)},[paused,active]);
  const current=sectors[active];
  const capabilities=lang==="ar"?["دراسة المساحة","تصميم ثلاثي الأبعاد","تصنيع حسب الطلب","تركيب وتسليم"]:lang==="fr"?["Étude de l’espace","Conception 3D","Fabrication sur mesure","Pose & livraison"]:["Space planning","3D design","Custom manufacturing","Installation"];
  const showcaseTitle=lang==="ar"?"اختر مجال مشروعك":lang==="fr"?"Choisissez votre univers":"Choose your project sector";
  const showcaseText=lang==="ar"?"كل مجال له احتياجاته. اختر النشاط لتشاهد تصورًا بصريًا وحلًا مصممًا حول طريقة استخدام المساحة.":lang==="fr"?"Chaque métier a ses exigences. Sélectionnez un univers pour découvrir une réponse visuelle pensée autour de son usage.":"Every sector has its own needs. Select one to see a visual direction designed around how the space works.";
  const selectedLabel=lang==="ar"?"الحل المختار":lang==="fr"?"Solution sélectionnée":"Selected solution";
  const br=(x:string)=>x.split("\n").map((v,i)=><span key={i}>{v}{i<x.split("\n").length-1&&<br/>}</span>);
  const shopCopy=lang==="ar"?{tag:"مختارات EPSTAR",title:"قطع مصممة للمساحة.\nوليست مأخوذة من كتالوج جاهز.",text:"استكشف نماذج من تجهيزاتنا. أضف ما يناسبك إلى طلب عرض السعر وسنخصص المقاسات والخامات والتشطيب لمشروعك.",all:"عرض الكتالوج",add:"أضف إلى الطلب",added:"تمت الإضافة",cart:"طلب عرض السعر",empty:"لم تضف أي منتج بعد",send:"إكمال طلب السعر",remove:"حذف",demo:"منتجات تجريبية"}:lang==="fr"?{tag:"SÉLECTION EPSTAR",title:"Des pièces pensées pour l’espace.\nJamais sorties d’un catalogue standard.",text:"Découvrez une sélection de nos solutions. Ajoutez vos références à la demande de devis; dimensions, matières et finitions seront adaptées à votre projet.",all:"Voir le catalogue",add:"Ajouter à la demande",added:"Ajouté",cart:"Demande de devis",empty:"Votre sélection est vide",send:"Finaliser la demande",remove:"Retirer",demo:"Produits de démonstration"}:{tag:"EPSTAR SELECTION",title:"Pieces designed for the space.\nNever pulled from a standard catalogue.",text:"Explore a selection of our solutions. Add references to your quote request; dimensions, materials and finishes will be tailored to your project.",all:"View catalogue",add:"Add to request",added:"Added",cart:"Quote request",empty:"Your selection is empty",send:"Complete request",remove:"Remove",demo:"Demo products"};
  const start=lang==="ar"?{eyebrow:"ابدأ من هنا",ask:"اختر المسار الذي يناسبك",hint:"لا تحتاج إلى تسجيل. اختر طريقًا واحدًا للانطلاق.",product:"أبحث عن منتجات وتجهيزات",productDesc:"تصفح نماذج الكتالوج، ثم أضف ما يناسب مشروعك إلى الطلب.",project:"أحتاج تجهيز مساحة كاملة",projectDesc:"اختر نوع المساحة واطلب دراسة لمشروع صيدلية أو مكتب أو محل.",productStep:"1. تصفح المنتجات",projectStep:"1. اختر نوع المساحة"}:lang==="fr"?{eyebrow:"COMMENCEZ ICI",ask:"Choisissez le parcours qui vous convient",hint:"Aucune inscription nécessaire. Choisissez simplement votre point de départ.",product:"Je cherche des produits",productDesc:"Parcourez les modèles du catalogue puis ajoutez ceux qui vous intéressent à la demande.",project:"Je souhaite aménager un espace",projectDesc:"Choisissez votre type d’espace et demandez une étude pour votre projet.",productStep:"1. Parcourir les produits",projectStep:"1. Choisir l’espace"}:{eyebrow:"START HERE",ask:"Choose the path that fits your need",hint:"No sign-up required. Simply choose where to begin.",product:"I’m looking for products",productDesc:"Browse catalogue examples, then add the pieces that suit your project.",project:"I need a complete fit-out",projectDesc:"Choose your space type and request an initial project study.",productStep:"1. Browse products",projectStep:"1. Choose your space"};
  const selectedProducts=catalog.filter(p=>cart.includes(p.id));
  const featuredProduct=catalog.find(p=>metaFor(p).featured)??catalog[0];
  const bestProducts=catalog.filter(p=>metaFor(p).bestseller).slice(0,3);
  const productHighlights=lang==="ar"?{eyebrow:"مختارات الكتالوج",featured:"منتج مختار",featuredText:"نموذج مميز يمكنك البدء منه وتخصيصه حسب المساحة والخامات والتشطيب.",best:"الأكثر مبيعًا",bestText:"نماذج يختارها العملاء كثيرًا كنقطة انطلاق لمشاريعهم.",offer:"عرض متوفر",details:"عرض المنتج"}:lang==="fr"?{eyebrow:"SÉLECTION CATALOGUE",featured:"Produit à découvrir",featuredText:"Une référence phare à adapter aux dimensions, matières et finitions de votre projet.",best:"Les plus demandés",bestText:"Des références souvent choisies comme point de départ pour les projets EPSTAR.",offer:"Offre en cours",details:"Voir le produit"}:{eyebrow:"CATALOGUE HIGHLIGHTS",featured:"Featured product",featuredText:"A signature reference to tailor to your space, materials and finish requirements.",best:"Most requested",bestText:"References frequently chosen as a starting point for EPSTAR projects.",offer:"Current offer",details:"View product"};
  const toggleCart=(id:string)=>setCart(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
  return <main dir={rtl?"rtl":"ltr"} className={`${rtl?"rtl ":""}${theme==="dark"?"dark":""}`}>
    <SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>
    <section id="accueil" className="hero-shell premium-hero" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
      <div className="hero-index" aria-hidden="true">0{active+1}</div>
      <div className="hero-copy" key={`c-${lang}-${active}`}>
        <span className="mini-title">{t.overline}</span>
        <h1>{current.heading}</h1>
        <p>{current.text}</p>
        <div className="start-question"><small className="start-eyebrow">{start.eyebrow}</small><p>{start.ask}</p><em>{start.hint}</em><div className="hero-actions"><a href="/catalogue" className="primary-btn"><small className="action-step">{start.productStep}</small><b>{start.product}</b><small>{start.productDesc}</small><span>↗</span></a><a href="/start-project" className="secondary-btn"><small className="action-step">{start.projectStep}</small><b>{start.project}</b><small>{start.projectDesc}</small><span>→</span></a></div></div>
        <div className="hero-proof">{capabilities.map((item,i)=><span key={item}><b>0{i+1}</b>{item}</span>)}</div>
      </div>
      <div className="hero-media premium-media" key={`i-${active}`}>
        <span className="model-orbit" aria-hidden="true"/>
        <span className="model-grid" aria-hidden="true"/>
        <img src={current.model} alt={current.title}/>
        <div className="media-tag"><small>EPSTAR / 0{active+1}</small><b>{current.title}</b></div>
      </div>
      <div className="sector-tabs premium-tabs" role="tablist" aria-label={t.choose}>{sectors.map((s,i)=><button key={s.title} role="tab" aria-selected={active===i} className={active===i?"active":""} onClick={()=>setActive(i)}><i>0{i+1}</i><span className="tab-icon">{s.icon}</span><span><b>{s.title}</b><small>{s.short}</small></span><em>↗</em></button>)}</div>
    </section>
    <section id="catalogue" className="catalogue-section section-pad">
      <div className="catalogue-head"><div><small>{shopCopy.tag}</small><h2>{br(shopCopy.title)}</h2></div><div><p>{shopCopy.text}</p><a href="/catalogue">{shopCopy.all} <span>↗</span></a></div></div>
      <div className="catalogue-grid">{catalog.slice(0,4).map((product,i)=>{const added=cart.includes(product.id);return <article className="catalogue-card" key={product.id}><a className="catalogue-image" href={`/catalogue/${product.slug}`}><span>0{i+1}</span><img src={product.image} alt={product.name[lang]}/><small>{shopCopy.demo}</small></a><div className="catalogue-info"><small>{product.category[lang]} · {product.id.toUpperCase()}</small><h3>{product.name[lang]}</h3><p>{product.detail[lang]}</p><button className={added?"added":""} type="button" onClick={()=>toggleCart(product.id)}>{added?shopCopy.added:shopCopy.add}<span>{added?"✓":"+"}</span></button></div></article>})}</div>
    </section>
    <section className="product-highlights section-pad">
      <div className="highlight-heading"><small>{productHighlights.eyebrow}</small><h2>{productHighlights.best}</h2><p>{productHighlights.bestText}</p></div>
      <div className="featured-product"><a href={`/catalogue/${featuredProduct.slug}`}><div className="featured-copy"><small>{productHighlights.featured} · {featuredProduct.id.toUpperCase()}</small><h3>{featuredProduct.name[lang]}</h3><p>{productHighlights.featuredText}</p>{metaFor(featuredProduct).promotion&&<b>{productHighlights.offer} — {metaFor(featuredProduct).promotion?.[lang]}</b>}<span>{productHighlights.details} ↗</span></div><div className="featured-visual"><img src={featuredProduct.image} alt={featuredProduct.name[lang]}/></div></a></div>
      <div className="best-product-grid">{bestProducts.map(product=>{const meta=metaFor(product);return <a key={product.id} href={`/catalogue/${product.slug}`}><img src={product.image} alt={product.name[lang]}/><div><small>{productHighlights.best} · {product.id.toUpperCase()}</small><h3>{product.name[lang]}</h3>{meta.promotion&&<b>{productHighlights.offer}</b>}<span>{productHighlights.details} ↗</span></div></a>})}</div>
    </section>
    <section id="apropos" className="about section-pad"><div className="about-visual"><img src="/images/shop.png" alt={sectors[2].title}/><span>{br(t.fromStudy)}</span></div><article><small>{t.aboutTag}</small><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><a href="/about">{t.aboutLink}<span>→</span></a></article><div className="about-points"><h3>{t.why}</h3>{t.points.map((p,i)=><div key={p}><b>0{i+1}</b><span>{p}</span></div>)}</div></section>
    <section id="services" className="services premium-services section-pad">
      <div className="section-title"><div><small>{t.solutions}</small><h2>{showcaseTitle}</h2></div><p>{showcaseText}</p></div>
      <div className="sector-showcase">
        <div className="showcase-nav" role="tablist" aria-label={t.choose}>{sectors.map((s,i)=><button key={s.title} role="tab" aria-selected={active===i} className={active===i?"active":""} onClick={()=>setActive(i)}><span>0{i+1}</span><b>{s.title}</b><small>{s.short}</small><i>↗</i></button>)}</div>
        <div className="showcase-stage" key={`show-${active}`}><span className="stage-label">{selectedLabel} · 0{active+1}</span><img src={current.model} alt={current.title}/><div className="stage-copy"><small>{current.short}</small><h3>{current.heading}</h3><p>{current.text}</p><a href={`/services/${slugs[active]}`}>{t.more}<span>↗</span></a></div></div>
      </div>
    </section>
    <section id="contact" className="quote-band"><div><small>{t.formTag}</small><h2>{br(t.formTitle)}</h2><p>{t.formText}</p></div><QuoteForm lang={lang}/></section>
    <section className="process section-pad"><div className="center-title"><small>{t.method}</small><h2>{t.methodTitle}</h2><p>{t.methodText}</p></div><div className="steps">{t.steps.map((s,i)=><article key={s[0]} className={i===1?"featured":""}><b>0{i+1}</b><span className="step-icon">{["◎","✎","⚙","✓"][i]}</span><h3>{s[0]}</h3><p>{s[1]}</p></article>)}</div></section>
    <section id="projets" className="projects premium-projects section-pad"><div className="section-title"><div><small>{t.works}</small><h2>{br(t.worksTitle)}</h2></div><div className="projects-intro"><p>{t.worksText}</p><a href="/projects">{lang==="ar"?"عرض كل المشاريع":lang==="fr"?"Voir tous les projets":"View all projects"} ↗</a></div></div><div className="project-cards editorial-projects">{sectors.slice(0,3).map((s,i)=><a href={`/projects/${["pharmacy-algiers","executive-office","premium-boutique"][i]}`} key={s.title}><article><img src={s.image} alt={s.title}/><span className="project-no">0{i+1}</span><div><small>{t.project} · {s.short}</small><h3>{s.title}</h3><p>{s.text}</p><span>{t.view} ↗</span></div></article></a>)}</div></section>
    <section className="testimonial"><div className="testimonial-photo"><img src="/images/office.png" alt={sectors[1].title}/></div><blockquote><small>{t.review}</small><p>“{t.reviewText}”</p><footer><b>{t.client}</b><span>{t.clientType}</span></footer></blockquote></section>
    <section className="final-cta"><small>{t.ctaTag}</small><h2>{br(t.ctaTitle)}</h2><p>{t.ctaText}</p><a href="#contact">{t.study}<span>↗</span></a></section>
    <footer className="footer"><div><img src="/epstar-logo.png" alt="EPSTAR"/><p>{t.footerText}</p></div><div><h4>{t.navigation}</h4>{t.nav.slice(0,4).map((n,i)=><a key={n} href={["#accueil","#apropos","#services","#projets"][i]}>{n}</a>)}</div><div><h4>{t.nav[4]}</h4><a href="https://wa.me/213551984778" target="_blank" rel="noreferrer">WhatsApp +213 551 984 778</a><small>{t.temp}</small></div><p className="copyright">© 2026 EPSTAR — {t.copy}</p></footer>

  </main>
}
