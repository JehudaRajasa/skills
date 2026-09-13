---
name: where-were-we
description: Re-orient on an in-flight issue from its requirements, Git history, and any saved plan, and name the next command.
argument-hint: "[issue-id]"
disable-model-invocation: true
---

Reconstruct where an issue's work stands after time away, and name the one command that moves it forward.
Read-only: gather the state and report it, change nothing.

## Locate

Resolve the issue from the argument, else the current branch, else the issue under discussion. Look for its workspace per [`references/issue-workspace.md`](../../references/issue-workspace.md) and read `PLAN.md` and `CONTEXT.md` when present. With no saved plan, reconstruct progress from the issue and Git.

## Reconstruct

Read the trail the pipeline leaves, across three places:

- **Plan, when present** — `PLAN.md`'s `Status`, definition of done, and which `Tasks` are checked versus open. `CONTEXT.md` for the decisions behind them.
- **Git** — the current branch, the commits already on it, and any uncommitted changes (`git status`, `git diff`).
- **Tracker** — the issue's title, requirements, state, and whether a change request is already open, per [`references/issue-tracker.md`](../../references/issue-tracker.md).

Without a plan, compare the branch's changes with the issue's requirements. Distinguish implemented behavior from verified behavior; commits alone do not prove completion.

## Brief

Report in this shape:

- **Issue** — one line: id, title, why it exists.
- **Done** — completed requirements or checked plan tasks, with supporting changes and verification evidence.
- **Left** — remaining requirements or open plan tasks, missing verification, and any uncommitted work sitting in the tree.
- **Next** — the single command that advances it, read from where the trail stops:
  - Change request already open → it's in review; nothing to run.
  - Otherwise, work remains or completion is uncertain → `/implement-change` resumes implementation or verification.
  - Work complete and verified, uncommitted diff in the tree → review the diff, then `/commit`.
  - Work complete, verified, and committed, no change request open → `/open-change-request`.
