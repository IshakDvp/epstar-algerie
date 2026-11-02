import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css=readFileSync('app/home-layout.css','utf8');
const page=readFileSync('app/page.tsx','utf8');
test('sections and request form use fluid width with responsive gutters',()=>{
 assert.match(css,/main\.home-page>\.section-pad\{width:100%;max-width:none/);
 assert.match(css,/\.smart-quote\{width:100%;max-width:none/);
 assert.match(css,/\.testimonial\{width:calc\(100% - 2 \* var\(--home-gutter\)\);max-width:none/);
 assert.ok(css.includes('--home-gutter:clamp('));
 assert.ok(css.includes('max-width:65ch'));
 assert.ok(!readFileSync('app/components/home-blocks.tsx','utf8').includes('maxWidth:1400'));
});
test('hero only shows the plain path question and both path cards',()=>{
 assert.ok(page.includes('<p className="path-prompt">{start.ask}</p>'));
 for(const key of ['product','project','productDesc','projectDesc'])assert.ok(page.includes(`start.${key}`));
 assert.ok(!page.includes('path-guidance'));
 assert.ok(!page.includes('className="action-step"'));
 assert.ok(css.includes('main.home-page.rtl :is(h1,h2,h3)'));
 assert.ok(css.includes('unicode-bidi:isolate'));
});
