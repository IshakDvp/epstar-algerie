"use client";
import { useState } from "react";
import { ProjectFooter, ProjectHeader, projectCopy, projectMedia, projectOrder, useProjectUi } from "./project-shell";

export default function ProjectsPage(){
  const {lang,setLang,theme,setTheme,rtl}=useProjectUi();const t=projectCopy[lang];const [filter,setFilter]=useState("all");
  const visible=projectOrder.filter(slug=>filter==="all"||projectMedia[slug].sector===filter);
  return <main className={`portfolio-page ${rtl?"rtl ":""}${theme==="dark"?"dark":""}`} dir={rtl?"rtl":"ltr"}>
    <ProjectHeader {...{lang,setLang,theme,setTheme}}/>
    <section className="portfolio-hero"><small>EPSTAR / {lang==="ar"?"مشاريعنا":lang==="fr"?"NOS PROJETS":"OUR PROJECTS"}</small><h1>{t.pageTitle}</h1><p>{t.pageText}</p></section>
    <section className="portfolio-wrap"><div className="portfolio-filters"><button className={filter==="all"?"active":""} onClick={()=>setFilter("all")}>{t.all}</button>{Object.entries(t.filters).map(([k,v])=><button key={k} className={filter===k?"active":""} onClick={()=>setFilter(k)}>{v}</button>)}</div><div className="portfolio-grid">{visible.map((slug,i)=>{const p=t.items[slug],m=projectMedia[slug];return <a className={`portfolio-card card-${i%3}`} href={`/projects/${slug}`} key={slug}><img src={m.image} alt={p.title} style={{objectPosition:m.position||"center"}}/><span className="demo-badge">{t.demo}</span><div><small>0{projectOrder.indexOf(slug)+1} / {t.filters[m.sector as keyof typeof t.filters]}</small><h2>{p.title}</h2><p>{p.summary}</p><b>{t.view}<i>↗</i></b></div></a>})}</div></section>
    <section className="portfolio-note"><span>✦</span><p>{lang==="ar"?"هذه المشاريع تصورات تجريبية مؤقتة، وسيتم استبدالها بأعمال EPSTAR الحقيقية.":lang==="fr"?"Ces projets sont des concepts temporaires et seront remplacés par les réalisations réelles d’EPSTAR.":"These projects are temporary concepts and will be replaced with real EPSTAR work."}</p></section>
    <ProjectFooter lang={lang}/>
  </main>
}
