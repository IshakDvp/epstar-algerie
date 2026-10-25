"use client";
import {useEffect,useState,type ReactNode} from "react";
import {type FitoutContent} from "../fitout-content";
import {useAdminI18n} from "./i18n";
const labels:Record<string,string>={"title":"Titre","heading":"Question principale","intro":"Introduction","general":"Texte — Plusieurs espaces","generalButton":"Bouton — Étude globale","steps":"Étapes","startButton":"Bouton — Commencer","stepsLabel":"Libellé des étapes","sectors":"Types d’espaces","pharmacies":"Pharmacies","bureaux":"Bureaux","commerces":"Commerces","chambres":"Chambres"};
export default function FitoutEditor({onBack}:{onBack:()=>void}){
 const {lang,t}=useAdminI18n(),[editLang,setEditLang]=useState(lang),[draft,setDraft]=useState<FitoutContent|null>(null),[revision,setRevision]=useState(0),[busy,setBusy]=useState(false),[dirty,setDirty]=useState(false),[notice,setNotice]=useState("");
 async function load(){setBusy(true);try{const r=await fetch("/api/admin/content/fitout",{cache:"no-store"}),d=await r.json();if(!r.ok)throw Error(d.error);setDraft(d.draft);setRevision(d.revision);setDirty(false);setNotice("");}catch(e){setNotice((e as Error).message);}finally{setBusy(false);}}
 useEffect(()=>{load();},[]);
 useEffect(()=>{if(!dirty)return;const warn=(event:BeforeUnloadEvent)=>{event.preventDefault();event.returnValue="";};window.addEventListener("beforeunload",warn);return()=>window.removeEventListener("beforeunload",warn);},[dirty]);
 function change(path:Array<string|number>,value:string){setDraft(previous=>{if(!previous)return previous;const next=structuredClone(previous);let target:any=next;for(const key of path.slice(0,-1))target=target[key];target[path.at(-1)!]=value;return next;});setDirty(true);}
 async function save(publish=false){if(!draft)return;if(publish&&!confirm(t("Publier ces modifications sur le site ?")))return;setBusy(true);try{const r=await fetch("/api/admin/content/fitout",{method:publish?"POST":"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({fitout:draft,revision})}),d=await r.json();if(!r.ok)throw Error(d.error);setRevision(d.revision);setDirty(false);setNotice(publish?"Modifications publiées.":"Brouillon enregistré.");}catch(e){setNotice((e as Error).message);}finally{setBusy(false);}}
 async function upload(key:string,file:File|undefined){if(!file)return;setBusy(true);try{const form=new FormData();form.set("image",file);const r=await fetch("/api/admin/content/media",{method:"POST",body:form}),d=await r.json();if(!r.ok)throw Error(d.error);change(["images",key],d.url);setNotice("Image chargée. Enregistrez le brouillon.");}catch(e){setNotice((e as Error).message);}finally{setBusy(false);}}
 function fields(value:any,path:Array<string|number>,label:string):ReactNode{
  if(typeof value==="string")return <label key={path.join(".")}>{t(label)}<textarea value={value} dir={editLang==="ar"?"rtl":"ltr"} rows={value.length>130?4:2} maxLength={20000} onChange={e=>change(path,e.target.value)}/></label>;
  if(Array.isArray(value))return <fieldset key={path.join(".")}><legend>{t(label)}</legend>{value.map((v,i)=>fields(v,[...path,i],Array.isArray(v)?t(labels[["pharmacies","bureaux","commerces","chambres"][i]]):path[2]==="sectors"?(i===0?"Titre":"Description"):t("Texte")+" "+(i+1)))}</fieldset>;
  return null;
 }
 return <section className="admin-wide cms-manager home-editor">
 <button className="back" disabled={busy} onClick={()=>{if(!dirty||confirm(t("Recharger et abandonner les modifications non enregistrées ?")))onBack();}}>{t("Retour aux pages")}</button>
 <div className="admin-section-head"><div><small>{t("CONTENU DU SITE")}</small><h1>{t("Contenu — Aménagement")}</h1><p>{t("Enregistrez le brouillon avant la prévisualisation. La publication est une action séparée.")}</p></div>
 <label className="home-content-language"><span>{t("Langue des textes à modifier")}</span><select value={editLang} onChange={e=>setEditLang(e.target.value as typeof editLang)}><option value="fr">Français</option><option value="ar">العربية</option><option value="en">English</option></select><small>{t("Ce choix change les textes affichés dans les champs, pas la langue du tableau de bord ni l’ordre des sections.")}</small></label></div>
 {notice&&<p className="cms-notice" role="status">{t(notice)}</p>}
 <div className="home-editor-actions"><button disabled={busy||!draft} onClick={()=>save()}>{t("Enregistrer le brouillon")}</button>{!dirty&&draft&&!busy?<a href="/start-project?preview=fitout" target="_blank" rel="noreferrer">{t("Prévisualiser")}</a>:<span>{t("Enregistrez pour activer la prévisualisation.")}</span>}<button disabled={busy||!draft} onClick={()=>save(true)}>{t("Publier")}</button><button disabled={busy} onClick={()=>{if(!dirty||confirm(t("Recharger et abandonner les modifications non enregistrées ?")))load();}}>{t("Actualiser")}</button></div>
 {!draft?<p>{t("Chargement…")}</p>:<fieldset className="fitout-editor-fields" disabled={busy}><details open><summary>{t("Textes de la page")}</summary>{Object.entries(draft.copy[editLang]).map(([key,value])=>fields(value,["copy",editLang,key],labels[key]||key))}</details>
 <details><summary>{t("Photos de la page")}</summary>{Object.entries(draft.images).map(([key,value])=><label className="home-media" key={key}>{t(labels[key])}<input value={value} dir="ltr" onChange={e=>change(["images",key],e.target.value)}/><input type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>upload(key,e.target.files?.[0])}/>{value&&<img src={value} alt=""/>}</label>)}</details>
 <p>{t("Les destinations des demandes restent fixes pour conserver le bon type de projet.")}</p></fieldset>}
 </section>;
}
