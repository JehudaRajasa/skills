<!-- Template constitution for memex-skills. Copy it to your vault root as AGENTS.md, then:
- Rename the folders in Layers to yours. Keep each row's bold role: it is the name the skills look for.
- Seed the domain tag list with your own subjects, or let it grow as you approve the agent's proposals.
- For Claude Code, add a CLAUDE.md beside it that contains `@AGENTS.md`.
- Create an empty index.md and log.md beside it.
- Delete this comment. -->

# LLM Wiki

This Obsidian vault is an **LLM Wiki** (Karpathy pattern): the human captures, the agent ingests and maintains. Obsidian is the IDE, you (the agent) are the programmer, this wiki is the codebase.

## Orient First (Every Session)

1. Read `index.md` — the catalog of every page.
2. Read the last entries of `log.md` — recent activity.

End every operation by updating `index.md` (if pages changed) and appending to `log.md`.

## Layers (Who Owns What)

| Folder | Owner | Role |
| --- | --- | --- |
| `Sources/` | Agent | **Summary layer** — one self-contained summary page per ingested article, paper, or video, enough that it survives link rot. Stable once written. |
| `Sources/Raw/` | Shared | **Raw inbox** — immutable full-text clips: the human's captures (Web Clipper output) and the agent's saves (article → Markdown, PDF, images). The link-rot backstop and the feedstock for ingest. |
| `Wiki/` | Agent | **Evergreen pages** — cross-linked concept and entity pages. The compounding knowledge. |
| `Digests/` | Agent | **Digest layer** — dated syntheses of a window (day/week/month), one file per window: `<window> <date>.md`. |

The **index** (`index.md`, the page catalog) and the **log** (`log.md`, the audit trail) live at the vault root beside this file. Folders not listed above hold the human's own notes: read them when relevant, and edit them only when the human asks.

## Frontmatter

Every `Sources/`, `Wiki/`, and `Digests/` page:

```yaml
---
title: <Title Case>
type: source | concept | entity | digest
summary: <one line — shown in the index>
aliases: [] # acronyms & alternate names so [[RAG]] resolves
created: YYYY-MM-DDTHH:MM:SS±HH:MM
updated: YYYY-MM-DDTHH:MM:SS±HH:MM
status: draft | living | stable
tags: [] # hierarchical domain tags — see Tags below
source_url: <sources only>
source_type: article | paper | video # sources only
author: <sources only — the writer; for a video, the channel>
published: YYYY-MM-DD # sources only — the source's own date
raw: "[[Sources/Raw/<slug>]]" # sources only — the full-text capture
---
```

`Sources/Raw/` clips stay as captured. After ingesting a clip, stamp it `processed: YYYY-MM-DDTHH:MM:SS±HH:MM` (when you processed it) — the one edit a clip ever gets. A clip with no stamp, or modified more than a minute after it (writing the stamp itself takes seconds), is **unprocessed**.

## Tags

Tag every `Sources/` and `Wiki/` page with one or more hierarchical domain tags (`ai`, `ai/agent`) from the list below; they group the digests and `index.md`. The human approves every new tag: when no listed tag fits, tag the page `misc` and propose a new tag or subtag to the human, then add it to the list once they approve.

**Domain tags:**

- `misc` — pages no listed tag fits yet

## Page Types

- **Capture** (`Sources/Raw/`) — clips, raw, no bar to entry.
- **Source** (`type: source`) — create when a _single_ article, paper, or video is substantial enough to summarize on its own. A throwaway link can be cited inline on a concept page instead.
- **Concept** (`type: concept`) — an idea, technique, term, or principle (RAG, Compound Interest). Extend one whenever an idea recurs or is clearly durable; prefer extending an existing page over creating a near-duplicate.
- **Entity** (`type: entity`) — a named person, org, product, place, or event (Andrej Karpathy, Obsidian). Entities link to the concepts they exemplify; concepts link to key entities.

A new concept or entity page is the human's pick. Until then, link it as an unresolved `[[link]]` — a **candidate** — and `lint-wiki` offers it, ranked by how many pages mention it.

## Page Shape

### Concept & Entity Pages

```
## Summary       — 1–3 sentences, the gist
## <body>        — sections as needed
## Sources       — [[links]] to Sources/ pages + external URLs
## Related       — [[links]] to sibling pages
```

Small pages may be just Summary + Sources. Link liberally with `[[Page Name]]` — associative trails are the whole point.

### Source Pages

Start at `## Summary`; the title lives in the frontmatter.

```
## Summary  — 2–3 sentences; the first states the source's main claim
## Notes    — the claims: 5–12 bold full-sentence lines, support nested under each
## Quotes   — 0–2 verbatim lines, each with speaker and locator
```

- **Notes** — each bold line is a claim the source makes; an opinion or forecast names who holds it. Link concepts and entities inline as `[[links]]`: these claims are what ingest folds into `Wiki/`. End each support bullet with a locator — `[mm:ss]` for a video, `§Section` for an article, `p. N` for a paper. Bold the top-level lines only. Reach for a table or Mermaid diagram where the structure is visual (a comparison, a flow).
- **Summary** — says only what the Notes back.
- **Quotes** — copied from the raw capture, so each one checks against it. Omit the section when nothing is quotable.

## Answering Questions

Answer from the wiki's pages, cited as `[[links]]`. When an answer has lasting value — a comparison, an analysis, a connection you discovered — offer to **file it back** as a new `Wiki/` page; it may be a page, a table, or a Marp deck.

## Conventions

- One concept per page; split a page when it drifts into two.
- Titles in Title Case, singular ("Multi-Agent System", not "agents").
- A filename (`<slug>`) is the page title with each of `\ / : * ? " < > | # [ ] ^` replaced by `-`.
- Absolute timestamps — ISO 8601 with the local timezone offset (`YYYY-MM-DDTHH:MM:SS±HH:MM`; `date -Iseconds` prints one), never "today".
- `log.md` entries: one plain paragraph each, `[YYYY-MM-DDTHH:MM:SS±HH:MM] <op> | <summary>` — keep them grep-able (`grep "^\[" log.md`).
- `index.md` is the catalog _you_ maintain and read first: one line per `Wiki/` and `Sources/` page, `- [[<slug>]] — <summary>`, under the heading of its first domain tag's top-level tag (`ai/agent` sits under `` ## AI `#ai` ``). One heading per top-level tag in use; within each, `Wiki/` pages first, then `Sources/`.
- Bookkeeping (index, log, cross-links, aliases) is the agent's job.
