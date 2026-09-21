import test from "node:test";
import assert from "node:assert/strict";

import { entries, has, skillsArgs } from "../bin/install.js";

test("finds installed plugins and marketplaces in both CLI response shapes", () => {
  assert.equal(has([{ id: "agency-skills@jehudarajasa" }], "agency-skills@jehudarajasa"), true);
  assert.equal(has({ installed: [{ pluginId: "mattpocock-skills@mattpocock" }] }, "mattpocock-skills@mattpocock"), true);
  assert.equal(has({ marketplaces: [{ name: "mattpocock" }] }, "mattpocock"), true);
  assert.deepEqual(entries({}), []);
});

test("installs every skill for skills CLI agents", () => {
  assert.deepEqual(skillsArgs("opencode", "mattpocock/skills"), [
    "--yes",
    "skills@latest",
    "add",
    "mattpocock/skills",
    "--global",
    "--agent",
    "opencode",
    "--skill",
    "*",
    "--yes",
  ]);
});
