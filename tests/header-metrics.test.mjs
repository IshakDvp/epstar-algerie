import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('shared header owns desktop metrics and preserves mobile breakpoint',()=>{
 const css=readFileSync('app/components/page-navigation.css','utf8');
 assert.match(css,/\.site-header\.unified-header\{height:auto;min-height:84px/);
 assert.match(css,/\.site-header\.unified-header \.desktop-navigation\{font-size:14px;font-weight:800;gap:24px/);
 assert.match(css,/\.site-header\.unified-header \.page-nav-group>a\{font-size:14px/);
 assert.match(css,/@media\(max-width:980px\)\{\.site-header\.unified-header \.desktop-navigation\{display:none/);
 assert.match(css,/@media\(max-width:520px\)\{\.site-header\.unified-header\{min-height:72px/);
});
