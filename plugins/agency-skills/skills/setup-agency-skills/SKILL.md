---
name: setup-agency-skills
description: Configure `.agents/config.yml` — the tracker and workflow states the other agency skills read. Run once per project, before the rest.
disable-model-invocation: true
---

Write `.agents/config.yml` so the other agency skills resolve your tracker and move issues into states that actually exist on your board. Run once per project. Re-run to revise: read the existing config first and edit it, rather than starting over.

Detect and derive first; ask the user only for what the environment can't reveal. Every state you record must be **detected from the board, never invented**: the runtime skills only set a state that already exists, so a value the board doesn't have silently no-ops.

## Resolve the tracker

Resolve the tracker and the user's identity per [`references/issue-tracker.md`](../../references/issue-tracker.md). This names the host and confirms you can reach the board.

- **Remote names the tracker** (GitHub, GitLab) → leave `tracker` and `project` out of the config; the skills read them from `git remote` every run. Writing them caches a lookup that can go stale.
- **Remote can't name it** (Jira, Linear, self-hosted) → ask the user for `tracker` and `project`, and write both.

## Read the board

Fetch the workflow states the board actually uses: the status field's values, or the workflow labels when the tracker models state as labels. This live set is the point of running setup. It's what a static example can't know, and what every state you write must match.

## Map the states

Fill three keys from the real board states, offering the closest match for each and confirming it with the user:

- `states.in_progress`: the state that means **work has started** (e.g. `WIP`, `In Progress`).
- `states.review`: the state that means **code is ready for review** (e.g. `In Review`, `Dev Review`).
- `active_states`: the states that count as **workable, not done**. Default to every state that isn't closed, done, or a QA/verification stage, and confirm.

When the board has no state matching a key, leave the key out; the skills skip that move rather than guess.

Set `change_request` automatically from the tracker: `MR` on GitLab, `PR` on GitHub or Bitbucket.

## Write and validate

Write `.agents/config.yml` in the project root, following the shape of [`config.example.yml`](../../config.example.yml). Keep only the keys this project needs. Omit `tracker` and `project` when the remote resolves them. Print the path.
