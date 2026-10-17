# The issue workspace

Saved plans and their context live at `.issues/<issue-id>-<slug>/` in the repo root. Planning, re-planning, implementation, and re-orientation use this layout when a workspace exists. Direct implementation needs no workspace.

## Where it lives

- Name the directory `<issue-id>-<slug>` — the branch `cut-branch` made, with its `<type>/` prefix removed. With no issue in the branch, slug the user's request instead and tell the user.
- Create the workspace only when saving a plan or its context.
- To find an existing workspace, use the resolved issue id (the argument, else the current branch, else the issue under discussion) and glob `.issues/<issue-id>-*/`.

## PLAN.md

The plan you synthesize. Use these sections:

```markdown
# Issue <issue-id> — <short title>

**Branch:** <branch-name> **Created:** <YYYY-MM-DD> **Status:** Planned

## Acceptance Criteria

<Observable conditions that must all hold for this issue to be complete.>

## Design (optional)

<Include when decisions govern multiple tasks. Record the chosen approach, its rationale, and relevant constraints. Put task-specific details with their task. Omit this section when the tasks convey the approach fully.>

## Tasks

- [ ] <step 1>
- [ ] <step 2>
```

`Status` moves `Planned` → `In Progress` → `Done` as the work proceeds.

Record decisions and remaining caveats beside the affected design or task. As answers arrive, replace resolved assumptions with the resulting decisions or acceptance criteria.

## CONTEXT.md

The raw, accreting context the plan draws on — standup notes, Slack quotes, huddle decisions. Free-form, appended to as new context surfaces. Write it only when context beyond the issue itself exists; skip it when the issue stands on its own.
