import path from "node:path";
import { fileURLToPath } from "node:url";

const skillsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "skills");

export default async () => ({
  config(config) {
    config.skills ??= {};
    config.skills.paths ??= [];

    if (!config.skills.paths.includes(skillsPath)) {
      config.skills.paths.push(skillsPath);
    }
  },
});
