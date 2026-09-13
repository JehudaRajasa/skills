---
name: plan-implementation
description: Plan a pulled issue with the user and save the plan locally so any session can resume it.
argument-hint: "[issue-id] [context]"
disable-model-invocation: true
---

Turn a pulled issue into a concrete, stepped plan, and save it where the next session can pick it up. Plan only: write no source files until the user confirms or runs `/execute-plan`. The plan and context files are the only files you write here.

Resolve the tracker per [`references/issue-tracker.md`](../../references/issue-tracker.md).

## Gather

Take the issue from the argument or the one under discussion, and read its title and body. Picking it up to plan is where work starts, so move it to `states.in_progress` per **Moving an issue's state** in [`references/issue-tracker.md`](../../references/issue-tracker.md). It may be thin, so pull in the out-of-band context the user gives you. The plan is what you synthesize from it.

When the issue and that context still leave the work under-decided — a real decision hasn't been made yet, not just a detail to clarify — grill it out with `/grilling` first, then plan.

## Discuss

Viability first: is this worth doing, and doable as framed? If not, surface that with the user before planning further. If it's really several issues wearing one, break it up with `/to-tickets` before planning.

Close the gaps between the issue and a concrete plan. Work these through with the user before writing the plan:

- Definition of done — the outcomes that mark the work complete.
- Architecture and its tradeoffs.
- Libraries and tools — check the library's official docs for current conventions (using Context7 MCP when available) before proposing one.
- Blast radius — which parts of the codebase change, and what that ripples into.
- Hidden assumptions, if any.

## Save

Store the plan in the issue workspace — the `.issues/<issue-id>-<slug>/` layout, the `PLAN.md` template, and the `CONTEXT.md` companion — per [`references/issue-workspace.md`](../../references/issue-workspace.md).

- Write the synthesized plan to `PLAN.md`.
- When context beyond the issue itself surfaced, capture it in `CONTEXT.md`.
- Print the path after writing.
- On later iterations, edit `PLAN.md` in place rather than adding a second copy.
