import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css=readFileSync('app/home-layout.css','utf8');
test('home composition stays scoped and does not change stored content or section ordering',()=>{
 const page=readFileSync('app/page.tsx','utf8');
 assert.ok(page.includes('import "./home-layout.css"'));
 assert.ok(page.includes('home.sectionOrder.map'));
 assert.ok(page.includes('!home.hiddenSections.includes(key)'));
 for(const block of css.replace(/\/\*[\s\S]*?\*\//g,'').split('}')){
  if(!block.includes('{'))continue;
  const prefix=block.slice(0,block.lastIndexOf('{')).replace(/@media[^\{]+\{/g,'').trim();
  if(prefix&&!prefix.startsWith('@media'))assert.ok(prefix.includes('main.home-page'),prefix);
 }
});
test('home layout removes text-over-image, fixed review height, and four-slot logo grid',()=>{
 assert.match(css,/\.client-logo-grid\{display:flex;flex-wrap:wrap;justify-content:center/);
 assert.match(css,/\.about\{display:grid;grid-template-columns:minmax\(0,1fr\) minmax\(0,1\.15fr\)/);
 assert.match(css,/article>div\{position:static/);
 assert.match(css,/\.testimonial\{[^}]*min-height:0/);
 assert.match(css,/\.quote-band\{[^}]*grid-template-columns:minmax\(0,1fr\)/);
 assert.match(css,/\.smart-quote\{width:100%;max-width:none/);
 assert.ok(css.includes('@media(max-width:560px)'));
 assert.ok(!css.includes('url('));
});
