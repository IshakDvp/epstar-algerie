"use client";

import {useEffect,useMemo,useState} from "react";
import {useQuoteCart} from "../components/use-quote-cart";
import {catalog,groups,type Lang,type Product} from "./data";

const words={
  fr:{eyebrow:"CATALOGUE EPSTAR",title:"Des solutions à adapter\nà votre espace.",text:"Une sélection de références pour imaginer votre projet. Chaque pièce est une base de travail: dimensions, matières et finitions sont adaptées à votre besoin.",all:"Tout voir",filter:"Filtrer par univers",details:"Voir la fiche",add:"Ajouter au devis",added:"Ajouté au devis",cart:"Demande de devis",back:"Retour à l’accueil",demo:"RÉFÉRENCE DE DÉMONSTRATION",steps:["1. Choisissez une référence","2. Ajoutez-la à votre demande","3. Envoyez votre demande"]},
  ar:{eyebrow:"كتالوج EPSTAR",title:"حلول تتكيف\nمع مساحتك.",text:"مجموعة نماذج تساعد على تصور مشروعك. كل قطعة هي نقطة انطلاق، ونخصص المقاسات والخامات والتشطيبات بما يناسب احتياجك.",all:"عرض الكل",filter:"فلترة حسب المجال",details:"عرض التفاصيل",add:"أضف إلى طلب السعر",added:"تمت الإضافة",cart:"طلب عرض سعر",back:"العودة للرئيسية",demo:"نموذج تجريبي",steps:["1. اختر المنتج أو التجهيز","2. أضفه إلى طلبك","3. أرسل طلب عرض السعر"]},
  en:{eyebrow:"EPSTAR CATALOGUE",title:"Solutions tailored\nto your space.",text:"A selection of references to help define your project. Each piece is a starting point; dimensions, materials and finishes are tailored to your needs.",all:"View all",filter:"Filter by sector",details:"View details",add:"Add to quote",added:"Added to quote",cart:"Quote request",back:"Back to home",demo:"DEMO REFERENCE",steps:["1. Choose a reference","2. Add it to your request","3. Send your request"]}
};

export default function CatalogueShell(){
  const [lang,setLang]=useState<Lang>("fr"),[theme,setTheme]=useState<"light"|"dark">("light"),[group,setGroup]=useState<"all"|Product["group"]>("all");
  const {cart,setCart}=useQuoteCart();
  useEffect(()=>{const saved=localStorage.getItem("epstar-language");if(saved==="ar"||saved==="fr"||saved==="en")setLang(saved)},[]);
  useEffect(()=>{const s=localStorage.getItem("epstar-theme") as "light"|"dark"|null;const p=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";setTheme(s||p);},[]);
  useEffect(()=>{document.documentElement.lang=lang;localStorage.setItem("epstar-language",lang);document.documentElement.dir=lang==="ar"?"rtl":"ltr";document.documentElement.dataset.theme=theme},[lang,theme]);
  const t=words[lang],rtl=lang==="ar",list=useMemo(()=>group==="all"?catalog:catalog.filter(p=>p.group===group),[group]);
  const toggle=(id:string)=>setCart(c=>c.includes(id)?c.filter(x=>x!==id):[...c,id]);
  return <main className={`catalogue-page ${theme==="dark"?"dark":""} ${rtl?"rtl":""}`} dir={rtl?"rtl":"ltr"}>
    <header className="catalogue-nav"><a href="/"><img src="/epstar-logo.png" alt="EPSTAR"/></a><div><a href="/">{t.back}</a><a className="catalogue-count" href="/quote">{t.cart} ({cart.length})</a><button onClick={()=>setTheme(x=>x==="dark"?"light":"dark")}>{theme==="dark"?"☀":"☾"}</button><div className="catalogue-lang">{(["ar","fr","en"] as Lang[]).map(x=><button className={x===lang?"active":""} key={x} onClick={()=>setLang(x)}>{x}</button>)}</div></div></header>
    <section className="catalogue-hero"><div><small>{t.eyebrow}</small><h1>{t.title.split("\n").map((x,i)=><span key={x}>{x}{i===0&&<br/>}</span>)}</h1></div><p>{t.text}</p></section>
    <ol className="journey-flow catalogue-flow" aria-label={lang==="ar"?"خطوات الطلب":"Request steps"}>{t.steps.map((step,i)=><li key={step} className={i===0?"active":""}>{step}</li>)}</ol>
    <section className="catalogue-main"><div className="filter-bar"><small>{t.filter}</small><div><button className={group==="all"?"active":""} onClick={()=>setGroup("all")}>{t.all}</button>{(Object.keys(groups) as Product["group"][]).map(g=><button key={g} className={group===g?"active":""} onClick={()=>setGroup(g)}>{groups[g][lang]}</button>)}</div></div><div className="catalogue-full-grid">{list.map((p,i)=>{const added=cart.includes(p.id);return <article key={p.id} className="full-product"><a href={`/catalogue/${p.slug}`} className="full-image"><span>0{i+1}</span><img src={p.image} alt={p.name[lang]}/><small>{t.demo}</small></a><div><small>{p.category[lang]} · {p.id.toUpperCase()}</small><h2>{p.name[lang]}</h2><p>{p.detail[lang]}</p><div className="product-actions"><a href={`/catalogue/${p.slug}`}>{t.details} <span>↗</span></a><button className={added?"added":""} onClick={()=>toggle(p.id)}>{added?t.added:t.add}<span>{added?"✓":"+"}</span></button></div></div></article>})}</div></section>
  </main>
}
