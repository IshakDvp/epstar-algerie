"use client";
import { useEffect, useState } from "react";
import { useQuoteCart } from "../components/use-quote-cart";
import CategoryFilters,{matchesCategory} from "../components/category-filters";
import { type Lang } from "./data";
import {
  label,
  type ManagedCatalogueProduct,
  type ManagedCategory,
} from "./managed";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
const tx = {
  fr: {
    all: "Tout voir",
    cat: "Catégories",
    sub: "Sous-catégories",
    details: "Voir la fiche",
    add: "Ajouter au devis",
    added: "Ajouté au devis",
    demo: "RÉFÉRENCE DE DÉMONSTRATION",
  },
  ar: {
    all: "عرض الكل",
    cat: "الفئات",
    sub: "الفئات الفرعية",
    details: "عرض التفاصيل",
    add: "أضف إلى طلب السعر",
    added: "تمت الإضافة",
    demo: "نموذج تجريبي",
  },
  en: {
    all: "View all",
    cat: "Categories",
    sub: "Subcategories",
    details: "View details",
    add: "Add to quote",
    added: "Added to quote",
    demo: "DEMO REFERENCE",
  },
};
export default function CatalogueShell() {
  const [lang, setLang] = useState<Lang>("fr"),
    [theme, setTheme] = useState<"light" | "dark">("light"),
    [root, setRoot] = useState("all"),
    [child, setChild] = useState("all"),
    [products, setProducts] = useState<ManagedCatalogueProduct[]>([]),
    [categories, setCategories] = useState<ManagedCategory[]>([]);
  const { cart, setCart } = useQuoteCart();
  useEffect(() => {
    const x = localStorage.getItem("epstar-language");
    if (x === "ar" || x === "fr" || x === "en") setLang(x);
    const y = localStorage.getItem("epstar-theme") as "light" | "dark" | null;
    setTheme(y || "light");
    fetch("/api/catalogue")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        setProducts(d?.products || []);
        setCategories(d?.categories || []);
      })
      .catch(() => {});
  }, []);
  const t = tx[lang],
    rtl = lang === "ar",
    roots = categories.filter((c) => !c.parentId),
    active = categories.find((c) => c.id === root),
    children = categories.filter((c) => c.parentId === root),
    shown = products.filter((p) =>
      matchesCategory(p,root,child),
    ),
    name = (c: ManagedCategory) =>
      lang === "ar" ? c.titleAr : lang === "en" ? c.titleEn : c.titleFr,
    toggle = (id: string) =>
      setCart((x) => (x.includes(id) ? x.filter((v) => v !== id) : [...x, id]));
  return (
    <main
      className={`catalogue-page ${theme === "dark" ? "dark" : ""} ${rtl ? "rtl" : ""}`}
      dir={rtl ? "rtl" : "ltr"}
    >
      <SiteHeader {...{ lang, setLang, theme, setTheme }} />
      <section className="catalogue-main">
        <CategoryFilters categories={categories} root={root} child={child} onRoot={id=>{setRoot(id);setChild("all")}} onChild={setChild} lang={lang}/>
        <div className="catalogue-full-grid">
          {shown.map((p, i) => {
            const added = cart.includes(p.id),
              cat = {
                titleFr: p.categoryFr,
                titleAr: p.categoryAr,
                titleEn: p.categoryEn,
              };
            return (
              <article key={p.id} className="full-product">
                <a href={`/catalogue/${p.slug}`} className="full-image">
                  <span>M{String(i + 1).padStart(2, "0")}</span>
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={label(p, lang)} />
                  ) : (
                    <small>{t.demo}</small>
                  )}
                </a>
                <div>
                  <small>
                    {label(cat, lang)} · {p.reference}
                  </small>
                  <h2>{label(p, lang)}</h2>
                  <p>{p.dimensions || t.demo}</p>
                  <div className="product-actions">
                    <a href={`/catalogue/${p.slug}`}>{t.details} ↗</a>
                    <button
                      className={added ? "added" : ""}
                      onClick={() => toggle(p.id)}
                    >
                      {added ? t.added : t.add}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <SiteFooter lang={lang} />
    </main>
  );
}
