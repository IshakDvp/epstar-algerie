"use client";

import {useEffect,useMemo,useState} from "react";
import {useQuoteCart} from "../components/use-quote-cart";
import {catalog,groups,metaFor,subcategories,type Lang,type Product} from "./data";
import SiteHeader from "../components/site-header";

const words={
  fr:{eyebrow:"CATALOGUE EPSTAR",title:"Des solutions à adapter\nà votre espace.",text:"Choisissez un univers puis une sous-catégorie. Chaque référence est une base de travail à adapter à votre projet.",all:"Tout voir",filter:"Choisir un univers",subFilter:"Choisir une sous-catégorie",details:"Voir la fiche",add:"Ajouter au devis",added:"Ajouté au devis",cart:"Demande de devis",back:"Retour à l’accueil",demo:"RÉFÉRENCE DE DÉMONSTRATION",best:"Meilleure vente",offer:"Offre en cours",steps:["1. Choisissez une référence","2. Ajoutez-la à votre demande","3. Envoyez votre demande"]},
  ar:{eyebrow:"كتالوج EPSTAR",title:"حلول تتكيف\nمع مساحتك.",text:"اختر المجال ثم الفئة الفرعية. كل نموذج هو نقطة انطلاق نخصصها بما يناسب مشروعك.",all:"عرض الكل",filter:"اختر المجال",subFilter:"اختر الفئة الفرعية",details:"عرض التفاصيل",add:"أضف إلى طلب السعر",added:"تمت الإضافة",cart:"طلب عرض سعر",back:"العودة للرئيسية",demo:"نموذج تجريبي",best:"من الأكثر مبيعًا",offer:"عرض متوفر",steps:["1. اختر المنتج أو التجهيز","2. أضفه إلى طلبك","3. أرسل طلب عرض السعر"]},
  en:{eyebrow:"EPSTAR CATALOGUE",title:"Solutions tailored\nto your space.",text:"Choose a sector, then a subcategory. Each reference is a starting point tailored to your project.",all:"View all",filter:"Choose a sector",subFilter:"Choose a subcategory",details:"View details",add:"Add to quote",added:"Added to quote",cart:"Quote request",back:"Back to home",demo:"DEMO REFERENCE",best:"Best seller",offer:"Current offer",steps:["1. Choose a reference","2. Add it to your request","3. Send your request"]}
};

export default function CatalogueShell(){
  const [lang,setLang]=useState<Lang>("fr"),[theme,setTheme]=useState<"light"|"dark">("light"),[group,setGroup]=useState<"all"|Product["group"]>("all"),[subcategory,setSubcategory]=useState<string>("all");
  const {cart,setCart}=useQuoteCart();
  useEffect(()=>{const saved=localStorage.getItem("epstar-language");if(saved==="ar"||saved==="fr"||saved==="en")setLang(saved)},[]);
  useEffect(()=>{const s=localStorage.getItem("epstar-theme") as "light"|"dark"|null;const p=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";setTheme(s||p);},[]);
  useEffect(()=>{document.documentElement.lang=lang;localStorage.setItem("epstar-language",lang);document.documentElement.dir=lang==="ar"?"rtl":"ltr";document.documentElement.dataset.theme=theme},[lang,theme]);
  const t=words[lang],rtl=lang==="ar";
  const availableSubcategories=group==="all"?[]:Object.entries(subcategories).filter(([,sub])=>sub.group===group);
  const list=useMemo(()=>catalog.filter(p=>(group==="all"||p.group===group)&&(subcategory==="all"||metaFor(p).subcategory===subcategory)),[group,subcategory]);
  const toggle=(id:string)=>setCart(c=>c.includes(id)?c.filter(x=>x!==id):[...c,id]);
  return <main className={`catalogue-page ${theme==="dark"?"dark":""} ${rtl?"rtl":""}`} dir={rtl?"rtl":"ltr"}>
    <SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>
    <section className="catalogue-hero"><div><small>{t.eyebrow}</small><h1>{t.title.split("\n").map((x,i)=><span key={x}>{x}{i===0&&<br/>}</span>)}</h1></div><p>{t.text}</p></section>
    <ol className="journey-flow catalogue-flow" aria-label={lang==="ar"?"خطوات الطلب":"Request steps"}>{t.steps.map((step,i)=><li key={step} className={i===0?"active":""}>{step}</li>)}</ol>
    <section className="catalogue-main"><div className="filter-bar"><small>{t.filter}</small><div><button className={group==="all"?"active":""} onClick={()=>{setGroup("all");setSubcategory("all")}}>{t.all}</button>{(Object.keys(groups) as Product["group"][]).map(g=><button key={g} className={group===g?"active":""} onClick={()=>{setGroup(g);setSubcategory("all")}}>{groups[g][lang]}</button>)}</div></div>{group!=="all"&&<div className="sub-filter"><small>{t.subFilter}</small><div>{availableSubcategories.map(([id,sub])=><button key={id} className={subcategory===id?"active":""} onClick={()=>setSubcategory(id)}>{sub.label[lang]}</button>)}</div></div>}<div className="catalogue-full-grid">{list.map((p,i)=>{const added=cart.includes(p.id),meta=metaFor(p);return <article key={p.id} className="full-product"><a href={`/catalogue/${p.slug}`} className="full-image"><span>0{i+1}</span><img src={p.image} alt={p.name[lang]}/><small>{t.demo}</small>{meta.bestseller&&<b className="product-badge best">{t.best}</b>}{meta.promotion&&<b className="product-badge offer">{t.offer}</b>}</a><div><small>{subcategories[meta.subcategory].label[lang]} · {p.id.toUpperCase()}</small><h2>{p.name[lang]}</h2><p>{p.detail[lang]}</p><div className="product-actions"><a href={`/catalogue/${p.slug}`}>{t.details} <span>↗</span></a><button className={added?"added":""} onClick={()=>toggle(p.id)}>{added?t.added:t.add}<span>{added?"✓":"+"}</span></button></div></div></article>})}</div></section>
  </main>
}
