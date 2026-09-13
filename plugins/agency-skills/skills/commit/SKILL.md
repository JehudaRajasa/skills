---
name: commit
description: Commit the working tree as small Conventional Commits.
disable-model-invocation: true
---

Turn the working tree into small, well-formed commits: read what changed, stage one concern at a time by name, and write each message in Conventional Commits form. Review the staged diff before every commit.

## Read the tree

Run `git status` and `git diff` to see everything uncommitted. A clean tree means nothing to do — say so and stop. Otherwise group the changes by concern, where each distinct purpose is its own commit.

## Stage one concern

Stage that concern's files by name with `git add <path> …`, not `git add -A` or `git add .`, so unrelated edits and scratch files stay out. Leave the other concerns unstaged for their own commits.

## Write the message

Conventional Commits: `<type>(<scope>): <subject>`. The type is one of `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, or `revert` — pick the one the change earns. The `(<scope>)` is optional; add it only when it sharpens the subject. Subject in the imperative, ≤50 characters. Add a body, wrapped at 72, only when the diff doesn't explain its own why.

Breaking an API? Mark it: `!` before the colon (`feat!:`), or a `BREAKING CHANGE: <what broke>` footer — the mark SemVer and changelog tools read for a major bump.

## Commit and loop

Review the staged diff one more time, then commit. Changes still uncommitted? Back to **Stage one concern** for the next.

Done when the tree is clean and every commit is one logical change in Conventional Commits form.
