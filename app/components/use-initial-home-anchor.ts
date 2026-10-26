"use client";
import {useEffect} from "react";
export function useInitialHomeAnchor(){useEffect(()=>{
 const root=document.documentElement;
 if(root.dataset.epstarAnchor!=="services")return;
 let cancelled=false,frame=0;
 const cancel=()=>{cancelled=true;};
 const keys=(event:KeyboardEvent)=>{if(["ArrowDown","ArrowUp","PageDown","PageUp","Home","End"," "].includes(event.key))cancel();};
 window.addEventListener("wheel",cancel,{passive:true});window.addEventListener("touchmove",cancel,{passive:true});window.addEventListener("keydown",keys);
 let loaded:()=>void=()=>{};
 const load=document.readyState==="complete"?Promise.resolve():new Promise<void>(resolve=>{loaded=resolve;window.addEventListener("load",loaded,{once:true});});
 Promise.all([load,document.fonts?.ready||Promise.resolve()]).then(()=>{
  if(cancelled)return;
  frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(()=>{
   if(cancelled)return;
   const target=document.getElementById("services");if(!target)return;
   delete root.dataset.epstarAnchor;
   const url=new URL(location.href);url.hash="services";history.replaceState(history.state,"",url);
   window.dispatchEvent(new Event("epstar-anchor"));
   target.scrollIntoView({block:"start",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  });});
 });
 return()=>{cancelled=true;cancelAnimationFrame(frame);window.removeEventListener("load",loaded);window.removeEventListener("wheel",cancel);window.removeEventListener("touchmove",cancel);window.removeEventListener("keydown",keys);};
},[]);}
