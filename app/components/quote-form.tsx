"use client";

import { FormEvent, useState, useEffect, useId } from "react";

import {catalog} from "../catalogue/data";
import {useQuoteCart} from "./use-quote-cart";

type Lang="fr"|"ar"|"en";

const labels={
  fr:{name:"Nom complet",phone:"Téléphone",sector:"Type de projet",location:"Wilaya / Ville",budget:"Budget estimatif",message:"Décrivez votre besoin",choose:"Sélectionner",sectors:["Pharmacies","Bureaux","Commerces","Chambres"],budgets:["À définir","Moins de 500 000 DA","500 000 – 1 500 000 DA","1 500 000 – 3 000 000 DA","Plus de 3 000 000 DA"],whatsapp:"Envoyer à EPSTAR sur WhatsApp",required:"Veuillez compléter les champs obligatoires.",ready:"Votre demande est prête à être envoyée à EPSTAR."},
  ar:{name:"الاسم الكامل",phone:"رقم الهاتف",sector:"نوع المشروع",location:"الولاية / المدينة",budget:"الميزانية التقديرية",message:"صف لنا احتياجاتك",choose:"اختر",sectors:["الصيدليات","المكاتب","المحلات","غرف النوم"],budgets:["تحدد لاحقًا","أقل من 500,000 دج","500,000 – 1,500,000 دج","1,500,000 – 3,000,000 دج","أكثر من 3,000,000 دج"],whatsapp:"إرسال إلى EPSTAR عبر واتساب",required:"يرجى إكمال الحقول المطلوبة.",ready:"طلبك جاهز للإرسال مباشرة إلى EPSTAR."},
  en:{name:"Full name",phone:"Phone",sector:"Project type",location:"Province / City",budget:"Estimated budget",message:"Describe your requirements",choose:"Select",sectors:["Pharmacies","Offices","Retail","Bedrooms"],budgets:["To be defined","Under DZD 500,000","DZD 500,000 – 1,500,000","DZD 1,500,000 – 3,000,000","Above DZD 3,000,000"],whatsapp:"Send to EPSTAR on WhatsApp",required:"Please complete the required fields.",ready:"Your request is ready to send directly to EPSTAR."}
};

