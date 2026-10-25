"use client";
import {useSiteTheme,useSiteLanguage} from "./components/theme-provider";

import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import QuoteForm from "./components/quote-form";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import type {Lang} from "./catalogue/data";
import {useHomeContent} from "./components/use-home-content";
import HomeBlocks from "./components/home-blocks";

type Theme = "light" | "dark";
type ClientLogo = {id:string;name:string;website:string|null;url:string};





const slugs=["pharmacies","bureaux","commerces","chambres"];


export default function Home(){
  const [lang,setLang]=useSiteLanguage();
  const [theme,setTheme] = useSiteTheme();
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);
  const [clientLogos,setClientLogos]=useState<ClientLogo[]>([]);
  
  const {home,preview,previewError}=useHomeContent();
  const capabilities=home.capabilities[lang],showcaseTitle=home.showcaseTitle[lang],showcaseText=home.showcaseText[lang],selectedLabel=home.selectedLabel[lang],start=home.start[lang],productHighlights=home.productHighlights[lang],trust=home.trust[lang];
  const t=home.copy[lang]; const rtl=lang==="ar";
  const sectors=useMemo(()=>t.sectors.map((s,i)=>({title:s[0],short:s[1],heading:s[2],text:s[3],image:home.images[i],model:home.models[i],icon:home.icons[i]})),[t,home]);
  useEffect(()=>{fetch("/api/client-logos").then(r=>r.ok?r.json():null).then(data=>setClientLogos(data?.logos||[])).catch(()=>{})},[]);
  useEffect(()=>{if(paused)return;const timer=setInterval(()=>setActive(v=>(v+1)%4),6500);return()=>clearInterval(timer)},[paused,active]);
  const current=sectors[active];
  
  
  
  
  const br=(x:string)=>x.split("\n").map((v,i)=><span key={i}>{v}{i<x.split("\n").length-1&&<br/>}</span>);
  
  const [products,setProducts]=useState<Array<{id:string;slug:string;reference:string;name:Record<Lang,string>;image:string;isFeatured:boolean}>>([]);
  const [projects,setProjects]=useState<Array<{id:string;slug:string;titleFr:string;titleAr:string;titleEn:string;summaryFr:string;summaryAr:string;summaryEn:string;imageUrl:string}>>([]);
  useEffect(()=>{fetch("/api/catalogue").then(r=>r.ok?r.json():null).then(d=>setProducts((d?.products||[]).map((p:any)=>({...p,name:{fr:p.nameFr,ar:p.nameAr||p.nameFr,en:p.nameEn||p.nameFr},image:p.imageUrl||""})))).catch(()=>{});fetch("/api/projects").then(r=>r.ok?r.json():null).then(d=>setProjects(d?.projects||[])).catch(()=>{});},[]);
  const featuredProduct=products.find(p=>p.isFeatured)||products[0];
  const bestProducts=products.filter(p=>p.id!==featuredProduct?.id).slice(0,3);
  useEffect(()=>{if(location.hash!=="#services")return;const frame=requestAnimationFrame(()=>document.getElementById("services")?.scrollIntoView({block:"start"}));return()=>cancelAnimationFrame(frame);},[home,clientLogos.length,featuredProduct?.id,lang]);
  
  
  const sections:Record<string,ReactNode>={
hero:(<section id="accueil" className="hero-shell premium-hero" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
      <div className="hero-index" aria-hidden="true">0{active+1}</div>
      <div className="hero-copy" key={`c-${lang}-${active}`}>
        <span className="mini-title">{t.overline}</span>
        <h1>{current.heading}</h1>
        <p>{current.text}</p>
        <div className="start-question"><small className="start-eyebrow">{start.eyebrow}</small><p>{start.ask}</p><em>{start.hint}</em><div className="hero-actions"><a href={home.links.catalogue} className="primary-btn"><small className="action-step">{start.productStep}</small><b>{start.product}</b><small>{start.productDesc}</small><span>↗</span></a><a href={home.links.fitout} className="secondary-btn"><small className="action-step">{start.projectStep}</small><b>{start.project}</b><small>{start.projectDesc}</small><span>→</span></a></div></div>
        <div className="hero-proof">{capabilities.map((item,i)=><span key={item}><b>0{i+1}</b>{item}</span>)}</div>
      </div>
      <div className="hero-media premium-media" key={`i-${active}`}>
        <span className="model-orbit" aria-hidden="true"/>
        <span className="model-grid" aria-hidden="true"/>
        <img src={current.model} alt={current.title}/>
        <div className="media-tag"><small>EPSTAR / 0{active+1}</small><b>{current.title}</b></div>
      </div>
      <div className="sector-tabs premium-tabs" role="tablist" aria-label={t.choose}>{sectors.map((s,i)=><button key={s.title} role="tab" aria-selected={active===i} className={active===i?"active":""} onClick={()=>setActive(i)}><i>0{i+1}</i><span className="tab-icon">{s.icon}</span><span><b>{s.title}</b><small>{s.short}</small></span><em>↗</em></button>)}</div>
    </section>),
trust:(<section className="trust-band" aria-label={lang==="ar"?"التزامات EPSTAR":lang==="fr"?"Les engagements EPSTAR":"EPSTAR commitments"}>{trust.map(([icon,text])=><div key={text}><b>{icon}</b><span>{text}</span></div>)}</section>),
clients:(clientLogos.length>0&&<section className="client-references section-pad"><div><small>{lang==="ar"?"ثقة مبنية على الإنجاز":home.clientTag[lang]}</small><h2>{lang==="ar"?"عملاؤنا وشركاؤنا":home.clientHeading[lang]}</h2><p>{lang==="ar"?"نفخر بثقة المؤسسات التي اختارت EPSTAR لتجهيز مساحاتها.":home.clientText[lang]}</p></div><div className="client-logo-grid">{clientLogos.map(logo=>{const content=<img src={logo.url} alt={logo.name}/>;return logo.website?<a key={logo.id} href={logo.website} target="_blank" rel="noreferrer" aria-label={logo.name}>{content}</a>:<div key={logo.id}>{content}</div>})}</div></section>),
products:(featuredProduct && (<section className="product-highlights section-pad">
      <div className="highlight-heading"><small>{productHighlights.eyebrow}</small><h2>{productHighlights.best}</h2><p>{productHighlights.bestText}</p></div>
      <div className="featured-product"><a href={`/catalogue/${featuredProduct.slug}`}><div className="featured-copy"><small>{productHighlights.featured} · {featuredProduct.id.toUpperCase()}</small><h3>{featuredProduct.name[lang]}</h3><p>{productHighlights.featuredText}</p><span>{productHighlights.details} ↗</span></div><div className="featured-visual"><img src={featuredProduct.image} alt={featuredProduct.name[lang]}/></div></a></div>
      <div className="best-product-grid">{bestProducts.map(product=>{return <a key={product.id} href={`/catalogue/${product.slug}`}><img src={product.image} alt={product.name[lang]}/><div><small>{productHighlights.best} · {product.id.toUpperCase()}</small><h3>{product.name[lang]}</h3><span>{productHighlights.details} ↗</span></div></a>})}</div>
    </section>)),
about:(<section id="apropos" className="about section-pad"><div className="about-visual"><img src={home.aboutImage} alt={sectors[2].title}/><span>{br(t.fromStudy)}</span></div><article><small>{t.aboutTag}</small><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><a href={home.links.about}>{t.aboutLink}<span>→</span></a></article><div className="about-points"><h3>{t.why}</h3>{t.points.map((p,i)=><div key={p}><b>0{i+1}</b><span>{p}</span></div>)}</div></section>),
services:(<section id="services" className="services premium-services section-pad">
      <div className="section-title"><div><small>{t.solutions}</small><h2>{showcaseTitle}</h2></div><p>{showcaseText}</p></div>
      <div className="sector-showcase">
        <div className="showcase-nav" role="tablist" aria-label={t.choose}>{sectors.map((s,i)=><button key={s.title} role="tab" aria-selected={active===i} className={active===i?"active":""} onClick={()=>setActive(i)}><span>0{i+1}</span><b>{s.title}</b><small>{s.short}</small><i>↗</i></button>)}</div>
        <div className="showcase-stage" key={`show-${active}`}><span className="stage-label">{selectedLabel} · 0{active+1}</span><img src={current.model} alt={current.title}/><div className="stage-copy"><small>{current.short}</small><h3>{current.heading}</h3><p>{current.text}</p><a href={home.links.services[active]}>{t.more}<span>↗</span></a></div></div>
      </div>
    </section>),
quote:(<section id="contact" className="quote-band"><div><small>{t.formTag}</small><h2>{br(t.formTitle)}</h2><p>{t.formText}</p></div><QuoteForm lang={lang}/></section>),
process:(<section className="process section-pad"><div className="center-title"><small>{t.method}</small><h2>{t.methodTitle}</h2><p>{t.methodText}</p></div><div className="steps">{t.steps.map((s,i)=><article key={s[0]} className={i===1?"featured":""}><b>0{i+1}</b><span className="step-icon">{["◎","✎","⚙","✓"][i]}</span><h3>{s[0]}</h3><p>{s[1]}</p></article>)}</div></section>),
projects:(<section id="projets" className="projects premium-projects section-pad"><div className="section-title"><div><small>{t.works}</small><h2>{br(t.worksTitle)}</h2></div><div className="projects-intro"><p>{t.worksText}</p><a href={home.links.projects}>{lang==="ar"?"عرض كل المشاريع":home.allProjectsLabel[lang]} ↗</a></div></div><div className="project-cards editorial-projects">{projects.slice(0,3).map((p,i)=><a href={`/projects/${p.slug}`} key={p.id}><article>{p.imageUrl&&<img src={p.imageUrl} alt={p.titleFr}/>}<span className="project-no">0{i+1}</span><div><small>{t.project}</small><h3>{lang==="ar"?(p.titleAr||p.titleFr):lang==="en"?(p.titleEn||p.titleFr):p.titleFr}</h3><p>{lang==="ar"?(p.summaryAr||p.summaryFr):lang==="en"?(p.summaryEn||p.summaryFr):p.summaryFr}</p><span>{t.view} ↗</span></div></article></a>)}</div></section>),
testimonial:(<section className="testimonial"><div className="testimonial-photo"><img src={home.testimonialImage} alt={sectors[1].title}/></div><blockquote><small>{t.review}</small><p>“{t.reviewText}”</p><footer><b>{t.client}</b><span>{t.clientType}</span></footer></blockquote></section>),
cta:(<section className="final-cta"><small>{t.ctaTag}</small><h2>{br(t.ctaTitle)}</h2><p>{t.ctaText}</p><a href={home.links.study}>{t.study}<span>↗</span></a></section>),
};
  return <main dir={rtl?"rtl":"ltr"} className={`${rtl?"rtl ":""}${theme==="dark"?"dark":""}`}>
<SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>
{(preview||previewError)&&<aside role="status" style={{padding:16,background:"#fff2cc",color:"#202020",position:"sticky",top:0,zIndex:100}}>{preview?(lang==="ar"?"معاينة مسودة — غير منشورة":lang==="fr"?"Aperçu du brouillon — non publié":"Draft preview — not published"):(lang==="ar"?"المعاينة تتطلب دخول المسؤول":lang==="fr"?"Connexion administrateur requise":"Administrator sign-in required")}</aside>}
{home.sectionOrder.map(key=>!home.hiddenSections.includes(key)&&<Fragment key={key}>{sections[key]}</Fragment>)}
<HomeBlocks blocks={home.blocks} lang={lang}/>
<SiteFooter lang={lang}/>
</main>
}
