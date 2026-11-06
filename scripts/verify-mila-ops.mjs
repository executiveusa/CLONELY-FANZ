#!/usr/bin/env node
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {spawnSync} from "node:child_process";
const read=(p)=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const registry=JSON.parse(read("ops/mila/platform-niche-registry.json"));
const manifest=JSON.parse(read("agents/mila/toolkit/agent-reach.json"));
const platforms=new Map(registry.platforms.map(p=>[p.id,p]));
const niches=new Map(registry.niches.map(n=>[n.id,n]));
assert.equal(platforms.size,registry.platforms.length);
assert.equal(niches.size,registry.niches.length);
assert(registry.opportunities.length>=15);
const categories=new Set(registry.classification_values);
const ids=new Set();
for(const o of registry.opportunities){
  assert(!ids.has(o.id),"duplicate opportunity: "+o.id);ids.add(o.id);
  assert(platforms.has(o.platform_id),"unknown platform: "+o.id);
  assert(niches.has(o.niche_id),"unknown niche: "+o.id);
  assert(categories.has(o.category),"unknown classification: "+o.id);
  assert(["conditional","blocked"].includes(o.eligibility),"unknown eligibility");
  assert(o.source_urls.every(u=>u.startsWith("https://")));
  if(o.category==="blocked")assert.equal(o.eligibility,"blocked");
  else assert.equal(o.eligibility,"conditional");
  if(o.platform_id==="reddit"||o.platform_id==="fansly")assert.equal(o.eligibility,"blocked","no blanket authorization granted");
}
assert.equal(manifest.enabled,false,"external tool must default disabled");
assert.equal(manifest.tool_permissions.read_only,true);
assert.equal(manifest.tool_permissions.no_browser_cookies,true);
assert.equal(manifest.tool_permissions.no_write_actions,true);
assert(manifest.disabled_capabilities.includes("reddit"));
assert(read(".gitignore").includes(".private/"),"private data must be ignored");
const status=spawnSync(process.execPath,["scripts/mila-fanvue-baseline.mjs","status"],{encoding:"utf8"});
assert.equal(status.status,0,status.stderr);
const fanvue=JSON.parse(status.stdout);
assert.equal(fanvue.access,"NOT_CONNECTED");
assert.equal(fanvue.allow_writes,false);
const disabled=spawnSync(process.execPath,["scripts/mila-agent-reach.mjs","doctor"],{encoding:"utf8"});
assert.equal(disabled.status,3,"unauthorized tool execution must fail closed");
console.log(JSON.stringify({
status:"PASS",creator:registry.creator_id,platforms:platforms.size,niches:niches.size,opportunities:registry.opportunities.length,
categories:Object.fromEntries([...categories].map(k=>[k,registry.opportunities.filter(o=>o.category===k).length])),
fanvue:"NOT_CONNECTED",agent_reach:"DISABLED"
},null,2));
