"use client";
import {useSiteTheme,useSiteLanguage} from "../components/theme-provider";
import { useEffect, useState } from "react";
import { projectCopy, projectMedia, projectOrder, ProjectLang } from "./data";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";

type Theme="light"|"dark";
export function ProjectHeader({lang,setLang,theme,setTheme}:{lang:ProjectLang,setLang:(l:ProjectLang)=>void,theme:Theme,setTheme:(t:Theme)=>void}){
  return <SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>;
}
export function useProjectUi(){
  const [lang,setLang]=useSiteLanguage(),[theme,setTheme] = useSiteTheme();
  return {lang,setLang,theme,setTheme,rtl:lang==="ar"};
}
export function ProjectFooter({lang}:{lang:ProjectLang}){return <SiteFooter lang={lang}/>}
export {projectCopy,projectMedia,projectOrder};
