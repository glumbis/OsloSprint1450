const fs = require('node:fs');
const assert = require('node:assert/strict');
const yaml = fs.readFileSync(__dirname + '/../workflows/bootstrap.yml', 'utf8').replace(/\r\n/g, '\n');
const source = yaml.split('          script: |\n')[1].split('\n').map(line => line.slice(12)).join('\n');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const fn = new AsyncFunction('github', 'context', 'core', source);
function summary(sha = 'abc', findings = false) {
  return {id: 12, user: {id:199175422,login:'chatgpt-codex-connector[bot]',type:'Bot'},
    body:'<!-- codex-pull-request-review-summary -->\n<!-- codex-review-state:v1 '+JSON.stringify({
      code_review:{commit_sha:sha,status:'completed',has_any_findings:findings,has_unresolved_findings:findings},
      security_review:{status:null,commit_sha:null,has_any_findings:null,has_unresolved_findings:null}})+' -->'};
}
async function run(comments, options = {}) {
  const calls = {statuses:[], merges:[], requests:[]};
  const pr = {number:1,state:'open',base:{ref:'main'},head:{sha:'abc',repo:{full_name:'glumbis/OsloSprint1450'}},
    user:{login:'glumbis'},updated_at:new Date().toISOString(),...options.pr};
  let reads = 0;
  const github = {paginate: async () => comments, rest: {
    pulls:{get: async () => ({data:++reads > 1 && options.changed ? {...pr,head:{...pr.head,sha:'new'}} : pr}),
      merge:async args => {calls.merges.push(args); if(options.mergeError) throw {status:options.mergeError}; return {data:{merged:true}};}},
    repos:{getCombinedStatusForRef:async()=>({data:{statuses:options.existing || []}}),createCommitStatus:async args => calls.statuses.push(args),getCollaboratorPermissionLevel:async()=>({data:{permission:'write'}})},
    issues:{listComments(){},createComment:async args=>calls.requests.push(args)}
  }};
  await fn(github,{repo:{owner:'glumbis',repo:'OsloSprint1450'},payload:{pull_request:{number:1}},serverUrl:'https://github.com',runId:1},{info(){}});
  return calls;
}
(async()=>{
  let r = await run([summary()]); assert.equal(r.merges.length,1); assert.equal(r.merges[0].sha,'abc'); assert.equal(r.statuses[0].state,'success');
  for (const comments of [[],[summary('old')],[summary('abc',true)], [{...summary(),user:{id:1,login:'chatgpt-codex-connector[bot]',type:'Bot'}}], [{...summary(),body:'<!-- codex-pull-request-review-summary --> <!-- codex-review-state:v1 bad -->'}]]) {
    r=await run(comments); assert.equal(r.merges.length,0); assert.notEqual(r.statuses[0].state,'success');
  }
  r=await run([summary()],{changed:true}); assert.equal(r.merges.length,0); assert.equal(r.statuses.length,0);
  r=await run([summary()],{pr:{draft:true}}); assert.equal(r.merges.length,0);
  r=await run([summary()],{pr:{head:{sha:'abc',repo:{full_name:'external/fork'}}}}); assert.equal(r.merges.length,0);
  r=await run([summary()],{mergeError:405}); assert.equal(r.merges.length,1);
  r=await run([],{pr:{updated_at:'2020-01-01T00:00:00Z'}}); assert.equal(r.requests.length,1);
  r=await run([{user:{login:'github-actions[bot]'},body:'<!-- codex-request:abc -->'}],{pr:{updated_at:'2020-01-01T00:00:00Z'}}); assert.equal(r.requests.length,0);
  r=await run([{...summary(),body:summary().body.replace('\"status\":null,\"commit_sha\":null,\"has_any_findings\":null,\"has_unresolved_findings\":null','\"has_any_findings\":true')}]); assert.equal(r.merges.length,0);
  r=await run([summary()],{existing:[{context:'bootstrap-policy',state:'success',description:'Codex completed this exact commit with no findings',creator:{login:'github-actions[bot]'}}]}); assert.equal(r.statuses.length,0); assert.equal(r.merges.length,1);
  console.log('Passed: current review, stale/missing/spoofed/malformed reviews, findings, changed head, draft, fork, protected merge refusal, review request deduplication.');
})().catch(e=>{console.error(e);process.exitCode=1});
