---
name: implement-change
description: Implement a change from a saved plan or clear issue requirements, verify it, and leave it uncommitted for review.
argument-hint: "[issue-id]"
disable-model-invocation: true
---

Implement the change and match how the repo already builds and tests. Stop when the change is built and verified — reviewing the diff and committing are the user's next move, on separate skills.

## Locate

Take the issue from the argument, else the current branch, else the issue under discussion. Resolve the tracker per [`references/issue-tracker.md`](../../references/issue-tracker.md) and read the issue's title and body alongside the user's context.

Look for an existing workspace per [`references/issue-workspace.md`](../../references/issue-workspace.md). Read `PLAN.md` and `CONTEXT.md` when present, then inspect the affected code and its callers.

## Choose the path

- **Saved plan** → follow its definition of done and open tasks.
- **No saved plan** → proceed directly when the intended behavior, affected scope, and verification are clear. State those briefly in the conversation; keep this path free of plan and workspace creation.

If investigation reveals an unresolved product or design decision, explain the decision and pause dependent implementation. Point the user to `/plan-implementation`, or `/update-plan` when revising an existing plan. Routine implementation details are yours to resolve.

## Build

Before writing code, move the issue to `states.in_progress` per **Moving an issue's state** in [`references/issue-tracker.md`](../../references/issue-tracker.md). When a plan exists, move its Status to `In Progress`, work its open tasks top to bottom, and check off each as it lands. Otherwise implement against the issue's requirements.

Read the repo's test posture first:

- **Repo already tests** → drive `/tdd` at the seams.
- **Repo has no tests** → write code only; don't stand up a test harness it never asked for.

Comment like the repo does; where it gives no signal, default to none. Add one only when the WHY resists the code (a constraint, a workaround, a surprise), never to restate code or name the task or issue.

## Hand off

Verify the change against the plan's definition of done or the issue's requirements: it runs, and its tests (if any) pass. Report what changed, the verification performed, and any remaining limitations. Leave any plan's Status at `In Progress`, write no commit, and open no MR. The user will then review the diff — by hand and/or via `/code-review` — before running `/commit`.

Done when the requirements are met, every task in an existing plan is checked off, the change is verified, and it sits uncommitted for the user to review.
