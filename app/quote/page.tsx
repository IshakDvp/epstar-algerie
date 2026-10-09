"use client";
import {useEffect,useState} from "react";
import {useSearchParams} from "next/navigation";
import QuoteForm from "../components/quote-form";
import type {Lang} from "../catalogue/data";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
export default function QuotePage(){
 const [lang,setLang]=useState<Lang>("fr"),[theme,setTheme]=useState<"light"|"dark">("light");const search=useSearchParams();const sector=search.get("sector")||"";
 useEffect(()=>{const saved=localStorage.getItem("epstar-language");if(saved==="ar"||saved==="en"||saved==="fr")setLang(saved);setTheme((localStorage.getItem("epstar-theme") as "light"|"dark"|null)||"light")},[]);
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr"},[lang]);
 const t=lang==="ar"?["مراجعة طلب عرض السعر","راجع المنتجات المختارة، ثم أكمل بياناتك وجهّز الرسالة. يمكنك أيضًا طلب تجهيز مساحة كاملة دون اختيار منتجات.","متابعة تصفح المنتجات","المشاريع والمنتجات المعروضة حاليًا نماذج تجريبية. يُرسل طلبك مباشرة إلى EPSTAR عبر واتساب.",["اختياراتك","بيانات المشروع","إرسال الطلب"]]:lang==="fr"?["Votre demande de devis","Vérifiez votre sélection, complétez vos coordonnées puis préparez le message. Vous pouvez aussi demander un agencement complet sans sélectionner de produits.","Continuer vers les produits","Les projets et produits affichés sont actuellement des démonstrations. Votre demande est envoyée directement à EPSTAR sur WhatsApp.",["Vos choix","Détails du projet","Envoi de la demande"]]:["Review your quote request","Review your selection, enter your details and prepare the message. You can also request a complete fit-out without selecting products.","Continue browsing products","Projects and products shown are currently demo examples. Your request is sent directly to EPSTAR on WhatsApp.",["Your choices","Project details","Send request"]];
 return <main className={`request-page ${theme==="dark"?"dark":""}`} dir={lang==="ar"?"rtl":"ltr"}><SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/><div className="request-heading"><h1>{t[0]}</h1><p>{t[1]}</p><a href="/catalogue">{t[2]}</a></div><ol className="journey-flow request-flow" aria-label={lang==="ar"?"مراحل الطلب":"Request steps"}>{t[4].map((step,i)=><li key={step} className={i===1?"active":""}>{i+1}. {step}</li>)}</ol><section className="quote-band request-form"><QuoteForm lang={lang} defaultSector={sector}/></section><p className="request-disclaimer">{t[3]}</p><SiteFooter lang={lang}/></main>
}
