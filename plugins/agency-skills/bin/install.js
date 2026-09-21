#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const plugins = [
  ["mattpocock", "mattpocock/skills", "mattpocock-skills@mattpocock"],
  ["jehudarajasa", "jehudarajasa/skills", "agency-skills@jehudarajasa"],
];

export function entries(value) {
  if (Array.isArray(value)) return value;
  return value.installed ?? value.marketplaces ?? [];
}

export function has(value, id) {
  return entries(value).some((item) =>
    [item.id, item.pluginId, item.name].includes(id),
  );
}

function execute(command, args, capture = false) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: capture ? "pipe" : "inherit",
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  return capture ? JSON.parse(result.stdout) : undefined;
}

function installPluginHost(host) {
  const add = host === "claude" ? "install" : "add";
  const marketplaceList = execute(
    host,
    ["plugin", "marketplace", "list", "--json"],
    true,
  );

  for (const [name, source] of plugins) {
    if (!has(marketplaceList, name)) {
      execute(host, ["plugin", "marketplace", "add", source]);
    }
  }

  const pluginList = execute(host, ["plugin", "list", "--json"], true);
  for (const [, , id] of plugins) {
    if (!has(pluginList, id)) execute(host, ["plugin", add, id]);
  }
}

export function skillsArgs(agent, source) {
  return [
    "--yes",
    "skills@latest",
    "add",
    source,
    "--global",
    "--agent",
    agent,
    "--skill",
    "*",
    "--yes",
  ];
}

function installSkillsHost(agent) {
  const npx = process.platform === "win32" ? "npx.cmd" : "npx";
  const add = (source) => execute(npx, skillsArgs(agent, source));

  add("mattpocock/skills");
  if (agent === "opencode") {
    execute("opencode", ["plugin", "--global", "@jehudarajasa/agency-skills"]);
  } else {
    add("jehudarajasa/skills");
  }
}

function main([action, host]) {
  if (action !== "install" || !/^[a-z0-9][a-z0-9-]*$/.test(host ?? "")) {
    console.error("Usage: agency-skills install <claude|codex|opencode|agent>");
    process.exit(1);
  }

  if (["claude", "codex"].includes(host)) installPluginHost(host);
  else installSkillsHost(host);
  console.log("Agency Skills and Matt Pocock Skills are installed.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2));
}
