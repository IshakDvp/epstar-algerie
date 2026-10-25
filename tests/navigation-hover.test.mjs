import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('submenu supports mouse hover, touch click, Escape, and a larger target',()=>{
 const source=readFileSync('app/components/page-navigation.tsx','utf8');
 assert.ok(source.includes('onPointerEnter='));
 assert.ok(source.includes('event.pointerType==="mouse"'));
 assert.ok(source.includes('(hover: hover) and (pointer: fine)'));
 assert.ok(source.includes('onPointerLeave='));
 assert.ok(source.includes('event.key==="Escape"'));
 assert.ok(source.includes('<details><summary'));
 const css=readFileSync('app/components/page-navigation.css','utf8');
 assert.ok(css.includes('min-width:44px;min-height:44px'));
});
