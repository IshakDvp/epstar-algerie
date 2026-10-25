"use client";
import {useSiteTheme} from "../components/theme-provider";
import { useEffect, useState } from "react";
import { projectCopy, projectMedia, projectOrder, ProjectLang } from "./data";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";

type Theme="light"|"dark";
export function ProjectHeader({lang,setLang,theme,setTheme}:{lang:ProjectLang,setLang:(l:ProjectLang)=>void,theme:Theme,setTheme:(t:Theme)=>void}){
  return <SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>;
}
export function useProjectUi(){
  const [lang,setLang]=useState<ProjectLang>("fr"),[theme,setTheme] = useSiteTheme();
  useEffect(()=>{const savedLang=localStorage.getItem("epstar-language");if(savedLang==="ar"||savedLang==="fr"||savedLang==="en")setLang(savedLang);},[]);
  useEffect(()=>{localStorage.setItem("epstar-language",lang);document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr"},[lang]);
  return {lang,setLang,theme,setTheme,rtl:lang==="ar"};
}
export function ProjectFooter({lang}:{lang:ProjectLang}){return <SiteFooter lang={lang}/>}
export {projectCopy,projectMedia,projectOrder};
