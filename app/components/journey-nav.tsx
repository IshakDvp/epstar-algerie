"use client";
import {useEffect,useState} from "react";
import {usePathname} from "next/navigation";
import {useQuoteCart} from "./use-quote-cart";
import type {Lang} from "../catalogue/data";
export default function JourneyNav(){
 const {cart}=useQuoteCart();const pathname=usePathname();const [lang,setLang]=useState<Lang>("fr");const [notice,setNotice]=useState(false);
 useEffect(()=>{const sync=()=>setLang(document.documentElement.lang==="ar"?"ar":document.documentElement.lang==="en"?"en":"fr");sync();const observer=new MutationObserver(sync);observer.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});let previous=0;try{previous=JSON.parse(localStorage.getItem("epstar-quote-cart")||"[]").length}catch{}const changed=()=>{let count=0;try{count=JSON.parse(localStorage.getItem("epstar-quote-cart")||"[]").length}catch{}if(count>previous)setNotice(true);previous=count};window.addEventListener("epstar-cart",changed);return()=>{observer.disconnect();window.removeEventListener("epstar-cart",changed)}},[]);
 const t=lang==="ar"?["الرئيسية","المنتجات","تجهيز مساحة","مشاريعنا","طلبي","تمت إضافة المنتج إلى طلبك","متابعة التصفح","عرض طلبي"]:lang==="fr"?["Accueil","Produits","Aménager un espace","Projets","Ma demande","Produit ajouté à votre demande","Continuer la visite","Voir ma demande"]:["Home","Products","Fit out a space","Projects","My request","Product added to your request","Continue browsing","View my request"];
 return <>{notice&&<div className="journey-notice" dir={lang==="ar"?"rtl":"ltr"} role="status"><b>{t[5]}</b><button onClick={()=>setNotice(false)}>{t[6]}</button><a href="/quote">{t[7]}</a></div>}</>
}
