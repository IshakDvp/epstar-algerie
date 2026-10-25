import {publicItems,type ContentItem} from "./content-model";
const definitions=[
 ["home","/","Accueil","الرئيسية","Home",true,true],
 ["catalogue","/catalogue","Produits","المنتجات","Products",true,true],
 ["fitout","/start-project","Aménagement","التجهيز الكامل","Fit-out",true,true],
 ["offers","/offers","Nos offres","عروضنا","Offers",true,true],
 ["projects","/projects","Nos réalisations","إنجازاتنا","Our work",true,true],
 ["about","/about","À propos","من نحن","About",false,false],
 ["quote","/quote","Demande de devis","طلب عرض سعر","Quote request",false,false],
 ["service-pharmacies","/services/pharmacies","Pharmacies","الصيدليات","Pharmacies",false,false],
 ["service-bureaux","/services/bureaux","Bureaux","المكاتب","Offices",false,false],
 ["service-commerces","/services/commerces","Commerces","المحلات","Retail",false,false],
 ["service-chambres","/services/chambres","Chambres","غرف النوم","Bedrooms",false,false]
] as const;
export const builtinPages:ContentItem[]=definitions.map(([key,,fr,ar,en,header,footer],i)=>({id:`builtin-${key}`,builtinId:key,slug:`site-${key}`,title:{fr,ar,en},body:{fr:"",ar:"",en:""},subtitle:{fr:"",ar:"",en:""},image:"",parentId:null,visible:true,showInHeader:header,showInFooter:footer,sortOrder:i*10}));
export function pageHref(page:ContentItem){return page.builtinId?definitions.find(d=>d[0]===page.builtinId)?.[1]||"/":`/pages/${page.slug}`;}
export function withBuiltinPages(items:ContentItem[]){const ids=new Set(items.map(i=>i.id));return [...items,...builtinPages.filter(p=>!ids.has(p.id))];}
export function navigationPages(items:ContentItem[],placement:"header"|"footer"){const list=publicItems(items).filter(p=>placement==="header"?p.showInHeader===true:p.showInFooter!==false),ids=new Set(list.map(p=>p.id));return list.map(p=>({...p,parentId:p.parentId&&ids.has(p.parentId)?p.parentId:null}));}
