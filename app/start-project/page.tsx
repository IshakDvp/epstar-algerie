"use client";
import {useEffect,useState} from "react";
import type {Lang} from "../catalogue/data";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
const sectors=[
 {key:"pharmacies",image:"/images/pharmacy-3d.png",ar:["صيدلية أو صيدلية شبه طبية","كاونترات، رفوف، مخازن ومساحات استشارة"],fr:["Pharmacie ou parapharmacie","Comptoirs, rayonnages, réserves et espaces conseil"],en:["Pharmacy or parapharmacy","Counters, shelving, storage and consultation areas"]},
 {key:"bureaux",image:"/images/office-3d.png",ar:["مكاتب ومساحات عمل","استقبال، مكاتب، اجتماعات وتخزين"],fr:["Bureaux et espaces de travail","Accueil, bureaux, réunion et rangement"],en:["Offices and workspaces","Reception, desks, meeting and storage"]},
 {key:"commerces",image:"/images/shop-3d.png",ar:["محل أو مساحة بيع","عرض المنتجات، كاشير، إضاءة وهوية"],fr:["Commerce ou espace de vente","Présentation, caisse, éclairage et identité"],en:["Retail or sales space","Displays, cash desk, lighting and identity"]},
 {key:"chambres",image:"/images/bedroom-3d.png",ar:["غرفة نوم أو دولاب","سرير، Dressing وتخزين حسب المقاس"],fr:["Chambre ou dressing","Lit, dressing et rangement sur mesure"],en:["Bedroom or wardrobe","Bed, wardrobe and made-to-measure storage"]}
] as const;
export default function StartProject(){
 const [lang,setLang]=useState<Lang>("fr"),[theme,setTheme]=useState<"light"|"dark">("light");
 useEffect(()=>{const saved=localStorage.getItem("epstar-language");if(saved==="ar"||saved==="fr"||saved==="en")setLang(saved);setTheme((localStorage.getItem("epstar-theme") as "light"|"dark"|null)||"light")},[]);
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;localStorage.setItem("epstar-theme",theme)},[lang,theme]);
 const t=lang==="ar"?["ابدأ مشروع تجهيز","ما هي المساحة التي تريد تجهيزها؟","اختر المجال لنأخذك مباشرة إلى طلب دراسة المشروع.","لديك عدة مساحات؟","اطلب دراسة شاملة",["اختر المساحة","أخبرنا بالاحتياجات","أرسل الطلب"]]:lang==="fr"?["Démarrer un projet d’aménagement","Quel espace souhaitez-vous aménager ?","Choisissez votre secteur pour passer directement à la demande d’étude.","Vous avez plusieurs espaces ?","Demander une étude globale",["Choisissez l’espace","Décrivez le besoin","Envoyez la demande"]]:["Start a fit-out project","What space would you like to fit out?","Choose a sector and go directly to the project study request.","More than one space?","Request an overall study",["Choose the space","Describe your needs","Send request"]];
 return <main className={`start-page ${theme==="dark"?"dark":""}`} dir={lang==="ar"?"rtl":"ltr"}><SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/><section className="start-hero"><small>EPSTAR</small><h1>{t[0]}</h1><h2>{t[1]}</h2><p>{t[2]}</p></section><ol className="journey-flow start-flow" aria-label={lang==="ar"?"مراحل المشروع":"Project steps"}>{t[5].map((step,i)=><li key={step} className={i===0?"active":""}>{i+1}. {step}</li>)}</ol><section className="start-grid">{sectors.map((sector,i)=><a key={sector.key} href={`/quote?sector=${sector.key}`}><span>0{i+1}</span><img src={sector.image} alt=""/><div><h3>{sector[lang][0]}</h3><p>{sector[lang][1]}</p><b>{lang==="ar"?"ابدأ الطلب":lang==="fr"?"Commencer":"Start request"}</b></div></a>)}</section><div className="start-general"><p>{t[3]}</p><a href="/quote">{t[4]}</a></div><SiteFooter lang={lang}/></main>
}
