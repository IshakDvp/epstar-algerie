"use client";
import {createContext,useContext,useLayoutEffect,useState,useCallback} from "react";
export type Theme="light"|"dark";
export type SiteLanguage="fr"|"ar"|"en";
const LanguageContext=createContext<{lang:SiteLanguage;setLang:(lang:SiteLanguage)=>void}>({lang:"fr",setLang:()=>{}});
const ThemeContext=createContext<{theme:Theme;setTheme:(theme:Theme)=>void}>({theme:"light",setTheme:()=>{}});
function persist(theme:Theme){
 document.documentElement.dataset.theme=theme;
 document.documentElement.style.colorScheme=theme;
 document.cookie=`epstar-theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
 try{localStorage.setItem("epstar-theme",theme);}catch{}
}
export default function ThemeProvider({initialTheme,initialLang="fr",children}:{initialTheme:Theme;initialLang?:SiteLanguage;children:React.ReactNode}){
 const [theme,update]=useState<Theme>(initialTheme);
 const [lang,updateLang]=useState<SiteLanguage>(initialLang);
 const setLang=useCallback((next:SiteLanguage)=>{
  document.documentElement.lang=next;document.documentElement.dir=next==="ar"?"rtl":"ltr";
  document.cookie=`epstar-language=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  try{localStorage.setItem("epstar-language",next);}catch{}
  updateLang(next);
 },[]);
 const setTheme=useCallback((next:Theme)=>{persist(next);update(next);},[]);
 useLayoutEffect(()=>{
  if(location.pathname.startsWith("/admin"))return;
  const boot=document.documentElement.dataset.theme;
  if(boot==="dark"||boot==="light")setTheme(boot);
  const bootLang=document.documentElement.lang;
  if(bootLang==="ar"||bootLang==="fr"||bootLang==="en")setLang(bootLang);
  document.documentElement.removeAttribute("data-theme-pending");
 },[setTheme,setLang]);
 return <ThemeContext.Provider value={{theme,setTheme}}><LanguageContext.Provider value={{lang,setLang}}>{children}</LanguageContext.Provider></ThemeContext.Provider>;
}
export function useSiteTheme():[Theme,(theme:Theme)=>void]{const {theme,setTheme}=useContext(ThemeContext);return [theme,setTheme];}
export function useSiteLanguage():[SiteLanguage,(lang:SiteLanguage)=>void]{const {lang,setLang}=useContext(LanguageContext);return [lang,setLang];}
