import test from 'node:test';
import assert from 'node:assert/strict';
import {sourceURL} from './load-source.mjs';
const {builtinPages}=await import(sourceURL('app/page-registry.ts'));
test('first HTML contains saved navigation, with concurrent request isolation',async()=>{
 const {default:worker}=await import('../dist/server/index.js');
 const render=async(label)=>{
  const pages=builtinPages.map(p=>p.builtinId==='about'?{...p,title:{fr:label,ar:label,en:label},showInHeader:true}:p);
  const DB={prepare(sql){let values=[];return {bind(...v){values=v;return this;},async first(){return sql.includes('key=?')?{value:'true'}:null;},async all(){return {results:values[0]==='cms:pages:%'?pages.map(p=>({value:JSON.stringify(p)})):[]};}};}};
  const response=await worker.fetch(new Request('http://localhost/services/chambres',{headers:{accept:'text/html'}}),{DB,ASSETS:{fetch:async()=>new Response('',{status:404})}},{waitUntil(){},passThroughOnException(){}});
  assert.equal(response.status,200);return response.text();
 };
 const [a,b]=await Promise.all([render('FIRST_SAVED_MENU'),render('SECOND_SAVED_MENU')]);
 assert.match(a,/>FIRST_SAVED_MENU<\/span>/);assert.doesNotMatch(a,/SECOND_SAVED_MENU/);
 assert.match(b,/>SECOND_SAVED_MENU<\/span>/);assert.doesNotMatch(b,/FIRST_SAVED_MENU/);
});
test('client content hook uses server provider, not a late replacement fetch',async()=>{
 const {readFileSync}=await import('node:fs');
 const hook=readFileSync('app/components/use-content.ts','utf8');
 assert.match(hook,/useContext\(ContentContext\)/);assert.doesNotMatch(hook,/fetch\(|useEffect/);
});
