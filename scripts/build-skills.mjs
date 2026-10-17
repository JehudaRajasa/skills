import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export function buildSkills(sourceRoot = root, output = path.join(sourceRoot, "dist")) {
  sourceRoot = path.resolve(sourceRoot);
  output = path.resolve(output);
  const plugins = path.join(sourceRoot, "plugins");
  if (sourceRoot === output || sourceRoot.startsWith(output + path.sep) || output === plugins || output.startsWith(plugins + path.sep)) {
    throw new Error("Build output must be separate from the source files");
  }
  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  cpSync(path.join(sourceRoot, "LICENSE"), path.join(output, "LICENSE"));
  const marketplace = JSON.parse(readFileSync(path.join(sourceRoot, ".claude-plugin/marketplace.json"), "utf8"));

  for (const { source } of marketplace.plugins) {
    const plugin = path.resolve(sourceRoot, source);
    const skills = path.join(plugin, "skills");
    for (const entry of readdirSync(skills, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const skill = path.join(skills, entry.name);
      const destination = path.join(output, source, "skills", entry.name);
      cpSync(skill, destination, { recursive: true });
      const body = readFileSync(path.join(skill, "SKILL.md"), "utf8");
      const portable = body.replace(/\]\(([^)#\s]+)(#[^)\s]*)?\)/g, (match, link, anchor = "") => {
        if (/^[a-z][a-z0-9+.-]*:/i.test(link)) return match;
        const target = path.resolve(skill, link);
        if (!target.startsWith(plugin + path.sep)) {
          throw new Error(`${source}/skills/${entry.name}: reference leaves the plugin: ${link}`);
        }
        if (!existsSync(target)) {
          throw new Error(`${source}/skills/${entry.name}: missing reference: ${link}`);
        }
        if (target.startsWith(skill + path.sep)) return match;

        const bundled = path.relative(plugin, target);
        const local = path.join(destination, bundled);
        if (existsSync(local)) {
          if (!readFileSync(local).equals(readFileSync(target))) {
            throw new Error(`${source}/skills/${entry.name}: reference collision: ${bundled}`);
          }
        } else {
          mkdirSync(path.dirname(local), { recursive: true });
          cpSync(target, local);
        }
        return `](${bundled.split(path.sep).join("/")}${anchor})`;
      });
      writeFileSync(path.join(destination, "SKILL.md"), portable);
    }
  }
  writeFileSync(path.join(output, "README.md"), "# Standalone skills\n\nGenerated from [jehudarajasa/skills](https://github.com/jehudarajasa/skills). Edit the shared sources on `main`; this branch is rebuilt automatically.\n");
  return output;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(`Built standalone skills in ${buildSkills()}`);
}
