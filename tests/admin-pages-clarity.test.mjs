import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('system links and dedicated content modules have distinct actions',()=>{
 const m=readFileSync('app/admin/content-manager.tsx','utf8');
 const p=readFileSync('app/admin/page.tsx','utf8');
 assert.ok(p.includes('pages:"Pages et menus"'));
 assert.ok(m.includes('kind==="pages"&&i.builtinId?"Paramètres du lien":"Modifier"'));
 assert.ok(m.includes('kind==="pages"&&editing?.builtinId?"Nom du lien dans les menus":"Titre"'));
 for(const key of ['Gérer les offres','Gérer les produits','Gérer les réalisations','Lien activé','Lien désactivé'])assert.ok(m.includes(key));
 assert.ok(m.includes('onManage?.(i.builtinId==="catalogue"?"categories"'));
 assert.ok(m.includes('pageHref(i)'));
});
