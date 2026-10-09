"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useQuoteCart } from "./use-quote-cart";
import type { Lang } from "../catalogue/data";

type Theme = "light" | "dark";
type Props = { lang: Lang; setLang: (lang: Lang) => void; theme: Theme; setTheme: (theme: Theme) => void };

const copy = {
  ar: { home: "الرئيسية", products: "المنتجات", fitout: "التجهيز الكامل", offers: "عروضنا", projects: "المشاريع", request: "طلبي", menu: "القائمة", badge: "جديد" },
  fr: { home: "Accueil", products: "Produits", fitout: "Aménagement", offers: "Nos offres", projects: "Projets", request: "Ma demande", menu: "Menu", badge: "NOUVEAU" },
  en: { home: "Home", products: "Products", fitout: "Fit-out", offers: "Offers", projects: "Projects", request: "My request", menu: "Menu", badge: "NEW" },
};

export default function SiteHeader({ lang, setLang, theme, setTheme }: Props) {
  const { cart } = useQuoteCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = copy[lang];
  const links = [
    ["/", t.home], ["/catalogue", t.products], ["/start-project", t.fitout], ["/offers", t.offers], ["/projects", t.projects],
  ] as const;
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const choose = (next: Lang) => { setLang(next); localStorage.setItem("epstar-language", next); };
  return <header className="site-header unified-header" dir={lang === "ar" ? "rtl" : "ltr"}>
    <a className="logo" href="/" aria-label="EPSTAR"><img src="/epstar-logo.png" alt="EPSTAR Design"/></a>
    <nav className="desktop-navigation" aria-label="Navigation">{links.map(([href,label]) => <a key={href} className={active(href) ? "active" : ""} href={href}>{href === "/offers" && <small className="nav-promo">{t.badge}</small>}{label}</a>)}</nav>
    <div className="header-tools">
      <a className="quote-link" href="/quote">{t.request} <b>({cart.length})</b></a>
      <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Theme">{theme === "dark" ? "☀" : "☾"}</button>
      <div className="lang-switch">{(["ar","fr","en"] as Lang[]).map(item => <button key={item} className={lang === item ? "active" : ""} onClick={() => choose(item)}>{item.toUpperCase()}</button>)}</div>
      <button className="mobile-menu-toggle" aria-label={t.menu} aria-expanded={open} onClick={() => setOpen(!open)}><i/><i/><i/></button>
    </div>
    {open && <nav className="mobile-menu" aria-label={t.menu}>{links.map(([href,label]) => <a key={href} className={active(href) ? "active" : ""} href={href} onClick={() => setOpen(false)}>{href === "/offers" && <small>{t.badge}</small>}{label}</a>)}<a className="mobile-quote" href="/quote" onClick={() => setOpen(false)}>{t.request} ({cart.length})</a></nav>}
  </header>;
}
