import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('bounded mobile panel cannot shrink groups into overlapping rows',()=>{
 const css=readFileSync('app/components/page-navigation.css','utf8');
 assert.ok(css.includes('display:block;flex:0 0 auto;min-height:0;height:auto;width:100%'));
 assert.ok(css.includes('.mobile-menu .mobile-quote{display:block;flex:0 0 auto'));
 assert.ok(css.includes('.mobile-menu .nav-promo{position:static!important'));
 const m=readFileSync('app/admin/content-manager.tsx','utf8');
 assert.ok(m.includes('className="cms-editing-context"'));
 assert.ok(m.includes('aria-current={editing?.id===i.id?"true":undefined}'));
 assert.ok(m.includes('<code dir="ltr">{pageHref(editing)}</code>'));
});
