"use client";
import {useSiteTheme} from "../../components/theme-provider";
import {useEffect,useState} from "react";
import type {Lang,Product} from "../data";
import {label,listValue,type ManagedCatalogueProduct} from "../managed";
import {useQuoteCart} from "../../components/use-quote-cart";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import ProductDetail from "./product-detail";

export default function ManagedProductDetail({slug,fallback}:{slug:string;fallback?:Product}){
  const [lang,setLang]=useState<Lang>("fr"),[theme,setTheme] = useSiteTheme(),[product,setProduct]=useState<ManagedCatalogueProduct|null>(null),[missing,setMissing]=useState(false);const {cart,setCart}=useQuoteCart();
  useEffect(()=>{const saved=localStorage.getItem("epstar-language");if(saved==="fr"||saved==="ar"||saved==="en")setLang(saved);fetch(`/api/catalogue/products/${encodeURIComponent(slug)}`).then(async r=>r.ok?r.json():null).then(data=>{const entry=data?.products?.[0];if(entry)setProduct(entry);else setMissing(true)}).catch(()=>setMissing(true))},[slug]);
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";},[lang,theme]);
  const rtl=lang==="ar";if(missing&&fallback)return <ProductDetail product={fallback}/>;if(missing)return <main className={`detail-page ${theme==="dark"?"dark":""}`}><SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/><section className="detail-hero"><h1>{lang==="ar"?"المنتج غير متوفر":lang==="en"?"Product unavailable":"Produit indisponible"}</h1></section><SiteFooter lang={lang}/></main>;if(!product)return <main className={`detail-page ${theme==="dark"?"dark":""}`}>Chargement…</main>;
  const added=cart.includes(product.id),category={titleFr:product.categoryFr,titleAr:product.categoryAr,titleEn:product.categoryEn},materials=listValue(product.materials),finishes=listValue(product.finishes);const add=()=>setCart(items=>items.includes(product.id)?items.filter(id=>id!==product.id):[...items,product.id]);
  return <main className={`detail-page ${theme==="dark"?"dark":""} ${rtl?"rtl":""}`} dir={rtl?"rtl":"ltr"}><SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/><section className="detail-hero"><div className="detail-copy"><small>EPSTAR · {product.reference}</small><p className="detail-group">{label(category,lang)}</p><h1>{label(product,lang)}</h1><p>{product.dimensions||"Sur mesure"}</p><button className={added?"added":""} onClick={add}>{added?(lang==="ar"?"تمت الإضافة":lang==="en"?"Added":"Ajouté au devis"):(lang==="ar"?"أضف إلى طلب السعر":lang==="en"?"Add to quote":"Ajouter au devis")}</button>{added&&<a className="detail-next" href="/quote">{lang==="ar"?"عرض طلبي":lang==="en"?"View my request":"Voir ma demande"}</a>}</div><div className="detail-visual">{product.imageUrl?<img src={product.imageUrl} alt={label(product,lang)}/>:<span>EPSTAR</span>}</div></section><section className="detail-specs"><article><small>01</small><h2>{lang==="ar"?"الخامات":lang==="en"?"Materials":"Matières"}</h2><ul>{materials.length?materials.map(value=><li key={value}>{value}</li>):<li>—</li>}</ul></article><article><small>02</small><h2>{lang==="ar"?"التشطيبات":lang==="en"?"Finishes":"Finitions"}</h2><ul>{finishes.length?finishes.map(value=><li key={value}>{value}</li>):<li>—</li>}</ul></article></section><SiteFooter lang={lang}/></main>
}
