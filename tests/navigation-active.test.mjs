import test from 'node:test';import assert from 'node:assert/strict';import {sourceURL} from './load-source.mjs';import {readFileSync} from 'node:fs';
const {navigationActive:active}=await import(sourceURL('app/navigation-active.ts'));
test('Solutions hash is active without simultaneously selecting Home',()=>{
 assert.equal(active('/#services','/','#services'),true);assert.equal(active('/','/','#services'),false);
 assert.equal(active('/#services','/',''),false);assert.equal(active('/','/',''),true);
 assert.equal(active('/#services','/services/pharmacies','#services'),false);
 assert.equal(active('/catalogue','/catalogue/bureau',''),true);
});
test('native hashes, history and deferred controller update active state',()=>{
 const nav=readFileSync('app/components/page-navigation.tsx','utf8'),hook=readFileSync('app/components/use-initial-home-anchor.ts','utf8');
 for(const event of ['hashchange','popstate','epstar-anchor'])assert.ok(nav.includes(`addEventListener("${event}"`));
 assert.ok(hook.includes('dispatchEvent(new Event("epstar-anchor"))'));
});
