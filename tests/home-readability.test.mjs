import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css=readFileSync('app/home-readability.css','utf8');
test('home readability is explicitly scoped, relative and responsive without mutating CMS data',()=>{
 const page=readFileSync('app/page.tsx','utf8');
 assert.ok(page.includes('import "./home-readability.css"'));
 assert.ok(page.includes('className={`home-page '));
 assert.ok(css.includes('--home-body:1.125rem'));
 assert.ok(css.includes('--home-meta:.875rem'));
 assert.ok(css.includes('@media(max-width:560px)'));
 assert.ok(css.includes('overflow-wrap:anywhere'));
 assert.ok(css.includes(':focus-visible'));
 assert.ok(!css.includes('overflow:hidden'));
 for(const rule of css.replace(/\/\*[\s\S]*?\*\//g,'').split('}')){
  const selector=rule.slice(rule.lastIndexOf('{',rule.indexOf('{'))+1);
  if(!rule.includes('{'))continue;
  const prefix=rule.slice(0,rule.lastIndexOf('{')).replace(/@media[^\{]+\{/g,'').trim();
  if(prefix&&!prefix.startsWith('@media'))assert.ok(prefix.includes('.home-page'),prefix);
 }
});
test('home palette pairs have at least 4.5:1 contrast on their explicit surfaces',()=>{
 function lum(hex){const a=hex.match(/[a-f\d]{2}/gi).map(v=>parseInt(v,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return a[0]*.2126+a[1]*.7152+a[2]*.0722;}
 for(const [fg,bg] of [['4e6069','ffffff'],['c2cdd2','0b1013'],['ff8292','0b1013'],['ffffff','c90018'],['e0e7eb','102027']]){const a=lum(fg),b=lum(bg);assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,`${fg}/${bg}`);}
});
