import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import ts from 'typescript';
import {sourceURL} from './load-source.mjs';
const {fitoutDefaults}=await import(sourceURL('app/fitout-content.ts'));
const {fitoutContent,validateFitout}=await import(sourceURL('worker/fitout-content.ts'));
const {adminContent}=await import(sourceURL('worker/content.ts'));
const {adminMessages}=await import(sourceURL('app/admin/messages.ts'));
function store(){const db=new DatabaseSync(':memory:');db.exec(readFileSync('drizzle/0000_unique_rawhide_kid.sql','utf8'));return {db,DB:{prepare(sql){const stmt=db.prepare(sql);let args=[];const q={bind(...v){args=v;return q},async first(){return stmt.get(...args)||null},async run(){return {meta:{changes:Number(stmt.run(...args).changes)}}}};return q}},BUCKET:{}};}
const req=(admin=true,method='GET',data)=>new Request('https://test/api/'+(admin?'admin/':'')+'content/fitout',{method,headers:{'content-type':'application/json'},...(data?{body:JSON.stringify(data)}:{})});
const body=async r=>(await r).json();

test('fitout defaults and four sector destinations are preserved without writes',async()=>{
 const env=store();assert.equal(fitoutDefaults.copy.fr.title,'Démarrer un projet d’aménagement');
 assert.equal(Object.keys(fitoutDefaults.images).length,4);
 assert.deepEqual((await body(fitoutContent(req(false),env))).fitout,fitoutDefaults);
 assert.equal((await body(adminContent(req(),env))).revision,0);
 assert.equal(env.db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n,0);
 const {fitoutSectorKeys}=await import(sourceURL('app/fitout-content.ts'));assert.deepEqual(fitoutSectorKeys,['pharmacies','bureaux','commerces','chambres']);
 const page=readFileSync('app/start-project/page.tsx','utf8');assert.ok(page.includes('href={`/quote?sector=${key}`}'));assert.ok(page.includes('href="/quote"'));
});
test('fitout draft/privacy/publish/revert, languages/media and concurrent revision guards',async()=>{
 const env=store(),edited=structuredClone(fitoutDefaults);edited.copy.fr.title='TEST';edited.copy.ar.sectors[0][0]='اختبار';edited.images.pharmacies='/api/content/media/test';
 assert.equal((await adminContent(req(true,'PUT',{fitout:edited,revision:0}),env)).status,200);
 assert.deepEqual((await body(fitoutContent(req(false),env))).fitout,fitoutDefaults);
 assert.equal((await body(adminContent(req(),env))).draft.copy.fr.title,'TEST');
 assert.equal((await adminContent(req(true,'POST',{fitout:edited,revision:0}),env)).status,409);
 assert.equal((await adminContent(req(true,'POST',{fitout:edited,revision:1}),env)).status,200);
 const live=(await body(fitoutContent(req(false),env))).fitout;assert.deepEqual(live,edited);assert.equal(live.copy.en.title,fitoutDefaults.copy.en.title);
 assert.equal((await adminContent(req(true,'POST',{fitout:fitoutDefaults,revision:2}),env)).status,200);
 assert.deepEqual((await body(fitoutContent(req(false),env))).fitout,fitoutDefaults);
 const results=await Promise.all([adminContent(req(true,'PUT',{fitout:edited,revision:3}),env),adminContent(req(true,'PUT',{fitout:fitoutDefaults,revision:3}),env)]);
 assert.deepEqual(results.map(r=>r.status).sort(),[200,409]);
});
test('fitout validates strings, sector/step shape, media URL and guards writes',async()=>{
 assert.deepEqual(validateFitout(fitoutDefaults),fitoutDefaults);
 for(const bad of ['javascript:alert(1)','//evil.test/image.png']){const v=structuredClone(fitoutDefaults);v.images.pharmacies=bad;assert.throws(()=>validateFitout(v));}
 const v=structuredClone(fitoutDefaults);v.copy.fr.sectors.pop();assert.throws(()=>validateFitout(v));const steps=structuredClone(fitoutDefaults);steps.copy.ar.steps=[];assert.throws(()=>validateFitout(steps));const tooLong=structuredClone(fitoutDefaults);tooLong.copy.en.title='x'.repeat(20001);assert.throws(()=>validateFitout(tooLong));assert.throws(()=>validateFitout({}));
 const env=store();assert.equal((await adminContent(new Request('https://test/api/admin/content/fitout',{method:'PUT',headers:{origin:'https://evil.test'}}),env)).status,403);assert.equal((await fitoutContent(req(false,'PUT',{}),env)).status,403);assert.equal((await adminContent(req(true,'DELETE'),env)).status,405);
 assert.equal(env.db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n,0);
});
test('built Worker fitout endpoint is public/published only; drafts require admin',async()=>{
 const {default:worker}=await import('../dist/server/index.js'),env=store(),context={waitUntil(){},passThroughOnException(){}};
 const r=await worker.fetch(req(false),env,context);assert.equal(r.status,200);const data=await r.json();assert.deepEqual(data.fitout,fitoutDefaults);assert.equal(data.draft,undefined);
 assert.equal((await worker.fetch(req(),env,context)).status,401);
 const editorEnv={DB:{prepare(){return {bind(){return {first:async()=>({id:'editor',role:'editor'})}}}}}};
 assert.equal((await worker.fetch(new Request('https://test/api/admin/content/fitout',{headers:{cookie:'epstar_admin=test-session'}}),editorEnv,context)).status,403);
});
test('fitout editor translated labels, preview and pages wiring are valid',()=>{
 const path='app/admin/fitout-editor.tsx',source=readFileSync(path,'utf8'),ast=ts.createSourceFile(path,source,99,true,ts.ScriptKind.TSX);assert.equal(ast.parseDiagnostics.length,0);
 function visit(n){if(ts.isCallExpression(n)&&n.expression.getText(ast)==='t'&&ts.isStringLiteral(n.arguments[0]))assert.ok(adminMessages[n.arguments[0].text],n.arguments[0].text);ts.forEachChild(n,visit);}visit(ast);
 assert.ok(source.includes('/start-project?preview=fitout'));assert.ok(source.includes('beforeunload'));assert.ok(!source.includes('draft.links'));
 assert.ok(readFileSync('app/admin/content-manager.tsx','utf8').includes('<FitoutEditor'));
});
