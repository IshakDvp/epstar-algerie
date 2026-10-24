import type { Lang } from "./data";

export type ManagedCatalogueProduct = {
  id:string; slug:string; reference:string; nameFr:string; nameAr:string; nameEn:string; dimensions:string; finishes:string; materials:string; isFeatured:boolean;
  categoryId:string|null; parentId:string|null; categoryFr:string|null; categoryAr:string|null; categoryEn:string|null; parentCategoryId:string|null; parentFr:string|null; parentAr:string|null; parentEn:string|null; imageUrl:string|null;
};
export type ManagedCategory = { id:string; parentId:string|null; slug:string; titleFr:string; titleAr:string; titleEn:string };
export const label=(item:{nameFr?:string|null;nameAr?:string|null;nameEn?:string|null;titleFr?:string|null;titleAr?:string|null;titleEn?:string|null},lang:Lang)=>lang==="ar"?(item.nameAr||item.titleAr||item.nameFr||item.titleFr||""):lang==="en"?(item.nameEn||item.titleEn||item.nameFr||item.titleFr||""):(item.nameFr||item.titleFr||"");
export const listValue=(value:string)=>{try{const parsed=JSON.parse(value);return Array.isArray(parsed)?parsed.map(String):[]}catch{return []}};
