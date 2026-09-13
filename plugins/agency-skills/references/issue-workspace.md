# The issue workspace

Each issue you plan and build gets a local workspace at `.issues/<issue-id>-<slug>/` in the repo root. Every skill that plans, re-plans, executes, or re-orients reads and writes it the same way. Read this before the skill's own steps.

## Where it lives

- Name the directory `<issue-id>-<slug>` — the branch `cut-branch` made, with its `<type>/` prefix removed. With no issue in the branch, slug the user's request instead and tell the user.
- Create `.issues/` if it is missing.
- To find an existing workspace, take the issue id from the current branch and glob `.issues/<issue-id>-*/`.

## PLAN.md

The plan you synthesize. Use these sections:

```markdown
# Issue <issue-id> — <short title>

**Branch:** <branch-name>
**Created:** <YYYY-MM-DD>
**Status:** Planned

## Definition of Done
<Bullet list of conditions that must be true when shipped.>

## Design (optional)
<The design decisions the next session would otherwise re-derive: architecture, dependencies, tradeoffs, the approach chosen over alternatives.>

## Risks & Assumptions (optional)
<Numbered list. Each item: the assumption + what breaks if it is wrong.>

## Tasks
- [ ] <step 1>
- [ ] <step 2>
```

`Status` moves `Planned` → `In Progress` → `Done` as the work proceeds.

## CONTEXT.md

The raw, accreting context the plan draws on — standup notes, Slack quotes, huddle decisions. Free-form, appended to as new context surfaces. Write it only when context beyond the issue itself exists; skip it when the issue stands on its own.
