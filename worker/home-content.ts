import {homeDefaults,type HomeContent,type HomeBlock} from "../app/home-content";
export function safeContentUrl(value:string,anchor=true){return value===""||/^https:\/\/[^\s]+$/i.test(value)||/^\/(?!\/)[^\s\\]*$/.test(value)||(anchor&&/^#[a-zA-Z][\w-]*$/.test(value));}
export function validateHome(raw:any):HomeContent{
 if(!raw||typeof raw!=="object"||JSON.stringify(raw).length>250000)throw Error("Contenu invalide ou trop volumineux.");
 function shape(base:any,value:any,path:string):any{
  if(typeof base==="string"){if(typeof value!=="string"||value.length>20000)throw Error("Texte invalide : "+path);if(/^(images|models|aboutImage|testimonialImage|links)/.test(path)&&!safeContentUrl(value,path.startsWith("links")))throw Error("Lien ou image invalide : "+path);return value;}
  if(Array.isArray(base)){if(!Array.isArray(value)||value.length!==base.length)throw Error("Structure invalide : "+path);return base.map((v,i)=>shape(v,value[i],path+"."+i));}
  return Object.fromEntries(Object.entries(base).map(([k,v])=>[k,shape(v,value?.[k],path?path+"."+k:k)]));
 }
 const {sectionOrder,hiddenSections,blocks,...base}=homeDefaults;const result=shape(base,raw,"");
 if(!Array.isArray(raw.sectionOrder)||raw.sectionOrder.length!==sectionOrder.length||new Set(raw.sectionOrder).size!==sectionOrder.length||raw.sectionOrder.some((k:string)=>!sectionOrder.includes(k)))throw Error("Ordre des sections invalide.");
 if(!Array.isArray(raw.hiddenSections)||raw.hiddenSections.some((k:string)=>!sectionOrder.includes(k)))throw Error("Sections invalides.");
 if(!Array.isArray(raw.blocks)||raw.blocks.length>20)throw Error("20 sections supplémentaires maximum.");
 const seen=new Set();const cleanBlocks:HomeBlock[]=raw.blocks.map((b:any)=>{if(typeof b.id!=="string"||!/^[a-zA-Z0-9-]{1,80}$/.test(b.id)||seen.has(b.id))throw Error("Identifiant de section invalide.");seen.add(b.id);for(const k of ["image","href"])if(typeof b[k]!=="string"||!safeContentUrl(b[k],k==="href"))throw Error("Lien ou image invalide.");const local=(v:any)=>Object.fromEntries(["fr","ar","en"].map(l=>{if(typeof v?.[l]!=="string"||v[l].length>20000)throw Error("Texte invalide.");return [l,v[l]];}));return {id:b.id,title:local(b.title),text:local(b.text),button:local(b.button),image:b.image,href:b.href,visible:b.visible===true} as HomeBlock;});
 return {...result,sectionOrder:raw.sectionOrder,hiddenSections:[...new Set(raw.hiddenSections)],blocks:cleanBlocks};
}
type Store={DB:D1Database};const json=(d:unknown,status=200)=>new Response(JSON.stringify(d),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
export async function homeContent(request:Request,env:Store,isAdmin=false){const key="cms-content:home";const row=await env.DB.prepare("SELECT value FROM site_settings WHERE key=?").bind(key).first<{value:string}>();const saved=row?JSON.parse(row.value):{draft:homeDefaults,published:homeDefaults,revision:0};
 if(request.method==="GET")return isAdmin?json(saved):json({home:saved.published});
 if(!isAdmin)return json({error:"Admin only"},403);if(request.method!=="PUT"&&request.method!=="POST")return json({error:"Method not allowed"},405);
 try{const raw:any=await request.json();const draft=validateHome(raw.home);if(raw.revision!==saved.revision)return json({error:"Le contenu a changé. Rechargez avant d’enregistrer."},409);const next={draft,published:request.method==="POST"?draft:saved.published,revision:saved.revision+1};let result;if(row)result=await env.DB.prepare("UPDATE site_settings SET value=?,updated_at=? WHERE key=? AND value=?").bind(JSON.stringify(next),new Date().toISOString(),key,row.value).run();else result=await env.DB.prepare("INSERT OR IGNORE INTO site_settings(key,value,updated_at) VALUES(?,?,?)").bind(key,JSON.stringify(next),new Date().toISOString()).run();if(!result.meta.changes)return json({error:"Le contenu a changé. Rechargez avant d’enregistrer."},409);return json({ok:true,revision:next.revision});}catch(e){return json({error:(e as Error).message},400);}
}
