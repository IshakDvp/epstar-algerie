import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import ts from 'typescript';
import {sourceURL} from './load-source.mjs';
const {aboutDefaults}=await import(sourceURL('app/about-content.ts'));
const {aboutContent,validateAbout}=await import(sourceURL('worker/about-content.ts'));
const {adminContent}=await import(sourceURL('worker/content.ts'));
const {adminMessages}=await import(sourceURL('app/admin/messages.ts'));
function store(){const db=new DatabaseSync(':memory:');db.exec(readFileSync('drizzle/0000_unique_rawhide_kid.sql','utf8'));return {db,DB:{prepare(sql){const stmt=db.prepare(sql);let args=[];const q={bind(...v){args=v;return q},async first(){return stmt.get(...args)||null},async run(){return {meta:{changes:Number(stmt.run(...args).changes)}}}};return q}},BUCKET:{}};}
const req=(admin=true,method='GET',data)=>new Request('https://test/api/'+(admin?'admin/':'')+'content/about',{method,headers:{'content-type':'application/json'},...(data?{body:JSON.stringify(data)}:{})});
const body=async r=>(await r).json();
test('about defaults preserve current multilingual content; reads never seed database',async()=>{
 const env=store();assert.equal(aboutDefaults.copy.fr.title,'Nous transformons les espaces en outils de réussite.');
 assert.equal(Object.keys(aboutDefaults.images).length,5);
 assert.deepEqual((await body(aboutContent(req(false),env))).about,aboutDefaults);
 assert.equal((await body(adminContent(req(),env))).revision,0);
 assert.equal(env.db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n,0);
});
test('about drafts remain private; publish/revert and stale revisions are safe',async()=>{
 const env=store(),edited=structuredClone(aboutDefaults);edited.copy.fr.title='TEST';edited.copy.ar.stats[0][0]='5';edited.images.hero='/api/content/media/test-image';
 assert.equal((await adminContent(req(true,'PUT',{about:edited,revision:0}),env)).status,200);
 assert.equal((await body(aboutContent(req(false),env))).about.copy.fr.title,aboutDefaults.copy.fr.title);
 assert.equal((await body(adminContent(req(),env))).draft.copy.fr.title,'TEST');
 assert.equal((await adminContent(req(true,'POST',{about:edited,revision:0}),env)).status,409);
 assert.equal((await adminContent(req(true,'POST',{about:edited,revision:1}),env)).status,200);
 const live=(await body(aboutContent(req(false),env))).about;assert.equal(live.copy.fr.title,'TEST');assert.equal(live.copy.en.title,aboutDefaults.copy.en.title);assert.equal(live.copy.ar.stats[0][0],'5');assert.equal(live.images.hero,edited.images.hero);
 assert.equal((await adminContent(req(true,'POST',{about:aboutDefaults,revision:2}),env)).status,200);
 assert.deepEqual((await body(aboutContent(req(false),env))).about,aboutDefaults);
 const writes=await Promise.all([adminContent(req(true,'PUT',{about:edited,revision:3}),env),adminContent(req(true,'PUT',{about:aboutDefaults,revision:3}),env)]);
 assert.deepEqual(writes.map(r=>r.status).sort(),[200,409]);
});
test('about rejects malformed shape, unsafe media/links, unsupported methods and cross-origin writes',async()=>{
 assert.deepEqual(validateAbout(aboutDefaults),aboutDefaults);
 for(const bad of ['javascript:alert(1)','//evil.test/image.png','/bad\\image.png']){const v=structuredClone(aboutDefaults);v.images.hero=bad;assert.throws(()=>validateAbout(v));}
 const v=structuredClone(aboutDefaults);v.links.projects='javascript:alert(1)';assert.throws(()=>validateAbout(v));v.links.projects='/projects';v.copy.fr.stats.pop();assert.throws(()=>validateAbout(v));
 assert.throws(()=>validateAbout({}));const tooLong=structuredClone(aboutDefaults);tooLong.copy.en.title='x'.repeat(20001);assert.throws(()=>validateAbout(tooLong));
 const env=store();assert.equal((await adminContent(new Request('https://test/api/admin/content/about',{method:'PUT',headers:{origin:'https://evil.test'}}),env)).status,403);
 assert.equal((await aboutContent(req(false,'PUT',{}),env)).status,403);
 assert.equal((await adminContent(req(true,'DELETE'),env)).status,405);
 assert.equal(env.db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n,0);
});
test('built Worker protects about drafts from guests/editors and exposes published only',async()=>{
 const {default:worker}=await import('../dist/server/index.js');const env=store(),context={waitUntil(){},passThroughOnException(){}};
 const r=await worker.fetch(req(false),env,context);assert.equal(r.status,200);const data=await r.json();assert.deepEqual(data.about,aboutDefaults);assert.equal(data.draft,undefined);
 assert.equal((await worker.fetch(req(),env,context)).status,401);
 const editorEnv={DB:{prepare(){return {bind(){return {first:async()=>({id:'editor',role:'editor'})}}}}}};
 assert.equal((await worker.fetch(new Request('https://test/api/admin/content/about',{headers:{cookie:'epstar_admin=test-session'}}),editorEnv,context)).status,403);
});
test('about editor is translated, wired to pages, and renders plain text safely',()=>{
 const path='app/admin/about-editor.tsx',source=readFileSync(path,'utf8'),ast=ts.createSourceFile(path,source,99,true,ts.ScriptKind.TSX);
 assert.equal(ast.parseDiagnostics.length,0);
 function visit(n){if(ts.isCallExpression(n)&&n.expression.getText(ast)==='t'&&ts.isStringLiteral(n.arguments[0]))assert.ok(adminMessages[n.arguments[0].text],n.arguments[0].text);ts.forEachChild(n,visit);}visit(ast);
 assert.ok(source.includes('/about?preview=about'));assert.ok(source.includes('beforeunload'));
 const page=readFileSync('app/about/page.tsx','utf8');assert.ok(page.includes('useAboutContent()'));assert.ok(!page.includes('dangerouslySetInnerHTML'));assert.ok(page.includes('about.images.team'));
 assert.ok(readFileSync('app/admin/content-manager.tsx','utf8').includes('<AboutEditor'));
});
