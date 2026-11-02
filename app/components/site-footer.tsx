"use client";
import type { Lang } from "../catalogue/data";
import PageNavigation from "./page-navigation";
import {useContent} from "./use-content";
import "./site-footer.css";

const copy = {
  ar: { description:"تصميم وتصنيع وتجهيز المساحات حسب الطلب.", navigation:"روابط الموقع", home:"الرئيسية", products:"المنتجات", fitout:"التجهيز الكامل", projects:"إنجازاتنا", offers:"عروضنا", contact:"اتصل بنا", temporary:"بيانات تواصل مؤقتة", demo:"نسخة تجريبية." },
  fr: { description:"Conception, fabrication et aménagement sur mesure.", navigation:"Navigation", home:"Accueil", products:"Produits", fitout:"Aménagement", projects:"Nos réalisations", offers:"Nos offres", contact:"Contact", temporary:"Coordonnées temporaires", demo:"Version de démonstration." },
  en: { description:"Custom design, manufacturing and fit-out.", navigation:"Navigation", home:"Home", products:"Products", fitout:"Fit-out", projects:"Our work", offers:"Offers", contact:"Contact", temporary:"Temporary contact details", demo:"Demo version." },
};

export default function SiteFooter({lang}:{lang:Lang}) {
  const t=copy[lang],{contact:c,pages}=useContent();
  return <footer className="footer epstar-footer"><div className="footer-brand"><a href="/" aria-label="EPSTAR"><img src="/epstar-logo.png" alt="EPSTAR"/></a></div><div className="footer-contact"><h4>{t.contact}</h4>{c.email&&<a dir="ltr" href={`mailto:${c.email}`}>{c.email}</a>}{c.phone&&<a dir="ltr" href={`tel:${c.phone}`}>{c.phone}</a>}{c.whatsapp&&<a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>}{c.address[lang]||c.address.fr?<p>{c.address[lang]||c.address.fr}</p>:null}{c.hours[lang]||c.hours.fr?<small>{c.hours[lang]||c.hours.fr}</small>:null}<div className="footer-social">{c.facebook&&<a href={c.facebook} target="_blank" rel="noreferrer">Facebook</a>}{c.instagram&&<a href={c.instagram} target="_blank" rel="noreferrer">Instagram</a>}</div></div><nav className="footer-navigation" aria-label={t.navigation}><div className="footer-page-links"><PageNavigation pages={pages} placement="footer" lang={lang}/></div></nav><p className="copyright" dir="ltr">© 2026 EPSTAR</p></footer>;
}
