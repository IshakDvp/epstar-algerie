import {fitoutDefaults,type FitoutContent} from "../app/fitout-content";
import {safeContentUrl} from "./home-content";
export function validateFitout(raw:unknown):FitoutContent{
 if(!raw||typeof raw!=="object"||JSON.stringify(raw).length>250000)throw Error("Contenu invalide ou trop volumineux.");
 function shape(base:any,value:any,path:string):any{
  if(typeof base==="string"){if(typeof value!=="string"||value.length>20000)throw Error("Texte invalide : "+path);if((path.startsWith("images.")||path.startsWith("links."))&&!safeContentUrl(value,path.startsWith("links.")))throw Error("Lien ou image invalide : "+path);return value;}
  if(Array.isArray(base)){if(!Array.isArray(value)||value.length!==base.length)throw Error("Structure invalide : "+path);return base.map((v,i)=>shape(v,value[i],path+"."+i));}
  return Object.fromEntries(Object.entries(base).map(([k,v])=>[k,shape(v,value?.[k],path?path+"."+k:k)]));
 }
 return shape(fitoutDefaults,raw,"");
}
type Store={DB:D1Database};const json=(d:unknown,status=200)=>new Response(JSON.stringify(d),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
export async function fitoutContent(request:Request,env:Store,isAdmin=false){const key="cms-content:fitout";const row=await env.DB.prepare("SELECT value FROM site_settings WHERE key=?").bind(key).first<{value:string}>();const saved=row?JSON.parse(row.value):{draft:fitoutDefaults,published:fitoutDefaults,revision:0};
 if(request.method==="GET")return isAdmin?json(saved):json({fitout:saved.published});
 if(!isAdmin)return json({error:"Admin only"},403);if(request.method!=="PUT"&&request.method!=="POST")return json({error:"Method not allowed"},405);
 try{const raw:any=await request.json();const draft=validateFitout(raw.fitout);if(raw.revision!==saved.revision)return json({error:"Le contenu a changé. Rechargez avant d’enregistrer."},409);const next={draft,published:request.method==="POST"?draft:saved.published,revision:saved.revision+1};let result;if(row)result=await env.DB.prepare("UPDATE site_settings SET value=?,updated_at=? WHERE key=? AND value=?").bind(JSON.stringify(next),new Date().toISOString(),key,row.value).run();else result=await env.DB.prepare("INSERT OR IGNORE INTO site_settings(key,value,updated_at) VALUES(?,?,?)").bind(key,JSON.stringify(next),new Date().toISOString()).run();if(!result.meta.changes)return json({error:"Le contenu a changé. Rechargez avant d’enregistrer."},409);return json({ok:true,revision:next.revision});}catch(e){return json({error:(e as Error).message},400);}
}
