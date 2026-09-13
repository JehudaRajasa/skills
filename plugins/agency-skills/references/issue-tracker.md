# Resolving the tracker

Every skill that touches issues or change requests resolves the tracker the same way. Read this before the skill's own steps.

## Which tracker, which project

Read the environment before opening config:

1. `git remote get-url origin` — a `github.com` host means GitHub (use the `gh` CLI or a GitHub MCP); a GitLab host means GitLab (use a GitLab MCP or `glab`).
2. If the remote does not name the tracker (Jira, Linear, or a self-hosted host you cannot identify) read `tracker` and `project` from `.agents/config.yml` in the project root.

## Who "the user" is

Resolve the user's identity from the tracker's own authenticated account — GitLab `whoami`, `gh api user`, the Linear or Jira viewer. Carry no name or email in any skill.

## Moving an issue's state

Only `plan-implementation` (work started) and `open-change-request` (code ready for review) move an issue, and only to the state their own action implies.

Move the issue only when `.agents/config.yml` maps the state for that action (`states.in_progress`, `states.review`). When the mapping is absent, leave the board untouched.

When the mapping is present:

- Set only a state or label that already exists on the board. Read the board's current states first and match the configured value against them.
- When nothing matches (the value is wrong, or the label was renamed) stop and show the user the states that exist, then ask which to use. Never mint a new label or state.
- Echo the move before making it: "moving #42 → Dev Review".
- If the tracker models state as labels, drop the previous workflow label as you add the new one, so the issue never carries two.
