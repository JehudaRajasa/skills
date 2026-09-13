---
name: fetch-issues
description: List your open issues on this project's tracker so you can pick one to work on.
disable-model-invocation: true
---

List every open issue assigned to the user that is still **active** — workable, not yet done. Read-only: list them and stop.

Resolve the tracker and the user's identity per [`references/issue-tracker.md`](../../references/issue-tracker.md).

## Fetch and filter

Fetch the open issues assigned to the user, then keep only the **active** ones. Read the active set from `active_states` in `.agents/config.yml`. When that key is absent, treat every state that is not closed, done, or a QA/verification stage as active.

## Show them

For each surviving issue print one row: id, title, a one-line summary, and its current state or labels, then stop. Picking an issue and starting on it is `cut-branch`'s job.
