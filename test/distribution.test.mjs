import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSkills } from "../scripts/build-skills.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const links = (body) => [...body.matchAll(/\]\(([^)#\s]+)/g)].map((match) => match[1]).filter((link) => !/^[a-z]+:/.test(link));

test("each distributed skill retains its reference contents when installed alone", (t) => {
  const scratch = mkdtempSync(path.join(tmpdir(), "skills-distribution-"));
  t.after(() => rmSync(scratch, { recursive: true, force: true }));
  const output = path.join(scratch, "dist");
  mkdirSync(output);
  writeFileSync(path.join(output, "obsolete.txt"), "stale build");
  buildSkills(root, output);
  assert.equal(existsSync(path.join(output, "obsolete.txt")), false);

  const marketplace = JSON.parse(readFileSync(path.join(root, ".claude-plugin/marketplace.json"), "utf8"));
  for (const { source } of marketplace.plugins) {
    const skills = path.join(root, source, "skills");
    for (const name of readdirSync(skills)) {
      const original = path.join(skills, name);
      const installed = path.join(scratch, "installed", source, name);
      cpSync(path.join(output, source, "skills", name), installed, { recursive: true });
      const before = readFileSync(path.join(original, "SKILL.md"), "utf8");
      const after = readFileSync(path.join(installed, "SKILL.md"), "utf8");
      assert.equal(after.match(/^---[\s\S]*?---/)[0], before.match(/^---[\s\S]*?---/)[0]);
      assert.deepEqual(readFileSync(path.join(installed, "agents/openai.yaml")), readFileSync(path.join(original, "agents/openai.yaml")));
      const originalLinks = links(before);
      const installedLinks = links(after);
      assert.equal(installedLinks.length, originalLinks.length);
      for (let i = 0; i < installedLinks.length; i++) {
        const file = path.resolve(installed, installedLinks[i]);
        assert.ok(file.startsWith(installed + path.sep), `${name}: ${installedLinks[i]} leaves the installed skill`);
        assert.ok(lstatSync(file).isFile(), `${name}: ${installedLinks[i]} is not an ordinary file`);
        assert.deepEqual(readFileSync(file), readFileSync(path.resolve(original, originalLinks[i])));
      }
    }
  }
  const script = "plugins/memex-skills/skills/ingest/scripts/fetch_transcript.sh";
  assert.equal(lstatSync(path.join(output, script)).mode & 0o111, lstatSync(path.join(root, script)).mode & 0o111);
});

test("bundling rejects missing references and paths outside the plugin", (t) => {
  const scratch = mkdtempSync(path.join(tmpdir(), "skills-invalid-reference-"));
  t.after(() => rmSync(scratch, { recursive: true, force: true }));
  mkdirSync(path.join(scratch, ".claude-plugin"));
  writeFileSync(path.join(scratch, ".claude-plugin/marketplace.json"), JSON.stringify({ plugins: [{ source: "./plugins/example" }] }));
  writeFileSync(path.join(scratch, "LICENSE"), "example license");
  const skill = path.join(scratch, "plugins/example/skills/example");
  mkdirSync(skill, { recursive: true });
  const body = path.join(skill, "SKILL.md");
  writeFileSync(body, "[Missing](../../references/missing.md)");
  assert.throws(() => buildSkills(scratch), /missing reference/);
  writeFileSync(body, "[Outside](../../../../LICENSE)");
  assert.throws(() => buildSkills(scratch), /reference leaves the plugin/);
  assert.throws(() => buildSkills(scratch, scratch), /separate from the source/);
  assert.throws(() => buildSkills(scratch, path.join(scratch, "plugins")), /separate from the source/);
  assert.ok(existsSync(body));
});
