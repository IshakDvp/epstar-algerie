import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('all slide headings, descriptions and tag labels reserve the same grid area',()=>{
 const page=readFileSync('app/page.tsx','utf8'),css=readFileSync('app/home-layout.css','utf8');
 for(const [name,key] of [['heading','heading'],['description','text'],['label','title']]){
  assert.ok(page.includes(`className="hero-${name}-ghost" aria-hidden="true"`));
  assert.ok(page.includes(`{s.${key}}`));
 }
 assert.match(css,/\.hero-description-reserve p\{grid-area:1\/1/);
 assert.match(css,/\.hero-label-reserve b\{grid-area:1\/1/);
 assert.ok(css.includes('visibility:hidden'));
 assert.ok(!css.includes('line-clamp'));
});
test('shared footer has email before phone, lower horizontal nav and centered copyright',()=>{
 const page=readFileSync('app/components/site-footer.tsx','utf8'),css=readFileSync('app/components/site-footer.css','utf8');
 assert.ok(!page.includes('{t.description}'));
 assert.ok(!page.includes('<h4>{t.navigation}</h4>'));
 assert.ok(page.indexOf('mailto:')<page.indexOf('tel:'));
 assert.ok(page.includes('className="copyright" dir="ltr"'));
 assert.ok(css.includes('flex-direction:row;flex-wrap:wrap'));
 assert.match(css,/\.copyright\{[^}]*grid-row:3[^}]*text-align:center/);
 assert.ok(css.includes('html[data-theme="dark"]'));
 assert.ok(css.includes('@media(max-width:640px)'));
});
test('compact footer removes contact heading and groups icon links beside WhatsApp',()=>{
 const page=readFileSync('app/components/site-footer.tsx','utf8'),css=readFileSync('app/components/site-footer.css','utf8');
 assert.ok(!page.includes('<h4>{t.contact}</h4>'));
 assert.ok(page.includes('className="footer-contact-row"'));
 assert.ok(page.includes('className="footer-channels"'));
 assert.ok(page.includes('<ContactIcon phone/>'));
 assert.ok(page.includes('className="footer-whatsapp"'));
 assert.ok(page.includes('(c.facebook||c.instagram)&&'));
 assert.ok(css.includes('align-items:center;gap:12px 32px;padding:24px'));
 assert.ok(css.includes('grid-row:4'));
});
