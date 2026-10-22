---
name: digest
description: Write a dated digest — a prose synthesis of everything captured and changed in a time window, grouped by domain tag and cross-linked.
argument-hint: "[day|week|month]"
disable-model-invocation: true
---

Write a dated digest — a prose synthesis of what the vault took in and how it changed over a window: what you learned, not a changelog.

Resolve the vault per [`references/vault.md`](../../references/vault.md), then read its `AGENTS.md` and run this in the vault's own terms.

## Window

Take the window from the argument — `day`, `week`, or `month`. Empty → ask which. Resolve it to a concrete date range from today.

## Synthesize

1. Select what falls in the window: read the **log** — the audit trail is the time index — for entries in range, then pull the **source summaries** filed and the **evergreen pages** touched over it.
2. Write one dated synthesis into **digests**, grouped by the vault's domain tags and cross-linked to the pages it covers. Prose that says what the window added up to — the throughline, the connections, what changed your mind — not a list of titles.

Done when the window's captures and changes are synthesized into one dated digest, every claim linked to the page behind it.
