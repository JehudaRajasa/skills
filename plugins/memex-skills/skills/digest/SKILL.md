---
name: digest
description: Write a prose digest of logged ingests and evergreen changes for a completed calendar period.
argument-hint: "[day|week|month]"
disable-model-invocation: true
---

Resolve the vault per [`references/vault.md`](references/vault.md).

## Window

Use the last completed calendar `day`, `week` (Monday–Sunday), or `month` in local time; ask if the argument is empty. Select log timestamps from midnight on the first date up to, excluding, midnight after the last.

Return an existing digest for the same period unchanged; match its period metadata, or explicit coverage in older digests.

## Synthesize

1. Read the **log** for ingests and evergreen changes in range, then pull their **source summaries** and **evergreen pages**. Base the synthesis on those logged changes.
2. Write one prose synthesis into **digests**, grouped by domain tag. Title it for its throughline and record the window in the constitution's digest-period fields. Choose another title if its filename is occupied.

Done when an existing digest is returned unchanged, or all selected material is synthesized into one digest with its period recorded and every claim linked to its page.
