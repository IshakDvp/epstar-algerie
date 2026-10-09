"use client";
import { useEffect, useState } from "react";
import { projectCopy, projectMedia, projectOrder, ProjectLang } from "./data";
import SiteHeader from "../components/site-header";

type Theme="light"|"dark";
export function ProjectHeader({lang,setLang,theme,setTheme}:{lang:ProjectLang,setLang:(l:ProjectLang)=>void,theme:Theme,setTheme:(t:Theme)=>void}){
  return <SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>;
}
export function useProjectUi(){
  const [lang,setLang]=useState<ProjectLang>("fr"),[theme,setTheme]=useState<Theme>("light");
  useEffect(()=>{const saved=localStorage.getItem("epstar-theme") as Theme|null;setTheme(saved||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))},[]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;localStorage.setItem("epstar-theme",theme)},[theme]);
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr"},[lang]);
  return {lang,setLang,theme,setTheme,rtl:lang==="ar"};
}
export function ProjectFooter({lang}:{lang:ProjectLang}){const text=lang==="ar"?"تصميم وتصنيع وتجهيز المساحات حسب الطلب.":lang==="fr"?"Conception, fabrication et aménagement sur mesure.":"Custom design, manufacturing and fit-out.";return <footer className="footer"><div><img src="/epstar-logo.png" alt="EPSTAR"/><p>{text}</p></div><div><h4>EPSTAR</h4><a href="/">Home</a><a href="/#services">Services</a></div><div><h4>Contact</h4><a href="https://wa.me/213551984778" target="_blank" rel="noreferrer">WhatsApp +213 551 984 778</a></div><p className="copyright">© 2026 EPSTAR</p></footer>}
export {projectCopy,projectMedia,projectOrder};
