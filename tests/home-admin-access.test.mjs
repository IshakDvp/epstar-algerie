import {test} from 'node:test';import assert from 'node:assert/strict';
test('anonymous Home admin read/write and key management APIs are rejected before DB access',async()=>{
 const {default:worker}=await import('../dist/server/index.js');
 const env={DB:{prepare(){throw Error('Unauthorized request reached DB')}}},ctx={waitUntil(){},passThroughOnException(){}};
 for(const [path,method] of [['content/home','GET'],['content/home','PUT'],['content/home','POST'],['overview','GET'],['requests','GET'],['products','POST']]){
  const r=await worker.fetch(new Request('https://test/api/admin/'+path,{method}),env,ctx);
  assert.equal(r.status,401,path+' '+method);
 }
});
