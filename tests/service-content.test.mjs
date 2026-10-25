import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import ts from 'typescript';
import {sourceURL} from './load-source.mjs';
const {serviceDefaults,serviceKeys,serviceKeyForBuiltin,isServiceKey}=await import(sourceURL('app/service-content.ts'));
const {serviceContent,validateService,publicServices}=await import(sourceURL('worker/service-content.ts'));
const {adminContent}=await import(sourceURL('worker/content.ts'));
const {adminMessages}=await import(sourceURL('app/admin/messages.ts'));
function store(){const db=new DatabaseSync(':memory:');db.exec(readFileSync('drizzle/0000_unique_rawhide_kid.sql','utf8'));return {db,DB:{prepare(sql){const stmt=db.prepare(sql);let args=[];const q={bind(...v){args=v;return q},async first(){return stmt.get(...args)||null},async run(){return {meta:{changes:Number(stmt.run(...args).changes)}}}};return q}},BUCKET:{}};}
const req=(id='pharmacies',method='GET',data)=>new Request('https://test/api/admin/content/services/'+id,{method,headers:{'content-type':'application/json'},...(data?{body:JSON.stringify(data)}:{})});
const body=async r=>(await r).json();

test('all four service defaults retain original copy/images and reads do not seed',async()=>{
 const env=store();assert.equal(serviceDefaults.pharmacies.copy.fr.headline,'Une pharmacie fluide, rassurante et performante.');
 assert.equal(serviceDefaults.bureaux.copy.ar.headline,'مساحات عمل تعكس الثقة والاحتراف.');
 assert.deepEqual(serviceKeys,['pharmacies','bureaux','commerces','chambres']);
 for(const id of serviceKeys){assert.equal(serviceKeyForBuiltin('service-'+id),id);assert.equal(isServiceKey(id),true);assert.equal((await body(adminContent(req(id),env))).revision,0);assert.equal(serviceDefaults[id].copy.en.list.length,6);assert.equal(serviceDefaults[id].copy.ar.steps.length,4);}
 assert.equal(serviceKeyForBuiltin('home'),null);assert.equal(isServiceKey('__proto__'),false);
 assert.deepEqual((await body(publicServices(env))).services,serviceDefaults);
 assert.equal(env.db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n,0);
});
test('each service supports private multilingual/media drafts, publish and revert independently',async()=>{
 const env=store();
 for(const id of serviceKeys){
  const edited=structuredClone(serviceDefaults[id]);edited.copy.fr.headline='TEST '+id;edited.copy.ar.title='اختبار';edited.images.photo='/api/content/media/test';
  assert.equal((await adminContent(req(id,'PUT',{service:edited,revision:0}),env)).status,200);
  assert.equal((await body(adminContent(req(id),env))).draft.copy.fr.headline,'TEST '+id);
  assert.deepEqual((await body(publicServices(env))).services,serviceDefaults);
  assert.equal((await adminContent(req(id,'POST',{service:edited,revision:0}),env)).status,409);
  assert.equal((await adminContent(req(id,'POST',{service:edited,revision:1}),env)).status,200);
  const live=(await body(publicServices(env))).services;assert.deepEqual(live[id],edited);assert.equal(live[id].copy.en.headline,serviceDefaults[id].copy.en.headline);
  for(const other of serviceKeys.filter(k=>k!==id))assert.deepEqual(live[other],serviceDefaults[other]);
  assert.equal((await adminContent(req(id,'POST',{service:serviceDefaults[id],revision:2}),env)).status,200);
 }
 assert.deepEqual((await body(publicServices(env))).services,serviceDefaults);
});
test('service concurrent saves use CAS and published titles never reveal other drafts',async()=>{
 const env=store(),a=structuredClone(serviceDefaults.pharmacies),b=structuredClone(serviceDefaults.bureaux);a.copy.fr.title='PUBLISHED PHARMACY';b.copy.fr.title='PRIVATE OFFICE';
 await adminContent(req('pharmacies','POST',{service:a,revision:0}),env);
 await adminContent(req('bureaux','PUT',{service:b,revision:0}),env);
 const live=(await body(publicServices(env))).services;assert.equal(live.pharmacies.copy.fr.title,'PUBLISHED PHARMACY');assert.equal(live.bureaux.copy.fr.title,serviceDefaults.bureaux.copy.fr.title);
 const results=await Promise.all([adminContent(req('bureaux','PUT',{service:b,revision:1}),env),adminContent(req('bureaux','PUT',{service:serviceDefaults.bureaux,revision:1}),env)]);assert.deepEqual(results.map(r=>r.status).sort(),[200,409]);
});
test('service inputs reject bad URLs/shapes/size and unknown IDs cannot write',async()=>{
 const env=store();for(const id of serviceKeys){
  assert.deepEqual(validateService(serviceDefaults[id],id),serviceDefaults[id]);
  for(const bad of ['javascript:alert(1)','//evil.test/x','/bad\\image']){const v=structuredClone(serviceDefaults[id]);v.images.model=bad;assert.throws(()=>validateService(v,id));}
  const v=structuredClone(serviceDefaults[id]);v.copy.fr.list.pop();assert.throws(()=>validateService(v,id));
  const steps=structuredClone(serviceDefaults[id]);steps.copy.ar.steps[0]=[];assert.throws(()=>validateService(steps,id));
  const big=structuredClone(serviceDefaults[id]);big.copy.en.text='x'.repeat(20001);assert.throws(()=>validateService(big,id));
 }
 for(const id of ['unknown','__proto__','pharmacies/extra'])assert.equal((await adminContent(req(id,'PUT',{service:serviceDefaults.pharmacies,revision:0}),env)).status,404);
 assert.equal((await adminContent(new Request('https://test/api/admin/content/services/pharmacies',{method:'PUT',headers:{origin:'https://evil.test'}}),env)).status,403);
 assert.equal((await serviceContent(req(),env,'unknown')).status,404);
 assert.equal((await adminContent(req('pharmacies','DELETE'),env)).status,405);
 assert.equal(env.db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n,0);
});
test('built Worker exposes published service feed and guards each service draft',async()=>{
 const {default:worker}=await import('../dist/server/index.js'),env=store(),context={waitUntil(){},passThroughOnException(){}};
 const r=await worker.fetch(new Request('https://test/api/content/services'),env,context);assert.equal(r.status,200);const data=await r.json();assert.deepEqual(data.services,serviceDefaults);assert.equal(data.draft,undefined);
 for(const id of serviceKeys)assert.equal((await worker.fetch(req(id),env,context)).status,401);
 const editorEnv={DB:{prepare(){return {bind(){return {first:async()=>({id:'editor',role:'editor'})}}}}}};
 assert.equal((await worker.fetch(new Request('https://test/api/admin/content/services/chambres',{headers:{cookie:'epstar_admin=test-session'}}),editorEnv,context)).status,403);
});
test('service editor translated fields, private preview wiring, form and crosslinks preserved',()=>{
 const path='app/admin/service-editor.tsx',source=readFileSync(path,'utf8'),ast=ts.createSourceFile(path,source,99,true,ts.ScriptKind.TSX);assert.equal(ast.parseDiagnostics.length,0);
 function visit(n){if(ts.isCallExpression(n)&&n.expression.getText(ast)==='t'&&ts.isStringLiteral(n.arguments[0]))assert.ok(adminMessages[n.arguments[0].text],n.arguments[0].text);ts.forEachChild(n,visit);}visit(ast);
 const labels=JSON.parse(source.match(/const labels:Record<string,string>=(.*);/)[1]);for(const label of Object.values(labels))assert.ok(adminMessages[label],label);
 assert.ok(source.includes('?preview=service'));assert.ok(source.includes('beforeunload'));assert.ok(source.includes('serviceKey'));
 const page=readFileSync('app/services/[slug]/service-detail.tsx','utf8');assert.ok(page.includes('<QuoteForm key={slug} lang={lang} defaultSector={slug}/>'));assert.ok(page.includes('services[x].copy[lang].title'));assert.ok(page.includes('href="#devis"'));assert.ok(!page.includes('dangerouslySetInnerHTML'));assert.ok(page.includes('epstar-language'));
 const hook=readFileSync('app/components/use-service-content.ts','utf8');assert.ok(hook.includes('/api/admin/content/services/'));assert.ok(hook.includes('[key]:d.draft'));
 assert.ok(readFileSync('app/admin/content-manager.tsx','utf8').includes('serviceKeyForBuiltin(i.builtinId)'));
});
test('quote select option identities remain stable when switching language',()=>{const s=readFileSync('app/components/quote-form.tsx','utf8');assert.equal((s.match(/<option value=\{i\} key=\{i\}>/g)||[]).length,3);assert.ok(!s.includes('<option value={i} key={item}>'));});
