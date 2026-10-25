"use client";
import {useSiteTheme} from "../../components/theme-provider";

import { useEffect, useState } from "react";
import {serviceKeys as order,serviceBase as base,type ServiceKey} from "../../service-content";
import {useServiceContent} from "../../components/use-service-content";
import QuoteForm from "../../components/quote-form";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";

type Lang = "fr" | "ar" | "en";
type Theme = "light" | "dark";


export default function ServiceDetail({slug}:{slug:string}){
  const key=slug as ServiceKey;
  const {services,preview,previewError}=useServiceContent(key);
  const [ready,setReady]=useState(false);
  const [lang,setLang]=useState<Lang>("fr");
  const [theme,setTheme] = useSiteTheme();
  useEffect(()=>{const savedLang=localStorage.getItem("epstar-language");if(savedLang==="fr"||savedLang==="ar"||savedLang==="en")setLang(savedLang);setReady(true)},[]);
  useEffect(()=>{if(!ready)return;localStorage.setItem("epstar-language",lang);document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr"},[lang,ready]);
  const content=services[key],t=content.copy[lang],item=t,rtl=lang==="ar";
  return <main className={`service-page ${rtl?"rtl ":""}${theme==="dark"?"dark":""}`} dir={rtl?"rtl":"ltr"}>
    <SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>
    {(preview||previewError)&&<p className="about-preview-notice" role="status">{previewError?({fr:"Aperçu privé indisponible. Connectez-vous au tableau de bord.",ar:"المعاينة الخاصة غير متاحة. سجّل الدخول إلى الداشبورد.",en:"Private preview unavailable. Sign in to the dashboard."})[lang]:({fr:"Aperçu privé du brouillon — non publié.",ar:"معاينة خاصة للمسودة — غير منشورة.",en:"Private draft preview — not published."})[lang]}</p>}
    <section className="detail-hero"><div className="detail-copy"><a className="back-link" href="/#services">← {t.back}</a><small>{t.eyebrow}</small><h1>{item.headline}</h1><p>{item.text}</p><a className="primary-btn" href="#devis">{t.contact}</a></div><div className="detail-model"><span/><img src={content.images.model} alt={item.title}/><b>{base[key].icon}</b></div></section>
    <section className="detail-includes"><div><small>EPSTAR / {String(order.indexOf(key as typeof order[number])+1).padStart(2,"0")}</small><h2>{t.includes}</h2><p>{t.includesText}</p></div><ul>{item.list.map((x,i)=><li key={x}><b>0{i+1}</b><span>{x}</span></li>)}</ul></section>
    <section className="detail-process"><div className="center-title"><small>{t.process}</small><h2>{t.processTitle}</h2><p>{t.intro}</p></div><div className="detail-steps">{t.steps.map((s,i)=><article key={s[0]}><b>0{i+1}</b><h3>{s[0]}</h3><p>{s[1]}</p></article>)}</div></section>
    <section className="detail-gallery"><div className="detail-photo"><img src={content.images.photo} alt={item.title}/></div><div><small>{t.gallery}</small><h2>{t.galleryTitle}</h2><p>{item.text}</p><div className="material-chips"><span>3D</span><span>{t.materialLabel}</span><span>EPSTAR</span></div></div></section>
    <section id="devis" className="detail-quote"><div><small>EPSTAR ALGÉRIE</small><h2>{t.cta}</h2><p>{t.ctaText}</p></div><QuoteForm key={slug} lang={lang} defaultSector={slug}/></section>
    <section className="other-services"><small>{t.other}</small><div>{order.filter(x=>x!==key).map(x=><a key={x} href={`/services/${x}`}><span>{base[x].icon}</span><b>{services[x].copy[lang].title}</b><i>↗</i></a>)}</div></section>
    <SiteFooter lang={lang}/>
  </main>
}
