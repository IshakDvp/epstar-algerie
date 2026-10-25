"use client";

import {useAboutContent} from "../components/use-about-content";
import QuoteForm from "../components/quote-form";
import { ProjectFooter, ProjectHeader, useProjectUi } from "../projects/project-shell";



export default function AboutPage(){
 const {lang,setLang,theme,setTheme,rtl}=useProjectUi(),{about,preview,previewError}=useAboutContent(),t=about.copy[lang];
 return <main className={`about-page ${rtl?"rtl ":""}${theme==="dark"?"dark":""}`} dir={rtl?"rtl":"ltr"}>
  <ProjectHeader {...{lang,setLang,theme,setTheme}}/>
  {(preview||previewError)&&<p className="about-preview-notice" role="status">{previewError?({fr:"Aperçu privé indisponible. Connectez-vous au tableau de bord.",ar:"المعاينة الخاصة غير متاحة. سجّل الدخول إلى الداشبورد.",en:"Private preview unavailable. Sign in to the dashboard."})[lang]:({fr:"Aperçu privé du brouillon — non publié.",ar:"معاينة خاصة للمسودة — غير منشورة.",en:"Private draft preview — not published."})[lang]}</p>}
  <section className="about-hero-page"><div className="about-hero-copy"><small>{t.tag}</small><h1>{t.title}</h1><p>{t.lead}</p><a className="primary-btn" href={about.links.projects}>{t.discover}</a></div><div className="about-hero-art"><span className="about-orbit"/><img className="art-main" src={about.images.hero} alt="EPSTAR"/><img className="art-mini art-office" src={about.images.office} alt=""/><img className="art-mini art-shop" src={about.images.shop} alt=""/></div></section>
  <section className="about-manifesto"><div><small>EPSTAR / 01</small><h2>{t.story}</h2></div><div><p>{t.intro}</p><p>{t.storyText}</p></div></section>
  <section className="about-stats">{t.stats.map(x=><article key={x[1]}><b>{x[0]}</b><span>{x[1]}</span></article>)}</section>
  <section className="about-values"><div className="about-section-title"><small>{t.valuesTag}</small><h2>{t.valuesTitle}</h2></div><div className="value-grid">{t.values.map(v=><article key={v[0]}><b>{v[0]}</b><span>✦</span><h3>{v[1]}</h3><p>{v[2]}</p></article>)}</div></section>
  <section className="about-craft"><div className="craft-photo"><img src={about.images.craft} alt="EPSTAR workspace"/><span>{t.methodTag}</span></div><div className="craft-copy"><small>{t.methodTag}</small><h2>{t.methodTitle}</h2>{t.methods.map((m,i)=><article key={m[0]}><b>0{i+1}</b><div><h3>{m[0]}</h3><p>{m[1]}</p></div></article>)}</div></section>
  <section className="about-team"><div className="team-model"><img src={about.images.team} alt="EPSTAR custom interior"/></div><div><small>{t.teamTag}</small><h2>{t.teamTitle}</h2><p>{t.teamText}</p><span className="about-note">{t.note}</span></div></section>
  <section className="detail-quote"><div><small>EPSTAR ALGÉRIE</small><h2>{t.cta}</h2><p>{t.ctaText}</p></div><QuoteForm lang={lang}/></section>
  <ProjectFooter lang={lang}/>
 </main>
}
