#!/usr/bin/env node
/**
 * Fanvue baseline data importer: NO API calls, NO credentials, NO publishing.
 * Reads only a human-approved aggregate export with defined numeric fields.
 * Output stays in .private/ (gitignored) by default.
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

const [mode, file] = process.argv.slice(2);
if (mode === "status") {
  process.stdout.write(JSON.stringify({
    creator_id: "MILA-CC-001",
    connector: "fanvue",
    access: "NOT_CONNECTED",
    authorized_account_verified: false,
    api_scopes: [],
    allow_writes: false,
    baseline_status: "AWAITING_APPROVED_EXPORT_OR_OWNER_OAUTH"
  },null,2) + "\n");
  process.exit(0);
}
if (mode !== "import" || !file) {
  console.error("Usage: node scripts/mila-fanvue-baseline.mjs status | import /path/to/approved-aggregate-export.json");
  process.exit(2);
}
const input = JSON.parse(readFileSync(resolve(file), "utf8"));
if (input.creator_id !== "MILA-CC-001") throw new Error("Wrong creator");
if (input.source !== "owner-approved-fanvue-aggregate-export") throw new Error("Unapproved data provenance");
if (typeof input.period_start !== "string" || typeof input.period_end !== "string" ||
  !/^\d{4}-\d{2}-\d{2}$/.test(input.period_start) || !/^\d{4}-\d{2}-\d{2}$/.test(input.period_end) ||
  input.period_start > input.period_end) throw new Error("Invalid report date range");
const allowed = ["followers","subscribers","gross_earnings","platform_fees","refunds","net_payout","posts_published","purchases","tracked_visits","human_minutes","content_cost","agent_cost"];
const numeric = {};
for (const key of allowed) {
  const v = input.metrics?.[key];
  if (v !== null && v !== undefined && (typeof v !== "number" || !Number.isFinite(v) || v < 0)) {
    throw new Error("Invalid aggregate metric " + key);
  }
  numeric[key] = v ?? null; // Unknown is NOT zero.
}
const forbidden = /(?:email|phone|cookie|password|token|secret|handle|username|fan_?id|message|address|individual)/i;
function rejectSensitive(value, at = "$") {
  if (!value || typeof value !== "object") return;
  for (const [key,v] of Object.entries(value)) {
    if (forbidden.test(key)) throw new Error("Personal or secret data not allowed: " + at + "." + key);
    rejectSensitive(v, at + "." + key);
  }
}
rejectSensitive(input);
const output = {
  schema_version: 1,
  creator_id: input.creator_id,
  source: input.source,
  period_start: input.period_start,
  period_end: input.period_end,
  imported_at: new Date().toISOString(),
  metrics: numeric,
  note: "Private owner-approved aggregate data; values not independently verified against Fanvue API; unknowns remain null.",
  allow_writes: false
};
const dest = resolve(".private/mila/fanvue-baseline.json");
mkdirSync(dirname(dest), {recursive: true});
writeFileSync(dest, JSON.stringify(output,null,2) + "\n",{encoding:"utf8",mode:0o600,flag:"wx"});
console.log("Aggregate baseline imported to local private path: " + dest);
