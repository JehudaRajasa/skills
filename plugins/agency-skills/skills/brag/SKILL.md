---
name: brag
description: Update the user's brag document with their work in the current repo that it hasn't recorded yet — or with one named piece of work — grounded in the repo's commits, issues, and change requests.
argument-hint: "[work]"
disable-model-invocation: true
---

Update the user's brag document — Julia Evans' running record of what they did and why it mattered. The user forgets what they built; the repo remembers, so read it.

Run from the repo whose work it records: the repo is the evidence. The brag document sits in the directory you were invoked from. When it isn't there, ask the user for its directory; if that directory holds none, start one there.

Resolve the tracker and the user's identity per [`references/issue-tracker.md`](../../references/issue-tracker.md).

## Find the work

Read what the brag document already records, then take whichever branch you were invoked with:

- **No argument** — walk the user's history in this repo (their commits, merged change requests, closed issues, reviews) and keep everything the brag document has not recorded yet. Group it into projects and show the list; the user confirms what to record.
- **Work named in the argument** — record only that work. Find it in the repo.

For each piece of work, read its commits and diff, the issue behind it, its change request, and its issue workspace (`PLAN.md`, `CONTEXT.md`) when one exists per [`references/issue-workspace.md`](../../references/issue-workspace.md). Then ask the user only for what the repo cannot show — why it mattered, who it served, and the impact they saw, numeric or not (an audit passed, a user retained).

## Record it

Write into the brag document, exactly as good as it is. Follow its existing shape; start a new one with the sections below. File each piece of work under the section it belongs to, and update entries in place — fold work into its project's existing entry, fill in impact marked pending.

Done when every piece of work the user confirmed sits in its section, every project entry names the user's contributions, and every impact claim traces to a commit, an issue, a change request, or the user's own word — or is marked pending.

## Sections

- **Goals** — what the user is aiming for now, and next.
- **Projects** — one entry per project, never per commit:
  - **Contributions** — what the user did: the design, the parts they built, the scope they cut.
  - **Impact** — the effect, not the ship: "shipped X, which caused Y". Name who it served and measure it where the evidence allows: money, deals, speed, daily users, or a non-numeric goal met. Label indirect effects as indirect. Impact still unfolding is marked pending, to fill in once it lands.
- **Collaboration & mentorship** — help given in their area of expertise, mentoring and onboarding, code reviews that mattered, foundational code others built on, monitoring and on-call, talks and workshops.
- **Design & documentation** — design docs written or reviewed; documentation, with the goal behind it.
- **Company building** — work beyond the team: interviewing, recruiting, processes, onboarding material.
- **What you learned** — skills gained: a language, a library, a tool's internals, performance work, design-doc writing.
- **Outside of work** — blog posts, talks, open source, recognition.
