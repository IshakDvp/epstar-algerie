import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {sourceURL} from './load-source.mjs';
import vm from 'node:vm';
const {homeDefaults}=await import(sourceURL('app/home-content.ts'));
test('populated home first HTML contains published layout and products before solutions, never draft',async()=>{
 const {default:worker}=await import('../dist/server/index.js');
 const published=structuredClone(homeDefaults);published.copy.ar.overline='PUBLISHED_HOME_SNAPSHOT';
 const draft=structuredClone(published);draft.copy.ar.overline='PRIVATE_HOME_DRAFT';
 const DB={prepare(sql){let v=[];return {bind(...x){v=x;return this},async first(){return v[0]==='cms-content:home'?{value:JSON.stringify({published,draft,revision:1})}:null},async all(){
  if(sql.includes('FROM products LEFT'))return {results:[{id:'snapshot-product',slug:'snapshot-product',reference:'SNAP',nameFr:'Snapshot product',nameAr:'منتج اختبار اللقطة',nameEn:'Snapshot product',isFeatured:1}]};
  if(sql.includes('FROM client_logos'))return {results:[{id:'snapshot-logo',name:'SNAPSHOT CLIENT'}]};
  return {results:[]};
 }}}};
 const r=await worker.fetch(new Request('http://localhost/#services',{headers:{accept:'text/html',cookie:'epstar-language=ar; epstar-theme=dark'}}),{DB,ASSETS:{fetch:async()=>new Response('',{status:404})}},{waitUntil(){},passThroughOnException(){}});
 const html=await r.text();assert.equal(r.status,200);assert.match(html,/PUBLISHED_HOME_SNAPSHOT/);assert.doesNotMatch(html,/PRIVATE_HOME_DRAFT/);assert.match(html,/منتج اختبار اللقطة/);
 const product=html.indexOf('class="featured-product"'),target=html.indexOf('id="services"');assert.ok(product>0&&target>product,'product section must already exist before native target');
});
test('initial hash is deferred only on home so native scrolling cannot race hydration',async()=>{
 const {homeAnchorBootstrap}=await import(sourceURL('app/home-anchor-bootstrap.ts'));
 for(const [path,hash,expected] of [['/','#services',true],['/start-project','#services',false],['/','#contact',false]]){
  const document={documentElement:{dataset:{}}},calls=[];
  vm.runInNewContext(homeAnchorBootstrap,{document,URL,location:{pathname:path,hash,href:'http://localhost'+path+hash},history:{state:null,replaceState(...args){calls.push(args)}}});
  assert.equal(calls.length,expected?1:0);if(expected){assert.equal(document.documentElement.dataset.epstarAnchor,'services');assert.equal(calls[0][2].hash,'');}
 }
 const hook=readFileSync('app/components/use-initial-home-anchor.ts','utf8');
 assert.equal((hook.match(/\.scrollIntoView\(/g)||[]).length,1);assert.match(hook,/document\.fonts\?\.ready/);assert.match(hook,/document\.readyState/);assert.match(hook,/prefers-reduced-motion/);assert.match(hook,/\},\[\]\)/);
});
test('seeded home skips late public feed replacement, while private preview still fetches',()=>{
 const home=readFileSync('app/page.tsx','utf8'),hook=readFileSync('app/components/use-home-content.ts','utf8');
 assert.ok(home.includes('homeInitial?.products'));assert.ok(home.includes('homeInitial?.logos'));assert.ok(home.includes('homeInitial?.projects'));
 assert.equal((home.match(/if\(homeInitial\)return/g)||[]).length,2);
 assert.ok(hook.includes('if(homeInitial&&!draft)return'));assert.ok(hook.includes('/api/admin/content/home'));
 assert.doesNotMatch(home,/\.scrollIntoView\s*\(/);
});
