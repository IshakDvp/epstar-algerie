"use client";
import {useEffect,useState} from "react";
import {catalog} from "../catalogue/data";
const key="epstar-quote-cart";
export function readCart():string[]{
  if(typeof window==="undefined")return [];
  try{const value=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(value)?[...new Set(value.filter((id):id is string=>typeof id==="string"&&catalog.some(p=>p.id===id)))]:[]}catch{return []}
}
export function useQuoteCart(){
  const [cart,setState]=useState<string[]>([]);
  useEffect(()=>{const sync=()=>setState(readCart());sync();window.addEventListener("storage",sync);window.addEventListener("epstar-cart",sync);return()=>{window.removeEventListener("storage",sync);window.removeEventListener("epstar-cart",sync)}},[]);
  function setCart(update:string[]|((old:string[])=>string[])){
    const next=typeof update==="function"?update(readCart()):update;
    setState(next);try{localStorage.setItem(key,JSON.stringify(next))}catch{}
    window.dispatchEvent(new Event("epstar-cart"));
  }
  return {cart,setCart};
}
