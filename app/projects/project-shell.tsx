"use client";
import { useEffect, useState } from "react";
import { projectCopy, projectMedia, projectOrder, ProjectLang } from "./data";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";

type Theme="light"|"dark";
export function ProjectHeader({lang,setLang,theme,setTheme}:{lang:ProjectLang,setLang:(l:ProjectLang)=>void,theme:Theme,setTheme:(t:Theme)=>void}){
  return <SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>;
}
export function useProjectUi(){
  const [lang,setLang]=useState<ProjectLang>("fr"),[theme,setTheme]=useState<Theme>("light");
  useEffect(()=>{const savedLang=localStorage.getItem("epstar-language");if(savedLang==="ar"||savedLang==="fr"||savedLang==="en")setLang(savedLang);const saved=localStorage.getItem("epstar-theme") as Theme|null;setTheme(saved||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))},[]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;localStorage.setItem("epstar-theme",theme)},[theme]);
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr"},[lang]);
  return {lang,setLang,theme,setTheme,rtl:lang==="ar"};
}
export function ProjectFooter({lang}:{lang:ProjectLang}){return <SiteFooter lang={lang}/>}
export {projectCopy,projectMedia,projectOrder};
