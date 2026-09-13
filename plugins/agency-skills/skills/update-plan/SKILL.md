---
name: update-plan
description: Re-synthesize a saved plan after new context arrived, keeping completed work intact.
argument-hint: "[issue-id] [context]"
disable-model-invocation: true
---

Fold new context into a plan that already exists — re-synthesize `PLAN.md`, show the user the delta, and leave finished work finished. Plan only: write no source files.

## Locate

Find the issue workspace per [`references/issue-workspace.md`](../../references/issue-workspace.md), then read its `PLAN.md` and `CONTEXT.md`. You are revising them, not starting over. No workspace for this issue means it was never planned; send the user to `/plan-implementation`.

## Gather

Append the new context, from the argument or the conversation, to `CONTEXT.md`. Create it if the first plan skipped it.

When the new context leaves a real decision open — not just a detail — grill it out with `/grilling` before re-synthesizing.

## Re-synthesize

Rebuild `PLAN.md` from the issue plus the grown `CONTEXT.md`, using the issue workspace template and recording rules. Two things hold fixed:

- **Completed tasks stay done.** A `[x]` task keeps its check unless the new context explicitly undoes it.
- **Status stays where it was** (`Planned` / `In Progress`), unless the new context moves it.

## Confirm and save

Before writing, show the user the delta — the sections that moved and why the new context drove each. On their confirmation, write the revised plan to `PLAN.md` in place; never add a second copy. Print the path.

Done when `PLAN.md` reflects the new context, completed tasks are intact, the user has confirmed the delta, and no source file was touched.
