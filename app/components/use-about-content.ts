"use client";
import {useEffect,useState} from "react";
import {aboutDefaults,type AboutContent} from "../about-content";
export function useAboutContent(){const [about,setAbout]=useState<AboutContent>(aboutDefaults),[preview,setPreview]=useState(false),[previewError,setPreviewError]=useState(false);useEffect(()=>{let live=true;const draft=new URLSearchParams(location.search).get("preview")==="about";fetch(draft?"/api/admin/content/about":"/api/content/about",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(d=>{if(live){setAbout(draft?d.draft:d.about);setPreview(draft);}}).catch(()=>{if(live&&draft)setPreviewError(true);});return()=>{live=false;};},[]);return {about,preview,previewError};}
