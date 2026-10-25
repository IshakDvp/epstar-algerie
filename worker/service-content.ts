import {serviceDefaults,serviceKeys,isServiceKey,type ServiceKey,type ServiceContent} from "../app/service-content";
import {safeContentUrl} from "./home-content";
export function validateService(raw:unknown,id:ServiceKey):ServiceContent{
 if(!raw||typeof raw!=="object"||JSON.stringify(raw).length>250000)throw Error("Contenu invalide ou trop volumineux.");
 function shape(base:any,value:any,path:string):any{
  if(typeof base==="string"){if(typeof value!=="string"||value.length>20000)throw Error("Texte invalide : "+path);if((path.startsWith("images.")||path.startsWith("links."))&&!safeContentUrl(value,path.startsWith("links.")))throw Error("Lien ou image invalide : "+path);return value;}
  if(Array.isArray(base)){if(!Array.isArray(value)||value.length!==base.length)throw Error("Structure invalide : "+path);return base.map((v,i)=>shape(v,value[i],path+"."+i));}
  return Object.fromEntries(Object.entries(base).map(([k,v])=>[k,shape(v,value?.[k],path?path+"."+k:k)]));
 }
 return shape(serviceDefaults[id],raw,"");
}
type Store={DB:D1Database};const json=(d:unknown,status=200)=>new Response(JSON.stringify(d),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
export async function serviceContent(request:Request,env:Store,id:unknown,isAdmin=false){if(!isServiceKey(id))return json({error:"Not found"},404);const defaults=serviceDefaults[id],key="cms-content:service:"+id;const row=await env.DB.prepare("SELECT value FROM site_settings WHERE key=?").bind(key).first<{value:string}>();const saved=row?JSON.parse(row.value):{draft:defaults,published:defaults,revision:0};
 if(request.method==="GET")return isAdmin?json(saved):json({service:saved.published});
 if(!isAdmin)return json({error:"Admin only"},403);if(request.method!=="PUT"&&request.method!=="POST")return json({error:"Method not allowed"},405);
 try{const raw:any=await request.json();const draft=validateService(raw.service,id);if(raw.revision!==saved.revision)return json({error:"Le contenu a changé. Rechargez avant d’enregistrer."},409);const next={draft,published:request.method==="POST"?draft:saved.published,revision:saved.revision+1};let result;if(row)result=await env.DB.prepare("UPDATE site_settings SET value=?,updated_at=? WHERE key=? AND value=?").bind(JSON.stringify(next),new Date().toISOString(),key,row.value).run();else result=await env.DB.prepare("INSERT OR IGNORE INTO site_settings(key,value,updated_at) VALUES(?,?,?)").bind(key,JSON.stringify(next),new Date().toISOString()).run();if(!result.meta.changes)return json({error:"Le contenu a changé. Rechargez avant d’enregistrer."},409);return json({ok:true,revision:next.revision});}catch(e){return json({error:(e as Error).message},400);}
}

export async function publicServices(env:Store){const entries=await Promise.all(serviceKeys.map(async id=>{const row=await env.DB.prepare("SELECT value FROM site_settings WHERE key=?").bind("cms-content:service:"+id).first<{value:string}>();return [id,row?JSON.parse(row.value).published:serviceDefaults[id]];}));return json({services:Object.fromEntries(entries)});}
