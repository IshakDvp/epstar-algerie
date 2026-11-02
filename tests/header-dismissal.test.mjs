import {test} from 'node:test';import assert from 'node:assert/strict';import {sourceURL} from './load-source.mjs';
const {attachHeaderDismissal}=await import(sourceURL('app/components/header-dismissal.ts'));
test('mobile disclosure closes outside, on Escape with focus return, on desktop and cleans listeners',()=>{
 const doc=new EventTarget(),desktop=new EventTarget();desktop.matches=false;
 let closes=0,focused=0;const inside=new EventTarget(),root={contains:node=>node===inside},toggle={focus(){focused++}};
 const stop=attachHeaderDismissal(root,toggle,()=>closes++,doc,desktop);
 const emit=(type,target)=>{const event=new Event(type);Object.defineProperty(event,'target',{value:target});doc.dispatchEvent(event)};
 emit('pointerdown',inside);assert.equal(closes,0);
 emit('pointerdown',{});assert.equal(closes,1);assert.equal(focused,0);
 emit('focusin',{});assert.equal(closes,2);
 const key=new Event('keydown',{cancelable:true});key.key='Escape';doc.dispatchEvent(key);assert.equal(closes,3);assert.equal(focused,1);assert.equal(key.defaultPrevented,true);
 desktop.matches=true;desktop.dispatchEvent(new Event('change'));assert.equal(closes,4);
 stop();emit('pointerdown',{});doc.dispatchEvent(key);desktop.dispatchEvent(new Event('change'));assert.equal(closes,4);
});
