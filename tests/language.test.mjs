import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import {readFileSync,readdirSync} from 'node:fs';import {sourceURL} from './load-source.mjs';
const {themeBootstrap}=await import(sourceURL('app/theme-bootstrap.ts'));
test('pre-paint language migration validates choices and sets direction',()=>{
 for(const [saved,initial,expected,blocked] of [['ar','fr','ar',false],['en','ar','en',false],['fr','ar','fr',false],['invalid','ar','ar',false],[null,'en','en',true]]){
  const html={lang:initial,dataset:{theme:'dark'},style:{},setAttribute(k){this[k]=true}};const document={documentElement:html,cookie:'epstar-theme=dark'};
  vm.runInNewContext(themeBootstrap,{document,location:{pathname:'/offers'},localStorage:{getItem(k){if(blocked)throw Error();return k==='epstar-language'?saved:'dark';}},matchMedia:()=>({matches:false})});
  assert.equal(html.lang,expected);assert.equal(html.dir,expected==='ar'?'rtl':'ltr');assert.equal(!!html['data-theme-pending'],expected!==initial);
 }
});
test('all public language owners use shared context without late storage effects',()=>{
 for(const f of readdirSync('app',{recursive:true}).filter(x=>x.endsWith('.tsx')&&!x.startsWith('admin/')&&x!=='layout.tsx'&&x!=='components/theme-provider.tsx')){
  const s=readFileSync('app/'+f,'utf8');assert.doesNotMatch(s,/epstar-language|documentElement\.(?:lang|dir)\s*=/,f);
 }
});
test('first HTML renders selected language and direction for all public route families',async()=>{
 const {default:worker}=await import('../dist/server/index.js');
 const DB={prepare(){return {bind(){return this},async first(){return null},async all(){return {results:[]}}}}};
 for(const lang of ['ar','en','fr'])for(const path of ['/','/offers','/start-project','/services/pharmacies','/catalogue','/projects','/about','/quote','/pages/test']){
  const response=await worker.fetch(new Request('http://localhost'+path,{headers:{accept:'text/html',cookie:`epstar-language=${lang}; epstar-theme=dark`}}),{DB,ASSETS:{fetch:async()=>new Response('',{status:404})}},{waitUntil(){},passThroughOnException(){}});
  const html=await response.text();assert.equal(response.status,200,path);assert.match(html,new RegExp(`<html[^>]*lang="${lang}"[^>]*dir="${lang==='ar'?'rtl':'ltr'}"`),path);assert.match(html,/<main[^>]*\bdark\b/,path);
  if(path==='/offers')assert.match(html,new RegExp('<h1>'+(lang==='ar'?'عروضنا':lang==='en'?'Our offers':'Nos offres')+'</h1>'));
 }
});
