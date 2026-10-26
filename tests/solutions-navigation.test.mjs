import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {sourceURL} from './load-source.mjs';
const {builtinPages,pageHref,initialSolutionsPages,navigationPages,movePage}=await import(sourceURL('app/page-registry.ts'));
const {adminContent,publicContent}=await import(sourceURL('worker/content.ts'));
function store(){const db=new DatabaseSync(':memory:');db.exec(readFileSync('drizzle/0000_unique_rawhide_kid.sql','utf8'));return {db,DB:{prepare(sql){let args=[];const s=db.prepare(sql),q={bind(...v){args=v;return q},async first(){return s.get(...args)||null},async all(){return {results:s.all(...args)}},async run(){return {meta:{changes:Number(s.run(...args).changes)}}}};return q},async batch(stmts){db.exec('BEGIN');try{const r=[];for(const q of stmts)r.push(await q.run());db.exec('COMMIT');return r;}catch(e){db.exec('ROLLBACK');throw e;}}},BUCKET:{}};}
const req=(path='pages',method='GET',data)=>new Request('https://test/api/admin/content/'+path,{method,headers:{'content-type':'application/json'},...(data?{body:JSON.stringify(data)}:{})});
const body=async r=>(await r).json();
const legacy=()=>builtinPages.filter(p=>p.builtinId!=='solutions').map(p=>({...p,parentId:null,showInHeader:p.builtinId.startsWith('service-')?false:p.showInHeader}));
function seed(env,items){for(const p of items)env.db.prepare('INSERT INTO site_settings(key,value,updated_at) VALUES(?,?,?)').run('cms:pages:'+p.id,JSON.stringify(p),'2026-10-25');}
test('solutions links to the home section and four native service children are not duplicated',()=>{
 const pages=initialSolutionsPages(legacy()),nav=navigationPages(pages,'header'),parent=nav.find(p=>p.builtinId==='solutions');
 assert.equal(pageHref(parent),'/#services');assert.deepEqual(parent.title,{fr:'Nos solutions',ar:'حلولنا',en:'Our solutions'});
 const children=nav.filter(p=>p.parentId===parent.id);assert.equal(children.length,4);assert.deepEqual(children.map(pageHref),['/services/pharmacies','/services/bureaux','/services/commerces','/services/chambres']);
 assert.equal(nav.filter(p=>p.builtinId.startsWith('service-')&&!p.parentId).length,0);
 assert.ok(!navigationPages(pages,'footer').some(p=>p.builtinId==='solutions'));
 const reordered=movePage(pages,children[3].id,children[0].id);assert.equal(navigationPages(reordered,'header').filter(p=>p.parentId===parent.id)[0].id,children[3].id);
});
test('legacy public projection groups services read-only; initialization preserves titles/order/footer/visibility',async()=>{
 const env=store(),items=legacy(),service=items.find(p=>p.builtinId==='service-pharmacies');service.title.fr='TEAM PHARMACY';service.sortOrder=42;service.showInFooter=true;service.visible=false;seed(env,items);
 const before=env.db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n;
 const publicPages=(await body(publicContent(env))).pages;assert.ok(publicPages.some(p=>p.builtinId==='solutions'));assert.equal(publicPages.filter(p=>p.parentId==='builtin-solutions').length,3);
 assert.equal(env.db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n,before);
 assert.equal((await adminContent(req('pages/bootstrap','POST'),env)).status,200);
 const list=(await body(adminContent(req(),env))).items,after=list.find(p=>p.id===service.id);assert.equal(list.length,12);
 assert.equal(after.title.fr,'TEAM PHARMACY');assert.equal(after.sortOrder,42);assert.equal(after.showInFooter,true);assert.equal(after.visible,false);assert.equal(after.parentId,'builtin-solutions');assert.equal(after.showInHeader,true);
 assert.ok(env.db.prepare('SELECT value FROM site_settings WHERE key=?').get('cms-meta:solutions-navigation-v1'));
});
test('after one-time initialization staff can hide, reorder or detach service without bootstrap resetting it',async()=>{
 const env=store();await adminContent(req('pages/bootstrap','POST'),env);
 let list=(await body(adminContent(req(),env))).items;const service=list.find(p=>p.builtinId==='service-bureaux');
 assert.equal((await adminContent(req('pages/'+service.id,'PUT',{...service,parentId:null,showInHeader:false,sortOrder:999}),env)).status,200);
 const solutions=list.find(p=>p.builtinId==='solutions');await adminContent(req('pages/'+solutions.id,'PUT',{...solutions,title:{fr:'TEAM SOLUTIONS',ar:'حلول الفريق',en:'Team solutions'},showInFooter:true}),env);
 await adminContent(req('pages/bootstrap','POST'),env);list=(await body(adminContent(req(),env))).items;
 const after=list.find(p=>p.id===service.id);assert.equal(after.parentId,null);assert.equal(after.showInHeader,false);assert.equal(after.sortOrder,999);
 assert.equal(list.find(p=>p.id===solutions.id).title.fr,'TEAM SOLUTIONS');
 assert.equal((await adminContent(req('pages/'+solutions.id,'DELETE'),env)).status,409);
});
test('first rollout preserves custom service parent assignments and never creates a third hierarchy level',async()=>{
 const env=store(),items=legacy(),parent={...items[0],id:'custom-parent',builtinId:undefined,slug:'custom-parent',parentId:null};
 const office=items.find(p=>p.builtinId==='service-bureaux');office.parentId=parent.id;office.showInHeader=false;
 const pharmacy=items.find(p=>p.builtinId==='service-pharmacies'),child={...parent,id:'custom-child',slug:'custom-child',parentId:pharmacy.id};
 seed(env,[...items,parent,child]);await adminContent(req('pages/bootstrap','POST'),env);const list=(await body(adminContent(req(),env))).items;
 assert.equal(list.find(p=>p.id===office.id).parentId,parent.id);assert.equal(list.find(p=>p.id===office.id).showInHeader,false);
 assert.equal(list.find(p=>p.id===pharmacy.id).parentId,null);assert.equal(list.find(p=>p.id===child.id).parentId,pharmacy.id);
});
test('section anchor has sticky-header offset and only native navigation owns scrolling',()=>{
 assert.ok(readFileSync('app/components/page-navigation.css','utf8').includes('#services{scroll-margin-top:120px}'));
 const home=readFileSync('app/page.tsx','utf8');assert.ok(home.includes('id="services"'));assert.doesNotMatch(home,/\.scrollIntoView\s*\(/);
 const nav=readFileSync('app/components/page-navigation.tsx','utf8');assert.ok(nav.includes('!href.includes("#")'));assert.ok(nav.includes('onPointerEnter='));
});
