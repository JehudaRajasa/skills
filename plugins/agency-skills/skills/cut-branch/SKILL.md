---
name: cut-branch
description: Cut a git branch for an issue, named from the issue's type and title.
argument-hint: "[issue-id]"
disable-model-invocation: true
---

Cut a working branch for one issue and check it out. Git only — `plan-implementation` moves the issue to in-progress when planning starts.

Resolve the tracker per [`references/issue-tracker.md`](../../references/issue-tracker.md).

## Name the branch

1. Take the issue from the argument — an id or URL. With no argument, use the issue under discussion. Read its title and type from the tracker.
2. Pick the conventional type from the issue itself: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, or `chore`. Derive it from the issue's own type field or labels; ask the user only when the issue gives no signal.
3. Build `<type>/<issue-id>-<slug>`, where `slug` condenses the issue to ≤7 words, lowercased and hyphen-separated, e.g. `feat/42-add-meaning-to-universe`.

## Cut it

4. `git checkout -b <branch-name>` — it forks from the current branch, so cut from the branch you mean to base the work on.

Done when the branch exists and is checked out.
