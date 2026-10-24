"use client";
import "./content-filters.css";
import type {ManagedCategory} from "../catalogue/managed";
import {label} from "../catalogue/managed";
import type {Lang} from "../catalogue/data";
export function matchesCategory(p:{categoryId:string|null;parentId?:string|null;parentCategoryId?:string|null},root:string,child:string){return root==="all"||(child!=="all"?p.categoryId===child:p.categoryId===root||(p.parentCategoryId||p.parentId)===root)}
export default function CategoryFilters({categories,root,child,onRoot,onChild,lang}:{categories:ManagedCategory[];root:string;child:string;onRoot:(id:string)=>void;onChild:(id:string)=>void;lang:Lang}){const all=lang==="ar"?"عرض الكل":lang==="fr"?"Tout voir":"View all",children=categories.filter(c=>c.parentId===root);return <div className="content-category-filters" dir={lang==="ar"?"rtl":"ltr"}><div><button className={root==="all"?"active":""} onClick={()=>onRoot("all")}>{all}</button>{categories.filter(c=>!c.parentId).map(c=><button key={c.id} className={root===c.id?"active":""} onClick={()=>onRoot(c.id)}>{label(c,lang)}</button>)}</div>{children.length>0&&<div><button className={child==="all"?"active":""} onClick={()=>onChild("all")}>{all}</button>{children.map(c=><button key={c.id} className={child===c.id?"active":""} onClick={()=>onChild(c.id)}>{label(c,lang)}</button>)}</div>}</div>}
