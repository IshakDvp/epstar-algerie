import {publicItems,type ContentItem} from "./content-model";
const definitions=[
 ["home","/","Accueil","الرئيسية","Home",true,true],
 ["catalogue","/catalogue","Produits prêts","منتجات جاهزة","Ready-made products",true,true],
 ["fitout","/start-project","Aménagement","التجهيز الكامل","Fit-out",true,true],
 ["solutions","/#services","Nos solutions","حلولنا","Our solutions",true,false],
 ["offers","/offers","Nos offres","عروضنا","Offers",true,true],
 ["projects","/projects","Nos réalisations","إنجازاتنا","Our work",true,true],
 ["about","/about","À propos","من نحن","About",true,false],
 ["quote","/quote","Demande de devis","طلب عرض سعر","Quote request",false,false],
 ["service-pharmacies","/services/pharmacies","Pharmacies","الصيدليات","Pharmacies",true,false],
 ["service-bureaux","/services/bureaux","Bureaux","المكاتب","Offices",true,false],
 ["service-commerces","/services/commerces","Commerces","المحلات","Retail",true,false],
 ["service-chambres","/services/chambres","Chambres","غرف النوم","Bedrooms",true,false]
] as const;
export const builtinPages:ContentItem[]=definitions.map(([key,,fr,ar,en,header,footer],i)=>({id:`builtin-${key}`,builtinId:key,slug:`site-${key}`,title:{fr,ar,en},body:{fr:"",ar:"",en:""},subtitle:{fr:"",ar:"",en:""},image:"",parentId:key==="fitout"||key==="catalogue"?"builtin-solutions":null,visible:true,showInHeader:key.startsWith("service-")?false:header,showInFooter:footer,sortOrder:({home:0,solutions:10,fitout:20,catalogue:30,offers:40,projects:50,about:60} as Record<string,number>)[key]??i*10}));
export function pageHref(page:ContentItem){return page.builtinId?definitions.find(d=>d[0]===page.builtinId)?.[1]||"/":`/pages/${page.slug}`;}
export function withBuiltinPages(items:ContentItem[]){const ids=new Set(items.map(i=>i.id));return [...items,...builtinPages.filter(p=>!ids.has(p.id))];}
export function pageTreeOrder(items:ContentItem[]){const sorted=[...items].sort((a,b)=>a.sortOrder-b.sortOrder||a.id.localeCompare(b.id));return sorted.filter(p=>!p.parentId).flatMap(p=>[p,...sorted.filter(c=>c.parentId===p.id)]);}
export function movePage(items:ContentItem[],source:string,target:string){const ordered=pageTreeOrder(items),from=ordered.find(p=>p.id===source),to=ordered.find(p=>p.id===target);if(!from||!to||from.parentId!==to.parentId||source===target)return ordered;const siblings=ordered.filter(p=>p.parentId===from.parentId),a=siblings.findIndex(p=>p.id===source),b=siblings.findIndex(p=>p.id===target);siblings.splice(a,1);siblings.splice(b,0,from);const roots=from.parentId?ordered.filter(p=>!p.parentId):siblings;const result=roots.flatMap(p=>[p,...(p.id===from.parentId?siblings:ordered.filter(c=>c.parentId===p.id))]);return result.map((p,i)=>({...p,sortOrder:i*10}));}
export function navigationPages(items:ContentItem[],placement:"header"|"footer"){const list=publicItems(items).filter(p=>placement==="header"?p.showInHeader===true:p.showInFooter!==false),ids=new Set(list.map(p=>p.id));return list.map(p=>({...p,parentId:p.parentId&&ids.has(p.parentId)?p.parentId:null}));}
/** First rollout only: group legacy root services without destroying custom hierarchies. */
export function initialSolutionsPages(items:ContentItem[]){
 return withBuiltinPages(items).map(p=>p.builtinId?.startsWith("service-")&&!p.parentId&&!items.some(child=>child.parentId===p.id)?{...p,parentId:"builtin-solutions",showInHeader:true}:p);
}
/** v2 rollout: change navigation only. Records, URLs, copy and footer choices survive. */
export function twoPathSolutionsPages(items:ContentItem[]){
 const parents=new Set(["builtin-fitout","builtin-catalogue"]);
 return withBuiltinPages(items).map(p=>{
  if(p.builtinId==="catalogue"||p.builtinId==="fitout"){
   const title={...p.title};
   if(p.builtinId==="catalogue")for(const [lang,old,label] of [["fr","Produits","Produits prêts"],["ar","المنتجات","منتجات جاهزة"],["en","Products","Ready-made products"]] as const)if(title[lang]===old)title[lang]=label;
   return {...p,title,parentId:"builtin-solutions",showInHeader:true,sortOrder:p.builtinId==="fitout"?20:30};
  }
  if(p.builtinId?.startsWith("service-"))return {...p,parentId:p.parentId==="builtin-solutions"?null:p.parentId,showInHeader:false};
  const order=({home:0,solutions:10,offers:40,projects:50,about:60} as Record<string,number>)[p.builtinId||""];
  if(order!==undefined)return {...p,parentId:null,sortOrder:order,...(p.builtinId==="about"?{showInHeader:true}:{})};
  // Existing custom children must not become inaccessible third-level pages.
  return p.parentId&&parents.has(p.parentId)?{...p,parentId:null}:p;
 });
}
