"use client";
import {useSiteTheme,useSiteLanguage} from "../components/theme-provider";
import {useEffect,useState} from "react";
import type {Lang} from "../catalogue/data";
import {useFitoutContent} from "../components/use-fitout-content";
import {fitoutSectorKeys} from "../fitout-content";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
export default function StartProject(){
 const [lang,setLang]=useSiteLanguage(),[theme,setTheme] = useSiteTheme();
 const {fitout,preview,previewError}=useFitoutContent(),t=fitout.copy[lang];
 return <main className={`start-page ${theme==="dark"?"dark":""}`} dir={lang==="ar"?"rtl":"ltr"}><SiteHeader lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>{(preview||previewError)&&<p className="about-preview-notice" role="status">{previewError?({fr:"Aperçu privé indisponible. Connectez-vous au tableau de bord.",ar:"المعاينة الخاصة غير متاحة. سجّل الدخول إلى الداشبورد.",en:"Private preview unavailable. Sign in to the dashboard."})[lang]:({fr:"Aperçu privé du brouillon — non publié.",ar:"معاينة خاصة للمسودة — غير منشورة.",en:"Private draft preview — not published."})[lang]}</p>}<section className="start-hero"><small>EPSTAR</small><h1>{t.title}</h1><h2>{t.heading}</h2><p>{t.intro}</p></section><ol className="journey-flow start-flow" aria-label={t.stepsLabel}>{t.steps.map((step,i)=><li key={step} className={i===0?"active":""}>{i+1}. {step}</li>)}</ol><section className="start-grid">{fitoutSectorKeys.map((key,i)=><a key={key} href={`/quote?sector=${key}`}><span>0{i+1}</span><img src={fitout.images[key]} alt=""/><div><h3>{t.sectors[i][0]}</h3><p>{t.sectors[i][1]}</p><b>{t.startButton}</b></div></a>)}</section><div className="start-general"><p>{t.general}</p><a href="/quote">{t.generalButton}</a></div><SiteFooter lang={lang}/></main>
}
