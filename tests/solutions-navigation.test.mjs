import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {sourceURL} from './load-source.mjs';
const {builtinPages,pageHref,initialSolutionsPages,twoPathSolutionsPages,navigationPages,movePage}=await import(sourceURL('app/page-registry.ts'));
const {adminContent,publicContent}=await import(sourceURL('worker/content.ts'));
function store(){const db=new DatabaseSync(':memory:');db.exec(readFileSync('drizzle/0000_unique_rawhide_kid.sql','utf8'));return {db,DB:{prepare(sql){let args=[];const s=db.prepare(sql),q={bind(...v){args=v;return q},async first(){return s.get(...args)||null},async all(){return {results:s.all(...args)}},async run(){return {meta:{changes:Number(s.run(...args).changes)}}}};return q},async batch(stmts){db.exec('BEGIN');try{const r=[];for(const q of stmts)r.push(await q.run());db.exec('COMMIT');return r;}catch(e){db.exec('ROLLBACK');throw e;}}},BUCKET:{}};}
const req=(path='pages',method='GET',data)=>new Request('https://test/api/admin/content/'+path,{method,headers:{'content-type':'application/json'},...(data?{body:JSON.stringify(data)}:{})});
const body=async r=>(await r).json();
test('v33 projects legacy production layout immediately despite v2 marker, then persists once and preserves later edits',async()=>{
 const env=store();const items=builtinPages.map(p=>({...p,parentId:p.builtinId.startsWith('service-')?'builtin-solutions':null,showInHeader:p.builtinId!=='quote'}));
 seed(env,items);
 env.db.prepare('INSERT INTO site_settings(key,value,updated_at) VALUES(?,?,?)').run('cms-meta:solutions-navigation-v2','true','old');
 for(const p of items)env.db.prepare('UPDATE site_settings SET value=? WHERE key=?').run(JSON.stringify(p,null,2),'cms:pages:'+p.id);
 const before=env.db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n;
 const {default:builtWorker}=await import('../dist/server/index.js');
 const builtResponse=await builtWorker.fetch(new Request('https://test/api/content'),env,{waitUntil(){},passThroughOnException(){}});
 const builtData=await builtResponse.json();
 assert.equal(builtData.navigationVersion,'v33');
 assert.deepEqual(navigationPages(builtData.pages,'header').filter(p=>p.parentId==='builtin-solutions').map(pageHref),['/start-project','/catalogue']);
 const publicResult=await body(publicContent(env));assert.equal(publicResult.navigationVersion,'v33');
 const nav=navigationPages(publicResult.pages,'header');
 assert.deepEqual(nav.filter(p=>!p.parentId).map(p=>p.builtinId),['home','solutions','offers','projects','about']);
 assert.deepEqual(nav.filter(p=>p.parentId==='builtin-solutions').map(pageHref),['/start-project','/catalogue']);
 assert.equal(env.db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n,before);
 await adminContent(req('pages/bootstrap','POST'),env);
 const persisted=JSON.parse(env.db.prepare('SELECT value FROM site_settings WHERE key=?').get('cms:pages:builtin-catalogue').value);
 assert.equal(persisted.parentId,'builtin-solutions');
 await adminContent(req('pages/'+persisted.id,'PUT',{...persisted,title:{fr:'MY TITLE',ar:'اسمي',en:'My title'},sortOrder:999}),env);
 await adminContent(req('pages/bootstrap','POST'),env);
 assert.equal((await body(publicContent(env))).pages.find(p=>p.id===persisted.id).title.ar,'اسمي');
});
test('explicit menu repair works even with existing marker and formatted JSON, preserves copy and repeats safely',async()=>{
 const env=store();await adminContent(req('pages/bootstrap','POST'),env);
 const items=(await body(adminContent(req(),env))).items;
 for(const p of items){p.parentId=p.builtinId.startsWith('service-')?'builtin-solutions':null;p.showInHeader=true;p.body.ar='KEEP';env.db.prepare('UPDATE site_settings SET value=? WHERE key=?').run(JSON.stringify(p,null,2),'cms:pages:'+p.id);}
 for(let i=0;i<2;i++)assert.equal((await adminContent(req('pages/solutions-navigation','POST'),env)).status,200);
 const after=(await body(adminContent(req(),env))).items;
 assert.deepEqual(navigationPages(after,'header').filter(p=>p.parentId==='builtin-solutions').map(pageHref),['/start-project','/catalogue']);
 assert.ok(after.every(p=>p.body.ar==='KEEP'));
 assert.equal((await adminContent(new Request('https://test/api/admin/content/pages/solutions-navigation',{method:'POST',headers:{origin:'https://evil.test'}}),env)).status,403);
});
const legacy=()=>builtinPages.filter(p=>p.builtinId!=='solutions').map(p=>({...p,parentId:null,showInHeader:p.builtinId.startsWith('service-')?false:p.showInHeader}));
function seed(env,items){for(const p of items)env.db.prepare('INSERT INTO site_settings(key,value,updated_at) VALUES(?,?,?)').run('cms:pages:'+p.id,JSON.stringify(p),'2026-10-25');}
test('solutions now groups only fit-out and ready products; every native sector route survives',()=>{
 const pages=twoPathSolutionsPages(legacy()),nav=navigationPages(pages,'header'),parent=nav.find(p=>p.builtinId==='solutions');
 assert.equal(pageHref(parent),'/#services');
 assert.deepEqual(nav.filter(p=>p.parentId===parent.id).sort((a,b)=>a.sortOrder-b.sortOrder).map(pageHref),['/start-project','/catalogue']);
 assert.deepEqual(nav.filter(p=>!p.parentId).sort((a,b)=>a.sortOrder-b.sortOrder).map(p=>p.builtinId),['home','solutions','offers','projects','about']);
 for(const key of ['pharmacies','bureaux','commerces','chambres']){const sector=pages.find(p=>p.builtinId==='service-'+key);assert.equal(pageHref(sector),'/services/'+key);assert.equal(sector.showInHeader,false);}
 assert.equal(pages.find(p=>p.builtinId==='catalogue').title.ar,'منتجات جاهزة');
 assert.ok(!navigationPages(pages,'footer').some(p=>p.builtinId==='solutions'));
});
test('v2 public projection is read-only; bootstrap retains copy, footer, visibility and URLs',async()=>{
 const env=store(),items=legacy(),service=items.find(p=>p.builtinId==='service-pharmacies');service.title.fr='TEAM PHARMACY';service.body.ar='KEEP BODY';service.showInFooter=true;service.visible=false;seed(env,items);
 const before=env.db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n;
 const publicPages=(await body(publicContent(env))).pages;assert.equal(publicPages.filter(p=>p.parentId==='builtin-solutions').length,2);
 assert.equal(env.db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n,before);
 assert.equal((await adminContent(req('pages/bootstrap','POST'),env)).status,200);
 const list=(await body(adminContent(req(),env))).items,after=list.find(p=>p.id===service.id);assert.equal(list.length,12);
 assert.equal(after.title.fr,'TEAM PHARMACY');assert.equal(after.body.ar,'KEEP BODY');assert.equal(after.showInFooter,true);assert.equal(after.visible,false);assert.equal(after.showInHeader,false);
 assert.ok(env.db.prepare('SELECT value FROM site_settings WHERE key=?').get('cms-meta:solutions-navigation-v3'));
});
test('after v2 initialization staff can rename, hide and reorder without bootstrap resets',async()=>{
 const env=store();await adminContent(req('pages/bootstrap','POST'),env);
 const items=(await body(adminContent(req(),env))).items,p=items.find(p=>p.builtinId==='catalogue');
 await adminContent(req('pages/'+p.id,'PUT',{...p,title:{fr:'TEAM CATALOGUE',ar:'كتالوج الفريق',en:'Team catalogue'},showInHeader:false,sortOrder:999}),env);
 await adminContent(req('pages/bootstrap','POST'),env);
 const after=(await body(adminContent(req(),env))).items.find(x=>x.id===p.id);
 assert.equal(after.title.ar,'كتالوج الفريق');assert.equal(after.showInHeader,false);assert.equal(after.sortOrder,999);
 assert.equal((await adminContent(req('pages/'+p.id,'DELETE'),env)).status,409);
});
test('custom records and titles survive rollout without a third hierarchy level',()=>{
 const items=legacy(),fitout=items.find(p=>p.builtinId==='fitout'),catalogue=items.find(p=>p.builtinId==='catalogue');
 catalogue.title.ar='اسم خاص';const custom={...items[0],id:'custom',builtinId:undefined,slug:'custom',parentId:fitout.id,body:{fr:'KEEP',ar:'',en:''}};
 const pages=twoPathSolutionsPages([...items,custom]);assert.equal(pages.find(p=>p.id===catalogue.id).title.ar,'اسم خاص');assert.equal(pages.find(p=>p.id==='custom').parentId,null);assert.equal(pages.find(p=>p.id==='custom').body.fr,'KEEP');
});
test('section anchor has sticky-header offset and only native navigation owns scrolling',()=>{
 assert.ok(readFileSync('app/components/page-navigation.css','utf8').includes('#services{scroll-margin-top:120px}'));
 const home=readFileSync('app/page.tsx','utf8');assert.ok(home.includes('id="services"'));assert.doesNotMatch(home,/\.scrollIntoView\s*\(/);
 const nav=readFileSync('app/components/page-navigation.tsx','utf8');assert.ok(nav.includes('navigationActive(href,pathname,hash)'));assert.ok(nav.includes('onPointerEnter='));
});
