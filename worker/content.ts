import {defaultContact,defaultOffers,publicItems,validWebLink,type ContentItem,type ContactInfo} from "../app/content-model";
import {builtinPages,withBuiltinPages} from "../app/page-registry";
import {homeContent} from "./home-content";
type Store={DB:D1Database;BUCKET:R2Bucket};
const response=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
const prefix=(kind:string)=>`cms:${kind}:`;
async function records(env:Store,kind:string):Promise<ContentItem[]>{const r=await env.DB.prepare("SELECT value FROM site_settings WHERE key LIKE ?").bind(prefix(kind)+"%").all<{value:string}>();return (r.results||[]).map(r=>JSON.parse(r.value));}
async function contact(env:Store):Promise<ContactInfo>{const r=await env.DB.prepare("SELECT value FROM site_settings WHERE key = ?").bind("contact").first<{value:string}>();return r?JSON.parse(r.value):defaultContact;}
async function put(env:Store,key:string,value:unknown){await env.DB.prepare("INSERT INTO site_settings(key,value,updated_at) VALUES(?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=excluded.updated_at").bind(key,JSON.stringify(value),new Date().toISOString()).run();}
export async function publicContent(env:Store){return response({contact:await contact(env),offers:publicItems(await records(env,"offers")),pages:publicItems(withBuiltinPages(await records(env,"pages")))});}
const string=(v:unknown,max=400)=>typeof v==="string"?v.trim().slice(0,max):"";
const localized=(v:any,max=20000)=>({fr:string(v?.fr,max),ar:string(v?.ar,max),en:string(v?.en,max)});
export function validateItem(raw:any,id:string,kind:string,items:ContentItem[]):ContentItem{
 const item:ContentItem={id,slug:string(raw.slug,80),title:localized(raw.title,160),subtitle:localized(raw.subtitle,300),body:localized(raw.body),image:string(raw.image,500),parentId:kind==="pages"?(string(raw.parentId)||null):null,visible:raw.visible===true,sortOrder:Number(raw.sortOrder)||0};
 if(kind==="pages"){
  const existing=items.find(p=>p.id===id);
  item.showInHeader=raw.showInHeader===true;item.showInFooter=raw.showInFooter===undefined?(existing?.showInFooter??true):raw.showInFooter===true;
  if(existing?.builtinId){item.builtinId=existing.builtinId;item.slug=existing.slug;item.body=existing.body;}
 }
 if(!item.title.fr||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug))throw Error("Titre français et identifiant URL (lettres minuscules, chiffres, tirets) requis.");
 if(!item.builtinId&&items.some(i=>!i.builtinId&&i.id!==id&&i.slug===item.slug))throw Error("Cet identifiant URL existe déjà.");
 if(item.parentId){const parent=items.find(i=>i.id===item.parentId);if(!parent||parent.parentId||parent.id===id||items.some(i=>i.parentId===id))throw Error("Choisissez une page principale. Deux niveaux maximum, sans boucle.");}
 if(item.image&&!/^\/(?!\/)[^\s]*$/.test(item.image)&&!validWebLink(item.image))throw Error("Image : chemin local ou URL HTTPS requis.");
 return item;
}
export async function adminContent(request:Request,env:Store){
 if(request.method!=="GET"&&request.headers.get("origin")&&request.headers.get("origin")!==new URL(request.url).origin)return response({error:"Origin rejected"},403);
 const path=new URL(request.url).pathname.replace("/api/admin/content","").split("/").filter(Boolean),kind=path[0],id=path[1];
 if(kind==="home")return homeContent(request,env,true);
 if(kind==="media"&&request.method==="POST") {const form=await request.formData(),file=form.get("image");if(!(file instanceof File)||!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>8*1024*1024||file.size===0)return response({error:"JPG, PNG ou WEBP, 8 Mo maximum."},400);const key=crypto.randomUUID();await env.BUCKET.put(`cms/${key}`,file.stream(),{httpMetadata:{contentType:file.type}});return response({url:`/api/content/media/${key}`});}
 if(kind==="contact"){
  if(request.method==="GET")return response({contact:await contact(env)});
  if(request.method!=="PUT")return response({error:"Method not allowed"},405);
  const raw:any=await request.json().catch(()=>null);if(!raw)return response({error:"JSON invalide"},400);
  const value:ContactInfo={phone:string(raw.phone,30),whatsapp:string(raw.whatsapp,20).replace(/\D/g,""),email:string(raw.email,200),address:localized(raw.address,500),hours:localized(raw.hours,300),facebook:string(raw.facebook,500),instagram:string(raw.instagram,500)};
  if((value.email&&!/^\S+@\S+\.\S+$/.test(value.email))||!validWebLink(value.facebook)||!validWebLink(value.instagram)||(value.phone&&!/^\+?[\d ()-]{6,30}$/.test(value.phone)))return response({error:"Vérifiez téléphone, e-mail et liens HTTPS."},400);
  await put(env,"contact",value);return response({ok:true});
 }
 if(kind!=="offers"&&kind!=="pages")return response({error:"Not found"},404);
 const items=kind==="pages"?withBuiltinPages(await records(env,kind)):await records(env,kind);
 if(kind==="pages"&&id==="reorder"&&request.method==="POST"){
  const body:any=await request.json().catch(()=>null),ids=body?.ids;
  if(!Array.isArray(ids)||ids.length!==items.length||new Set(ids).size!==items.length||ids.some(x=>typeof x!=="string"||!items.some(p=>p.id===x)))return response({error:"La liste des pages a changé. Actualisez avant de réordonner."},409);
  const now=new Date().toISOString();await env.DB.batch(ids.map((key:string,index:number)=>{const item=items.find(p=>p.id===key)!;return env.DB.prepare("INSERT INTO site_settings(key,value,updated_at) VALUES(?,?,?) ON CONFLICT(key) DO UPDATE SET value=json_set(site_settings.value,'$.sortOrder',?),updated_at=excluded.updated_at").bind(prefix(kind)+key,JSON.stringify({...item,sortOrder:index*10}),now,index*10);}));return response({ok:true});
 }
 if(kind==="pages"&&id==="bootstrap"&&request.method==="POST"){
  const now=new Date().toISOString();await env.DB.batch(builtinPages.map(item=>env.DB.prepare("INSERT OR IGNORE INTO site_settings(key,value,updated_at) VALUES(?,?,?)").bind(prefix(kind)+item.id,JSON.stringify(item),now)));return response({ok:true});
 }
 if(request.method==="GET")return response({items:items.sort((a,b)=>a.sortOrder-b.sortOrder)});
 if((id==="bootstrap"||id==="import")&&kind==="offers"&&request.method==="POST"){
  // A single transactional batch: concurrent visits cannot duplicate offers,
  // and later visits must never resurrect a deliberately deleted offer.
  const marker="cms-meta:offers-initialized",now=new Date().toISOString();
  const statements=defaultOffers.map(item=>env.DB.prepare("INSERT OR IGNORE INTO site_settings(key,value,updated_at) SELECT ?,?,? WHERE NOT EXISTS (SELECT 1 FROM site_settings WHERE key=?) AND NOT EXISTS (SELECT 1 FROM site_settings WHERE key LIKE 'cms:offers:%' AND json_extract(value,'$.slug')=?)").bind(prefix(kind)+item.id,JSON.stringify(item),now,marker,item.slug));
  statements.push(env.DB.prepare("INSERT OR IGNORE INTO site_settings(key,value,updated_at) VALUES(?,?,?)").bind(marker,"true",now));
  const results=await env.DB.batch(statements);return response({added:results.slice(0,defaultOffers.length).reduce((n:number,r:{meta:{changes?:number}})=>n+(r.meta.changes||0),0)});
 }
 if(request.method==="DELETE"&&id){if(!items.some(i=>i.id===id))return response({error:"Not found"},404);if(items.find(i=>i.id===id)?.builtinId)return response({error:"Page système : masquez les liens au lieu de supprimer la page."},409);if(items.some(i=>i.parentId===id))return response({error:"Déplacez ou supprimez d’abord les sous-pages."},409);await env.DB.prepare("DELETE FROM site_settings WHERE key=?").bind(prefix(kind)+id).run();return response({ok:true});}
 if(request.method!=="POST"&&request.method!=="PUT")return response({error:"Method not allowed"},405);
 if(request.method==="PUT"&&!items.some(i=>i.id===id))return response({error:"Not found"},404);
 const raw=await request.json().catch(()=>null);if(!raw)return response({error:"JSON invalide"},400);
 try{const item=validateItem(raw,request.method==="POST"?crypto.randomUUID():id,kind,items);await put(env,prefix(kind)+item.id,item);return response({item});}catch(e){return response({error:(e as Error).message},400);}
}
export async function contentMedia(env:Store,id:string){const obj=await env.BUCKET.get(`cms/${id}`);if(!obj)return new Response("Not found",{status:404});return new Response(obj.body,{headers:{"content-type":obj.httpMetadata?.contentType||"image/jpeg","cache-control":"public,max-age=86400","x-content-type-options":"nosniff"}});}
