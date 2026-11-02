import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {sourceURL} from './load-source.mjs';
const {homeDefaults}=await import(sourceURL('app/home-content.ts'));
const {homeContent,upgradeHomeOrder}=await import(sourceURL('worker/home-content.ts'));
const agreed=['hero','trust','services','products','projects','about','process','clients','testimonial','quote','cta'];
const legacy=['hero','trust','clients','products','about','services','quote','process','projects','testimonial','cta'];
test('agreed default puts solutions/work before quote and editor follows saved order',()=>{
 assert.deepEqual(homeDefaults.sectionOrder,agreed);
 const editor=readFileSync('app/admin/home-editor.tsx','utf8');
 assert.ok(editor.includes('draft.sectionOrder.map((key,i)=><details'));
 assert.ok(editor.includes('{sectionFields(key)}'));
 for(const key of agreed)assert.ok(editor.includes(`case "${key}":`));
 assert.ok(editor.includes('change(["sectionOrder"],[...homeDefaults.sectionOrder])'));
});
test('legacy order projection preserves all content, visibility and custom ordering',()=>{
 const home=structuredClone(homeDefaults);home.sectionOrder=legacy;home.copy.ar.aboutTitle='KEEP';home.hiddenSections=['clients'];
 const before=structuredClone(home),next=upgradeHomeOrder(home);
 assert.deepEqual(next.sectionOrder,agreed);assert.deepEqual(home,before);
 assert.deepEqual({...next,sectionOrder:legacy},before);
 const custom={...home,sectionOrder:[...agreed].reverse()};assert.equal(upgradeHomeOrder(custom),custom);
});
test('saved legacy read is non-mutating; explicit later ordering persists and revisions stay protected',async()=>{
 const db=new DatabaseSync(':memory:');db.exec(readFileSync('drizzle/0000_unique_rawhide_kid.sql','utf8'));
 const old=structuredClone(homeDefaults);old.sectionOrder=legacy;old.copy.fr.aboutTitle='PUBLISHED';
 const draft=structuredClone(old);draft.copy.fr.aboutTitle='PRIVATE DRAFT';draft.hiddenSections=['clients'];
 const raw=JSON.stringify({draft,published:old,revision:8});
 db.prepare('INSERT INTO site_settings(key,value,updated_at) VALUES(?,?,?)').run('cms-content:home',raw,'before');
 const env={DB:{prepare(sql){const stmt=db.prepare(sql);let args=[];const q={bind(...v){args=v;return q},async first(){return stmt.get(...args)||null},async run(){return {meta:{changes:Number(stmt.run(...args).changes)}}}};return q}}};
 const req=(method='GET',body)=>new Request('https://test/api/content/home',{method,...(body?{headers:{'content-type':'application/json'},body:JSON.stringify(body)}:{})});
 const pub=await (await homeContent(req(),env)).json(),admin=await (await homeContent(req(),env,true)).json();
 assert.deepEqual(pub.home.sectionOrder,agreed);assert.equal(pub.home.copy.fr.aboutTitle,'PUBLISHED');
 assert.deepEqual(admin.draft.sectionOrder,agreed);assert.equal(admin.draft.copy.fr.aboutTitle,'PRIVATE DRAFT');
 assert.equal(db.prepare('SELECT value FROM site_settings').get().value,raw);
 // Even explicitly choosing the original order is respected after the version marker is saved.
 admin.draft.sectionOrder=legacy;
 assert.equal((await homeContent(req('PUT',{home:admin.draft,revision:8}),env,true)).status,200);
 const after=await (await homeContent(req(),env,true)).json();assert.deepEqual(after.draft.sectionOrder,legacy);
 assert.deepEqual(after.published.sectionOrder,agreed);assert.equal(after.revision,9);
 assert.equal((await homeContent(req('POST',{home:admin.draft,revision:8}),env,true)).status,409);
 assert.equal((await homeContent(req('POST',{home:admin.draft,revision:9}),env,true)).status,200);
 assert.deepEqual((await (await homeContent(req(),env)).json()).home.sectionOrder,legacy);
 db.close();
});
