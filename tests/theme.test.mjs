import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import {readFileSync,readdirSync} from 'node:fs';import {sourceURL} from './load-source.mjs';
const {themeBootstrap}=await import(sourceURL('app/theme-bootstrap.ts'));
test('pre-paint bootstrap migrates dark, respects explicit light, handles blocked storage',()=>{
 for(const [saved,system,expected,blocked] of [['dark',false,'dark',false],['light',true,'light',false],[null,true,'dark',false],[null,false,'light',true]]){
  const html={dataset:{theme:'light'},style:{},setAttribute(k){this[k]=true}};const document={documentElement:html,cookie:''};
  vm.runInNewContext(themeBootstrap,{document,location:{pathname:'/start-project'},localStorage:{getItem(){if(blocked)throw Error();return saved;}},matchMedia:()=>({matches:system})});
  assert.equal(html.dataset.theme,expected);assert.equal(html.style.colorScheme,expected);assert.match(document.cookie,new RegExp('epstar-theme='+expected));
 }
});
test('public pages no longer independently load or overwrite theme',()=>{
 for(const f of readdirSync('app',{recursive:true}).filter(x=>x.endsWith('.tsx')&&!x.startsWith('admin/')&&x!=='layout.tsx'&&x!=='components/theme-provider.tsx')){
  const s=readFileSync('app/'+f,'utf8');assert.doesNotMatch(s,/epstar-theme|dataset\.theme\s*=/,f);
 }
});
test('dark cookie renders dark HTML and page classes before client code on all page families',async()=>{
 const {default:worker}=await import('../dist/server/index.js');
 for(const path of ['/','/start-project','/services/pharmacies','/catalogue','/projects','/about','/quote','/offers','/pages/test']){
  const response=await worker.fetch(new Request('http://localhost'+path,{headers:{accept:'text/html',cookie:'epstar-theme=dark'}}),{ASSETS:{fetch:async()=>new Response('',{status:404})}},{waitUntil(){},passThroughOnException(){}});
  const html=await response.text();assert.equal(response.status,200,path);assert.match(html,/<html[^>]*data-theme="dark"/,path);assert.match(html,/<main[^>]*class="[^"]*\bdark\b/,path);
 }
});
