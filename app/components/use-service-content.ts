"use client";
import {useEffect,useState} from "react";
import {serviceDefaults,type ServiceContent,type ServiceKey} from "../service-content";
export function useServiceContent(key:ServiceKey){
 const [services,setServices]=useState<Record<ServiceKey,ServiceContent>>(serviceDefaults),[preview,setPreview]=useState(false),[previewError,setPreviewError]=useState(false);
 useEffect(()=>{let live=true;setServices(serviceDefaults);setPreview(false);setPreviewError(false);const draft=new URLSearchParams(location.search).get("preview")==="service";
 (async()=>{let published=serviceDefaults;try{const r=await fetch("/api/content/services",{cache:"no-store"});if(!r.ok)throw Error();published=(await r.json()).services;if(live)setServices(published);}catch{}
 if(draft){try{const r=await fetch("/api/admin/content/services/"+key,{cache:"no-store"});if(!r.ok)throw Error();const d=await r.json();if(live){setServices({...published,[key]:d.draft});setPreview(true);}}catch{if(live)setPreviewError(true);}}})();return()=>{live=false;};
 },[key]);return {services,preview,previewError};
}
