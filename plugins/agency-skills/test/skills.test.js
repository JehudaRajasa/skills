import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const plugin = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = path.join(plugin, "skills");
const skills = readdirSync(root);

test("source skill links resolve within the native plugin", () => {
  for (const skill of skills) {
    const dir = path.join(root, skill);
    const text = readFileSync(path.join(dir, "SKILL.md"), "utf8");
    for (const [, link] of text.matchAll(/\]\(([^)#\s]+)/g)) {
      if (/^[a-z]+:/.test(link)) continue;
      const target = path.resolve(dir, link);
      assert.ok(target.startsWith(plugin + path.sep), `skills/${skill} links outside the plugin: ${link}`);
      assert.ok(existsSync(target), `skills/${skill} links a missing file: ${link}`);
    }
  }
});
