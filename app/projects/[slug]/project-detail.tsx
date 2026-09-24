"use client";
import QuoteForm from "../../components/quote-form";
import { ProjectFooter, ProjectHeader, projectCopy, projectMedia, projectOrder, useProjectUi } from "../project-shell";
import type { ProjectSlug } from "../data";

export default function ProjectDetail({slug}:{slug:ProjectSlug}){
 const {lang,setLang,theme,setTheme,rtl}=useProjectUi(),t=projectCopy[lang],p=t.items[slug],m=projectMedia[slug];
 return <main className={`project-detail-page ${rtl?"rtl ":""}${theme==="dark"?"dark":""}`} dir={rtl?"rtl":"ltr"}>
  <ProjectHeader {...{lang,setLang,theme,setTheme}}/>
  <section className="case-hero"><div><a href="/projects">← {t.back}</a><small>{t.demo}</small><h1>{p.title}</h1><p>{p.summary}</p><span>{p.city}</span></div><div className="case-model"><img src={m.model} alt={p.title}/><b>0{projectOrder.indexOf(slug)+1}</b></div></section>
  <section className="case-story"><article><small>01</small><h2>{t.challenge}</h2><p>{p.challenge}</p></article><article><small>02</small><h2>{t.solution}</h2><p>{p.solution}</p></article></section>
  <section className="case-visual"><img src={m.image} alt={p.title} style={{objectPosition:m.position||"center"}}/><span>{t.demo}</span></section>
  <section className="case-scope"><div><small>EPSTAR / 03</small><h2>{t.scope}</h2></div><ul>{p.scope.map((x,i)=><li key={x}><b>0{i+1}</b><span>{x}</span></li>)}</ul></section>
  <section className="before-after"><div className="before-panel"><span>{t.before}</span><div className="plan-lines"/></div><div className="after-panel"><img src={m.image} alt={p.title}/><span>{t.after}</span></div></section>
  <section className="detail-quote"><div><small>EPSTAR ALGÉRIE</small><h2>{t.similar}</h2><p>{t.similarText}</p></div><QuoteForm lang={lang} defaultSector={m.sector}/></section>
  <ProjectFooter lang={lang}/>
 </main>
}
