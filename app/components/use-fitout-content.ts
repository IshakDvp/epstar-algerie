"use client";
import {useEffect,useState} from "react";
import {fitoutDefaults,type FitoutContent} from "../fitout-content";
export function useFitoutContent(){const [fitout,setFitout]=useState<FitoutContent>(fitoutDefaults),[preview,setPreview]=useState(false),[previewError,setPreviewError]=useState(false);useEffect(()=>{let live=true;const draft=new URLSearchParams(location.search).get("preview")==="fitout";fetch(draft?"/api/admin/content/fitout":"/api/content/fitout",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(d=>{if(live){setFitout(draft?d.draft:d.fitout);setPreview(draft);}}).catch(()=>{if(live&&draft)setPreviewError(true);});return()=>{live=false;};},[]);return {fitout,preview,previewError};}
