import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('compact navigation exposes both children directly; parent remains an anchor and close is visible',()=>{
 const nav=readFileSync('app/components/page-navigation.tsx','utf8'),header=readFileSync('app/components/site-header.tsx','utf8'),css=readFileSync('app/components/page-navigation.css','utf8');
 assert.ok(nav.includes('children.length>0&&!compact'));
 assert.ok(header.includes('<PageNavigation compact pages='));
 assert.ok(header.includes('className="menu-close"'));
 assert.ok(header.includes('إغلاق القائمة'));
 assert.ok(css.includes('max-height:calc(100dvh - 100%)'));
 assert.ok(css.includes('overflow-y:auto;overscroll-behavior:contain'));
 assert.ok(css.includes('min-height:44px'));
 assert.ok(readFileSync('app/start-project/page.tsx','utf8').includes('/services/'));
});
