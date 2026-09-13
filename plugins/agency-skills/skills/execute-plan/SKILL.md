---
name: execute-plan
description: Implement a saved plan, work its tasks under the repo's test posture, and stop before commit for the user to review.
argument-hint: "[issue-id]"
disable-model-invocation: true
---

Implement the plan. Read `PLAN.md`, work its tasks in order, and match how the repo already builds and tests. Stop when the code is built and verified — reviewing the diff and committing are the user's next move, on separate skills.

## Locate

Find the issue workspace per [`references/issue-workspace.md`](../../references/issue-workspace.md) and read `PLAN.md`. Move its Status to `In Progress` before writing code. No `PLAN.md` for this issue means it was never planned; send the user to `/plan-implementation`.

## Build

Read the repo's test posture first, then work the plan's open tasks top to bottom, checking off each in `PLAN.md` as it lands:

- **Repo already tests** → drive `/tdd` at the seams.
- **Repo has no tests** → write code only; don't stand up a test harness it never asked for.

Comment like the repo does; where it gives no signal, default to none. Add one only when the WHY resists the code (a constraint, a workaround, a surprise), never to restate code or name the task or issue.

## Hand off

Stop when every task is checked and the build is verified: it runs, and its tests (if any) pass. Leave Status at `In Progress`, write no commit, and open no MR. The user will then review the diff — by hand and/or via `/code-review` — before running `/commit`.

Done when every plan task is checked off, the build is verified, and the change sits uncommitted for the user to review.
