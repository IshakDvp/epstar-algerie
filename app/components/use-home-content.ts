"use client";
import {useEffect,useState} from "react";
import {homeDefaults,type HomeContent} from "../home-content";
import {useContent} from "./use-content";
export function useHomeContent(){const {homeInitial}=useContent();const [home,setHome]=useState<HomeContent>(homeInitial?.home||homeDefaults),[preview,setPreview]=useState(false),[previewError,setPreviewError]=useState(false);useEffect(()=>{let live=true;const draft=new URLSearchParams(location.search).get("preview")==="home";if(homeInitial&&!draft)return;const url=draft?"/api/admin/content/home":"/api/content/home";fetch(url,{cache:"no-store"}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(d=>{if(live){setHome(draft?d.draft:d.home);setPreview(draft);}}).catch(()=>{if(live&&draft)setPreviewError(true);});return()=>{live=false;};},[homeInitial]);return {home,preview,previewError};}
