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
export function pageTreeOrder(items:ContentItem[]){const sorted=[...items].sort((a,b)=>a.sortOrder-b.sortOrder||a.id.localeCompare(b.id));return sorted.filter(p=>!p.parentId).flatMap(p=>[p,...sorted.filter(c=>c.parentId===p.id)]);}
export function movePage(items:ContentItem[],source:string,target:string){const ordered=pageTreeOrder(items),from=ordered.find(p=>p.id===source),to=ordered.find(p=>p.id===target);if(!from||!to||from.parentId!==to.parentId||source===target)return ordered;const siblings=ordered.filter(p=>p.parentId===from.parentId),a=siblings.findIndex(p=>p.id===source),b=siblings.findIndex(p=>p.id===target);siblings.splice(a,1);siblings.splice(b,0,from);const roots=from.parentId?ordered.filter(p=>!p.parentId):siblings;const result=roots.flatMap(p=>[p,...(p.id===from.parentId?siblings:ordered.filter(c=>c.parentId===p.id))]);return result.map((p,i)=>({...p,sortOrder:i*10}));}
export function navigationPages(items:ContentItem[],placement:"header"|"footer"){const list=publicItems(items).filter(p=>placement==="header"?p.showInHeader===true:p.showInFooter!==false),ids=new Set(list.map(p=>p.id));return list.map(p=>({...p,parentId:p.parentId&&ids.has(p.parentId)?p.parentId:null}));}
