---
name: open-change-request
description: Open a merge/pull request for the current branch and move its issue to review.
argument-hint: "[issue-id]"
disable-model-invocation: true
---

Open the change request for the current branch — the merge request or pull request your tracker calls it — then move its issue to the review state so the board shows the code is ready.

Resolve the tracker and the user's identity per [`references/issue-tracker.md`](../../references/issue-tracker.md). Read the noun your tracker gives the artifact from `change_request` in `.agents/config.yml` — MR on GitLab, PR on GitHub — and call it that in every message.

## Open it

1. Find the issue for the current branch. `cut-branch` named the branch `<type>/<issue-id>-<slug>`, so its id lives in the branch name; fall back to the argument, then to the issue under discussion. Push the branch to the remote if it is not there yet.
2. Open the change request from the current branch against the repo's default branch. Reference the issue with `Refs #<id>` (or your tracker's link form — a reference, not an auto-close keyword). The change request already shows the commits and the full diff, so the body adds only what those can't:
   - Summary — what the change does, and why when that isn't obvious. 1-4 sentences.
   - Config (optional) — new environment variables, feature flags, or config files.
   - Notes (optional) — what the diff and commits don't reveal: a renamed concept, a chosen tradeoff, a subtlety.
3. Title it `Type: Capitalized description` — the conventional type capitalized, then the issue's own title, e.g. `Feat: Add meaning to the universe module`. Leave the scope out unless the title is unclear without it.
4. Assign it to the user.

## Mark it

5. Move the issue to `states.review`, following **Moving an issue's state** in [`references/issue-tracker.md`](../../references/issue-tracker.md).

Done when the change request is open against the default branch, assigned to the user, and its issue reads as in review on the tracker.