export default function QuoteForm({lang,defaultSector=""}:{lang:Lang,defaultSector?:string}){
  const t=labels[lang];
  const formId=useId();
  const {cart,setCart}=useQuoteCart();
  const selected=catalog.filter(p=>cart.includes(p.id));
  const selectionTitle=lang==="ar"?"المنتجات المختارة":lang==="fr"?"Produits sélectionnés":"Selected products";
  const removeLabel=lang==="ar"?"حذف":lang==="fr"?"Retirer":"Remove";
  const sectorIndex=["pharmacies","bureaux","commerces","chambres"].indexOf(defaultSector);
  const [notice,setNotice]=useState("");
  const [payload,setPayload]=useState("");
  useEffect(()=>{setPayload("");setNotice("")},[lang,cart.join("|")]);
  function prepare(e:FormEvent<HTMLFormElement>){
    e.preventDefault();const fd=new FormData(e.currentTarget);
    const name=String(fd.get("name")||"").trim(),phone=String(fd.get("phone")||"").trim(),sector=t.sectors[Number(fd.get("sector"))]||"",location=String(fd.get("location")||"").trim(),budget=fd.get("budget")===""?"":t.budgets[Number(fd.get("budget"))]||"",message=String(fd.get("message")||"");
    if(!name||!phone||!sector||!location){setNotice(t.required);setPayload("");return}
    let body=lang==="ar"?`طلب عرض سعر جديد — EPSTAR\n\nالاسم: ${name}\nالهاتف: ${phone}\nالمشروع: ${sector}\nالموقع: ${location}\nالميزانية: ${budget||"غير محددة"}\nالتفاصيل: ${message||"—"}`:`New quote request — EPSTAR\n\nName: ${name}\nPhone: ${phone}\nProject: ${sector}\nLocation: ${location}\nBudget: ${budget||"Not specified"}\nDetails: ${message||"—"}`;
    if(lang==="fr")body=`Demande de devis — EPSTAR\n\nNom: ${name}\nTéléphone: ${phone}\nProjet: ${sector}\nLieu: ${location}\nBudget: ${budget||"À définir"}\nDétails: ${message||"—"}`;
    if(selected.length)body+="\n\n"+selectionTitle+":\n"+selected.map(p=>"- "+p.name[lang]+" ["+p.id.toUpperCase()+"]").join("\n");
    setPayload(body);setNotice(t.ready);
  }
  return <form className="smart-quote" onSubmit={prepare} onChange={()=>{setPayload("");setNotice("")}}>
    {selected.length>0&&<section className="quote-selection"><h3>{selectionTitle} ({selected.length})</h3>{selected.map(p=><div key={p.id}><span>{p.name[lang]} <small>{p.id.toUpperCase()}</small></span><button type="button" onClick={()=>setCart(c=>c.filter(id=>id!==p.id))}>{removeLabel}</button></div>)}</section>}
    {!selected.length&&<div className="quote-empty"><h3>{lang==="ar"?"لم تختر منتجات بعد":lang==="fr"?"Aucun produit sélectionné":"No products selected yet"}</h3><p>{lang==="ar"?"تصفح المنتجات لإضافتها، أو أكمل النموذج أدناه لطلب تجهيز مساحة كاملة.":lang==="fr"?"Ajoutez des produits ou remplissez le formulaire pour un agencement complet.":"Browse products to add them, or complete the form below for a full fit-out."}</p><a href="/catalogue">{lang==="ar"?"تصفح المنتجات":lang==="fr"?"Parcourir les produits":"Browse products"}</a></div>}
    <p className="quote-guidance">{lang==="ar"?"الحقول بعلامة * مطلوبة. تجهيز الطلب يعرض الرسالة ولا يرسلها تلقائيًا.":lang==="fr"?"Les champs * sont obligatoires. Préparer la demande affiche le message sans l’envoyer.":"Fields marked * are required. Preparing your request displays the message without sending it."}</p>
    <div className="field"><label htmlFor={formId+"-name"}>{t.name} *</label><input id={formId+"-name"} name="name" autoComplete="name" required/></div>
    <div className="field"><label htmlFor={formId+"-phone"}>{t.phone} *</label><input id={formId+"-phone"} name="phone" type="tel" autoComplete="tel" required/></div>
    <div className="field"><label htmlFor={formId+"-sector"}>{t.sector} *</label><select id={formId+"-sector"} name="sector" defaultValue={sectorIndex>=0?String(sectorIndex):""} required><option value="" disabled>{t.choose}</option>{t.sectors.map((x,i)=><option value={i} key={i}>{x}</option>)}</select></div>
    <div className="field"><label htmlFor={formId+"-location"}>{t.location} *</label><input id={formId+"-location"} name="location" autoComplete="address-level1" required/></div>
    <div className="field full"><label htmlFor={formId+"-budget"}>{t.budget}</label><select id={formId+"-budget"} name="budget" defaultValue=""><option value="" disabled>{t.choose}</option>{t.budgets.map((x,i)=><option value={i} key={i}>{x}</option>)}</select></div>
    <div className="field full"><label htmlFor={formId+"-message"}>{t.message}</label><textarea id={formId+"-message"} name="message" rows={3}/></div>
    {!payload?<button className="prepare-btn" type="submit">{lang==="ar"?"تجهيز الطلب":lang==="fr"?"Préparer la demande":"Prepare request"}<span>→</span></button>:<div className="send-options"><p className="quote-message-preview">{payload}</p><p className="quote-guidance">{lang==="ar"?"راجع الرسالة ثم أرسلها مباشرة إلى EPSTAR عبر واتساب.":lang==="fr"?"Vérifiez le message, puis envoyez-le directement à EPSTAR sur WhatsApp.":"Review the message, then send it directly to EPSTAR on WhatsApp."}</p><a className="whatsapp-btn" href={`https://wa.me/213551984778?text=${encodeURIComponent(payload)}`} target="_blank" rel="noreferrer">{t.whatsapp}<span>↗</span></a></div>}
    {notice&&<p className={`form-notice ${payload?"success":"error"}`} role="status">{notice}</p>}
  </form>
}
