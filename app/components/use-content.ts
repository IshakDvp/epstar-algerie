"use client";
import {useEffect,useState} from "react";
import {defaultContact,type ContactInfo,type ContentItem} from "../content-model";
import {builtinPages} from "../page-registry";
export function useContent(){const [data,setData]=useState<{contact:ContactInfo;offers:ContentItem[];pages:ContentItem[];loaded:boolean}>({contact:defaultContact,offers:[],pages:builtinPages,loaded:false});useEffect(()=>{let live=true;fetch("/api/content",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(d=>{if(live)setData({...d,loaded:true});}).catch(()=>{if(live)setData(d=>({...d,loaded:true}));});return()=>{live=false;};},[]);return data;}
