"use client";
import { useEffect, useState } from "react";
import { ProjectFooter, ProjectHeader, projectCopy, projectMedia, projectOrder, useProjectUi } from "./project-shell";

export default function ProjectsPage(){
  const {lang,setLang,theme,setTheme,rtl}=useProjectUi();const t=projectCopy[lang];const [filter,setFilter]=useState("all");const [managed,setManaged]=useState<Array<{id:string;slug:string;titleFr:string;titleAr:string;titleEn:string;summaryFr:string;summaryAr:string;summaryEn:string;location:string;categoryFr:string;categoryAr:string;categoryEn:string;imageUrl:string|null}>>([]);
  useEffect(()=>{fetch("/api/projects").then(r=>r.ok?r.json():null).then(data=>setManaged(data?.projects||[])).catch(()=>{})},[]);
  const visible=projectOrder.filter(slug=>filter==="all"||projectMedia[slug].sector===filter);
  return <main className={`portfolio-page ${rtl?"rtl ":""}${theme==="dark"?"dark":""}`} dir={rtl?"rtl":"ltr"}>
    <ProjectHeader {...{lang,setLang,theme,setTheme}}/>
    <section className="portfolio-hero"><small>EPSTAR / {lang==="ar"?"مشاريعنا":lang==="fr"?"NOS PROJETS":"OUR PROJECTS"}</small><h1>{t.pageTitle}</h1><p>{t.pageText}</p></section>
    <section className="portfolio-wrap"><div className="portfolio-filters"><button className={filter==="all"?"active":""} onClick={()=>setFilter("all")}>{t.all}</button>{Object.entries(t.filters).map(([k,v])=><button key={k} className={filter===k?"active":""} onClick={()=>setFilter(k)}>{v}</button>)}</div><div className="portfolio-grid">{visible.map((slug,i)=>{const p=t.items[slug],m=projectMedia[slug];return <a className={`portfolio-card card-${i%3}`} href={`/projects/${slug}`} key={slug}><img src={m.image} alt={p.title} style={{objectPosition:m.position||"center"}}/><span className="demo-badge">{t.demo}</span><div><small>0{projectOrder.indexOf(slug)+1} / {t.filters[m.sector as keyof typeof t.filters]}</small><h2>{p.title}</h2><p>{p.summary}</p><b>{t.view}<i>↗</i></b></div></a>})}{managed.map((p,i)=>{const title=lang==="ar"?p.titleAr:lang==="en"?p.titleEn:p.titleFr;const summary=lang==="ar"?p.summaryAr:lang==="en"?p.summaryEn:p.summaryFr;const category=lang==="ar"?p.categoryAr:lang==="en"?p.categoryEn:p.categoryFr;return <a className={`portfolio-card card-${i%3}`} href={`/projects/${p.slug}`} key={p.id}><>{p.imageUrl?<img src={p.imageUrl} alt={title}/>:null}</><span className="demo-badge">EPSTAR</span><div><small>{category||p.location||"EPSTAR"}</small><h2>{title}</h2><p>{summary}</p><b>{t.view}<i>↗</i></b></div></a>})}</div></section>
    <section className="portfolio-note"><span>✦</span><p>{lang==="ar"?"هذه المشاريع تصورات تجريبية مؤقتة، وسيتم استبدالها بأعمال EPSTAR الحقيقية.":lang==="fr"?"Ces projets sont des concepts temporaires et seront remplacés par les réalisations réelles d’EPSTAR.":"These projects are temporary concepts and will be replaced with real EPSTAR work."}</p></section>
    <ProjectFooter lang={lang}/>
  </main>
}
