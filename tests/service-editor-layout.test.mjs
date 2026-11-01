import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {sourceURL} from './load-source.mjs';
const {serviceEditorSections:sections}=await import(sourceURL('app/service-editor-layout.ts'));
const {serviceDefaults}=await import(sourceURL('app/service-content.ts'));
test('editor section and field order mirrors the public service template',()=>{
 assert.deepEqual(sections.map(s=>s.id),['hero','includes','process','gallery','quote','other']);
 assert.deepEqual(sections[0].fields,['eyebrow','headline','text','contact']);
 assert.deepEqual(sections[2].fields,['process','processTitle','intro','steps']);
 const detail=readFileSync('app/services/[slug]/service-detail.tsx','utf8');
 let previous=-1;
 for(const cls of ['detail-hero','detail-includes','detail-process','detail-gallery','detail-quote','other-services']){const pos=detail.indexOf(cls);assert.ok(pos>previous);previous=pos;}
 assert.ok(!detail.includes('t.back'));assert.ok(!detail.includes('back-link'));
});
test('all service languages retain every editable field without exposing legacy back',()=>{
 const fields=sections.flatMap(s=>s.fields).concat('title');
 assert.equal(new Set(fields).size,fields.length);
 for(const service of Object.values(serviceDefaults))for(const copy of Object.values(service.copy)){
  assert.deepEqual([...fields].sort(),Object.keys(copy).filter(k=>k!=='back').sort());
 }
 assert.deepEqual(sections.flatMap(s=>s.images).sort(),['model','photo']);
 const editor=readFileSync('app/admin/service-editor.tsx','utf8');
 assert.ok(editor.includes('serviceEditorSections.map'));
 assert.ok(!editor.includes('Object.entries(draft.copy'));
});
