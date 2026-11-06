#!/usr/bin/env node
// Mila: deliberately limited READ-ONLY Agent-Reach adapter.
// Requires isolated worker with vetted upstream installed by operator.
// No account cookies, tokens, write methods, or arbitrary CLI arguments.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(resolve(root, "agents/mila/toolkit/agent-reach.json"), "utf8"));
const [mode, rawUrl] = process.argv.slice(2);
const allowedModes = ["doctor", "read"];
if (!allowedModes.includes(mode)) {
  console.error("Usage: node scripts/mila-agent-reach.mjs doctor | read https://approved-policy-host.example/path");
  process.exit(2);
}
if (!manifest.enabled || process.env.MILA_AGENT_REACH_READONLY !== "true") {
  console.error("BLOCKED: Agent-Reach is registered but disabled. Only an owner-reviewed isolated worker may enable it.");
  process.exit(3);
}
const maxCalls = Number(manifest.tool_permissions.max_calls_per_run);
if (!(maxCalls > 0 && maxCalls <= 20) || !manifest.tool_permissions.read_only) {
  throw new Error("Invalid toolkit security manifest");
}
let args;
if (mode === "doctor") {
  args = ["doctor"];
} else {
  if (!rawUrl || process.argv.length !== 4) throw new Error("A single URL is required");
  const u = new URL(rawUrl);
  if (u.protocol !== "https:" || u.username || u.password || u.port || !manifest.tool_permissions.domain_allowlist.includes(u.hostname.toLowerCase())) {
    throw new Error("URL is not on the explicit owner-approved policy/documentation host allowlist");
  }
  args = ["read", u.href];
}
const result = spawnSync("agent-reach", args, {
  encoding: "utf8",
  timeout: 20000,
  maxBuffer: 128 * 1024,
  env: {
    PATH: process.env.PATH || "",
    HOME: process.env.MILA_AGENT_REACH_HOME || "/nonexistent/mila-agent-reach",
    LC_ALL: "C.UTF-8",
    // No inherited login/session/token/proxy variables.
  }
});
if (result.error) throw new Error("Agent-Reach unavailable or timed out: " + result.error.message);
if (result.status !== 0) {
  console.error((result.stderr || "Agent-Reach returned an error").slice(0,2000));
  process.exit(4);
}
process.stdout.write((result.stdout || "").slice(0,manifest.tool_permissions.max_output_chars));
