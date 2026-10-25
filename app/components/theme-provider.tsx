"use client";
import {createContext,useContext,useLayoutEffect,useState,useCallback} from "react";
export type Theme="light"|"dark";
const ThemeContext=createContext<{theme:Theme;setTheme:(theme:Theme)=>void}>({theme:"light",setTheme:()=>{}});
function persist(theme:Theme){
 document.documentElement.dataset.theme=theme;
 document.documentElement.style.colorScheme=theme;
 document.cookie=`epstar-theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
 try{localStorage.setItem("epstar-theme",theme);}catch{}
}
export default function ThemeProvider({initialTheme,children}:{initialTheme:Theme;children:React.ReactNode}){
 const [theme,update]=useState<Theme>(initialTheme);
 const setTheme=useCallback((next:Theme)=>{persist(next);update(next);},[]);
 useLayoutEffect(()=>{
  const boot=document.documentElement.dataset.theme;
  if(boot==="dark"||boot==="light")setTheme(boot);
  document.documentElement.removeAttribute("data-theme-pending");
 },[setTheme]);
 return <ThemeContext.Provider value={{theme,setTheme}}>{children}</ThemeContext.Provider>;
}
export function useSiteTheme():[Theme,(theme:Theme)=>void]{const {theme,setTheme}=useContext(ThemeContext);return [theme,setTheme];}
