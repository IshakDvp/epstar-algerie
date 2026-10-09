import type { Lang } from "../catalogue/data";

const copy = {
  ar: { description:"تصميم وتصنيع وتجهيز المساحات حسب الطلب.", navigation:"روابط الموقع", home:"الرئيسية", products:"المنتجات", fitout:"التجهيز الكامل", projects:"المشاريع", offers:"عروضنا", contact:"اتصل بنا", temporary:"بيانات تواصل مؤقتة", demo:"نسخة تجريبية." },
  fr: { description:"Conception, fabrication et aménagement sur mesure.", navigation:"Navigation", home:"Accueil", products:"Produits", fitout:"Aménagement", projects:"Projets", offers:"Nos offres", contact:"Contact", temporary:"Coordonnées temporaires", demo:"Version de démonstration." },
  en: { description:"Custom design, manufacturing and fit-out.", navigation:"Navigation", home:"Home", products:"Products", fitout:"Fit-out", projects:"Projects", offers:"Offers", contact:"Contact", temporary:"Temporary contact details", demo:"Demo version." },
};

export default function SiteFooter({lang}:{lang:Lang}) {
  const t=copy[lang];
  return <footer className="footer"><div><img src="/epstar-logo.png" alt="EPSTAR"/><p>{t.description}</p></div><div><h4>{t.navigation}</h4><a href="/">{t.home}</a><a href="/catalogue">{t.products}</a><a href="/start-project">{t.fitout}</a><a href="/projects">{t.projects}</a><a href="/offers">{t.offers}</a></div><div><h4>{t.contact}</h4><a href="https://wa.me/213551984778" target="_blank" rel="noreferrer">WhatsApp +213 551 984 778</a><small>{t.temporary}</small></div><p className="copyright">© 2026 EPSTAR — {t.demo}</p></footer>;
}
