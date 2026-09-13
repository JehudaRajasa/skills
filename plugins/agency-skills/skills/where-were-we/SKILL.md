---
name: where-were-we
description: Re-orient on an in-flight issue after a break — reconstruct where the work stands from its plan, branch, and commits, and name the next command.
argument-hint: "[issue-id]"
disable-model-invocation: true
---

Reconstruct where an issue's work stands after time away, and name the one command that moves it forward.
Read-only: gather the state and report it, change nothing.

## Locate

Find the issue workspace per [`references/issue-workspace.md`](../../references/issue-workspace.md) — the argument's id if given, else the current branch's. Read its `PLAN.md` and, when present, `CONTEXT.md`. No `PLAN.md` for this issue means it was never planned; say so and send the user to `/plan-implementation`.

## Reconstruct

Read the trail the pipeline leaves, across three places:

- **Plan** — `PLAN.md`'s `Status`, and which `Tasks` are checked versus open. `CONTEXT.md` for the decisions behind them.
- **Git** — the current branch, the commits already on it, and any uncommitted changes (`git status`, `git diff`).
- **Tracker** — the issue's state, and whether a change request is already open, per [`references/issue-tracker.md`](../../references/issue-tracker.md).

## Brief

Report in this shape:

- **Issue** — one line: id, title, why it exists.
- **Done** — the checked tasks, and the commits that landed them.
- **Left** — the open tasks, plus any uncommitted work sitting in the tree.
- **Next** — the single command that advances it, read from where the trail stops:
  - Open tasks remain → `/execute-plan` resumes the build.
  - Every task checked, uncommitted diff in the tree → review the diff, then `/commit`.
  - Work committed, no change request open → `/open-change-request`.
  - Change request already open → it's in review; nothing to run.
