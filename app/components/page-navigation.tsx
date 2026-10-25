"use client";
import {useId,useState} from "react";
import {navigationPages,pageHref} from "../page-registry";
import type {ContentItem} from "../content-model";
import type {Lang} from "../catalogue/data";
import "./page-navigation.css";
export default function PageNavigation({pages,placement,lang,pathname="",onNavigate}:{pages:ContentItem[];placement:"header"|"footer";lang:Lang;pathname?:string;onNavigate?:()=>void}){
 const list=navigationPages(pages,placement),[openId,setOpenId]=useState<string|null>(null),prefix=useId();
 const link=(p:ContentItem,hasChildren=false)=>{
  const href=pageHref(p),active=!href.includes("#")&&(href==="/"?pathname==="/":pathname===href||pathname.startsWith(href+"/"));
  return <a href={href} className={active?"active":""} aria-current={active?"page":undefined}
   aria-expanded={hasChildren?openId===p.id:undefined} aria-controls={hasChildren?prefix+p.id:undefined}
   onClick={event=>{if(hasChildren&&window.matchMedia("(hover: none), (pointer: coarse)").matches&&openId!==p.id){event.preventDefault();setOpenId(p.id);return;}setOpenId(null);onNavigate?.();}}>
   {placement==="header"&&p.builtinId==="offers"&&<small className="nav-promo">{lang==="ar"?"جديد":lang==="fr"?"NOUVEAU":"NEW"}</small>}
   <span className="page-nav-label">{p.title[lang]||p.title.fr}</span>
  </a>;
 };
 return <>{list.filter(p=>!p.parentId).map(p=>{
  const children=list.filter(c=>c.parentId===p.id),expandable=placement==="header"&&children.length>0;
  return <div className={`page-nav-group page-nav-${placement}`} key={p.id}
   onPointerEnter={event=>{if(expandable&&event.pointerType==="mouse")setOpenId(p.id);}}
   onPointerLeave={event=>{if(event.pointerType==="mouse")setOpenId(null);}}
   onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setOpenId(null);}}
   onKeyDown={event=>{if(!expandable)return;if(event.key==="Escape"){setOpenId(null);event.currentTarget.querySelector("a")?.focus({preventScroll:true});event.stopPropagation();}if(event.key==="ArrowDown"){event.preventDefault();const group=event.currentTarget;setOpenId(p.id);requestAnimationFrame(()=>group.querySelector<HTMLAnchorElement>(".page-nav-children a")?.focus({preventScroll:true}));}}}>
   {link(p,expandable)}
   {children.length>0&&<div id={prefix+p.id} className="page-nav-children" hidden={expandable&&openId!==p.id}>{children.map(c=><span key={c.id}>{link(c)}</span>)}</div>}
  </div>;
 })}</>;
}
