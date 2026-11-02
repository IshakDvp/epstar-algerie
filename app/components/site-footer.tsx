"use client";
import type { Lang } from "../catalogue/data";
import PageNavigation from "./page-navigation";
import {useContent} from "./use-content";
import "./site-footer.css";

function ContactIcon({phone=false}:{phone?:boolean}){
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{phone?<path d="m7 3 3 5-2 2a14 14 0 0 0 6 6l2-2 5 3c-1 5-4 5-8 3C7 17 3 12 3 7c0-2 2-4 4-4Z"/>:<><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></>}</svg>;
}

const copy = {
  ar: { description:"تصميم وتصنيع وتجهيز المساحات حسب الطلب.", navigation:"روابط الموقع", home:"الرئيسية", products:"المنتجات", fitout:"التجهيز الكامل", projects:"إنجازاتنا", offers:"عروضنا", contact:"اتصل بنا", temporary:"بيانات تواصل مؤقتة", demo:"نسخة تجريبية." },
  fr: { description:"Conception, fabrication et aménagement sur mesure.", navigation:"Navigation", home:"Accueil", products:"Produits", fitout:"Aménagement", projects:"Nos réalisations", offers:"Nos offres", contact:"Contact", temporary:"Coordonnées temporaires", demo:"Version de démonstration." },
  en: { description:"Custom design, manufacturing and fit-out.", navigation:"Navigation", home:"Home", products:"Products", fitout:"Fit-out", projects:"Our work", offers:"Offers", contact:"Contact", temporary:"Temporary contact details", demo:"Demo version." },
};

export default function SiteFooter({lang}:{lang:Lang}) {
  const t=copy[lang],{contact:c,pages}=useContent();
  return <footer className="footer epstar-footer"><div className="footer-brand"><a href="/" aria-label="EPSTAR"><img src="/epstar-logo.png" alt="EPSTAR"/></a></div><div className="footer-contact"><div className="footer-contact-row"><div className="footer-channels">{c.email&&<a dir="ltr" href={`mailto:${c.email}`}><ContactIcon/><span>{c.email}</span></a>}{c.phone&&<a dir="ltr" href={`tel:${c.phone}`}><ContactIcon phone/><span>{c.phone}</span></a>}</div>{c.whatsapp&&<a className="footer-whatsapp" href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer"><svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a9 9 0 0 1-13.5 8L3 21l1.5-4.5A9 9 0 1 1 21 11.5Z"/></svg><span>WhatsApp</span></a>}</div>{c.address[lang]||c.address.fr?<p>{c.address[lang]||c.address.fr}</p>:null}{c.hours[lang]||c.hours.fr?<small>{c.hours[lang]||c.hours.fr}</small>:null}{(c.facebook||c.instagram)&&<div className="footer-social">{c.facebook&&<a href={c.facebook} target="_blank" rel="noreferrer">Facebook</a>}{c.instagram&&<a href={c.instagram} target="_blank" rel="noreferrer">Instagram</a>}</div>}</div><nav className="footer-navigation" aria-label={t.navigation}><div className="footer-page-links"><PageNavigation pages={pages} placement="footer" lang={lang}/></div></nav><p className="copyright" dir="ltr">© 2026 EPSTAR</p></footer>;
}
