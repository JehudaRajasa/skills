<!-- Template constitution for memex-skills. Copy it to your vault root as AGENTS.md, then:
- Rename the folders in Architecture and Roles to yours.
- Seed the domain tag list with your own subjects, or let it grow as you approve the agent's proposals.
- For Claude Code, add a CLAUDE.md beside it that contains `@AGENTS.md`.
- Create an empty index.md and log.md beside it.
- Delete this comment. -->

# LLM Wiki

This Obsidian vault is an **LLM Wiki** (Karpathy pattern): the human captures, the agent ingests and maintains. Obsidian is the IDE, you (the agent) are the programmer, this wiki is the codebase.

## Orient First (Every Session)

1. Read `index.md` — the catalog of every page.
2. Read the last entries of `log.md` — recent activity.

After changing the vault, update `index.md` (if pages changed) and append to `log.md`.

## Architecture and Roles

The architectural layers are **raw sources**, the **generated wiki**, and the **schema** (this `AGENTS.md`). Source summaries, evergreen pages, and digests are content within the generated wiki.

| Layer | Folder | Owner | Role |
| --- | --- | --- | --- |
| Raw sources | `Sources/` | Shared | **Raw inbox** — immutable raw sources: preserved originals the human captures (Web Clipper output) or the agent saves (article → Markdown, PDF, images). The link-rot backstop and the feedstock for ingest. |
| Generated wiki | `Wiki/Summaries/` | Agent | **Source summaries** — one self-contained page per ingested article, paper, or video, preserving its arguments, evidence, and caveats. Update it when the raw source changes. |
| Generated wiki | `Wiki/` | Agent | **Evergreen pages** — cross-linked concept and entity pages. The compounding knowledge. |
| Generated wiki | `Wiki/Digests/` | Agent | **Digests** — dated syntheses of a window (day/week/month), one file per window: `<window> <date>.md`. |

The **index** (`index.md`, the page catalog) and the **log** (`log.md`, the audit trail) live at the vault root beside this file. Folders not listed above hold the human's own notes: read them when relevant, and edit them only when the human asks.

## Frontmatter

Every generated page in `Wiki/`, including `Wiki/Summaries/` and `Wiki/Digests/`:

```yaml
---
title: <Title Case>
type: source | concept | entity | digest
summary: <one line — shown in the index>
aliases: [] # acronyms & alternate names for discovery
created: YYYY-MM-DDTHH:MM:SS±HH:MM
updated: YYYY-MM-DDTHH:MM:SS±HH:MM
tags: [] # hierarchical domain tags — see Tags below
source_url: <sources only>
source_type: article | paper | video # sources only
author: <sources only — the writer; for a video, the channel>
published: YYYY-MM-DD # sources only — include the source's publication date when known
raw: "[[Sources/<raw filename>]]" # sources only — the raw source
---
```

Raw sources in `Sources/` stay as captured. After successfully ingesting one, set or refresh its `processed: YYYY-MM-DDTHH:MM:SS±HH:MM` stamp. The stamp is the only raw source content the agent may edit. A modified raw source or one with no stamp is **unprocessed**.

## Tags

Tag every generated page in `Wiki/` with one or more hierarchical domain tags (`ai`, `ai/agent`) from the list below; they group the digests and `index.md`. The human approves every new tag: when no listed tag fits, tag the page `misc` and propose a new tag or subtag to the human, then add it to the list once they approve.

**Domain tags:**

- `misc` — pages no listed tag fits yet

## Page Types

- **Raw source** (`Sources/`) — preserved original, no bar to entry.
- **Source summary** (`type: source`) — one page per ingested article, paper, or video, faithful to that source.
- **Concept** (`type: concept`) — an idea, technique, term, or principle (RAG, Compound Interest). Extend one whenever an idea recurs or is clearly durable; prefer extending an existing page over creating a near-duplicate.
- **Entity** (`type: entity`) — a named person, org, product, place, or event (Andrej Karpathy, Obsidian). Entities link to the concepts they exemplify; concepts link to key entities.

A new concept or entity page is the human's pick. Until a matching evergreen page exists, link its intended path as an unresolved **candidate**, even if a raw source or human note has the same name. `lint-wiki` offers it, ranked by how many pages mention it.

## Page Shape

### Concept & Entity Pages

```
## Summary       — 1–3 sentences, the gist
## <body>        — sections as needed
## Sources       — [[links]] to Wiki/Summaries/ pages + external URLs
## Related       — [[links]] to sibling pages
```

Small pages may be just Summary + Sources. Link liberally with `[[Page Name]]` — associative trails are the whole point.

### Source Summaries

Start at `## Summary`; the title lives in the frontmatter. Match the detail to the source: a short announcement may need only a paragraph; a substantial paper may need detailed notes on its arguments, evidence, and caveats.

```
## Summary  — the source's main claim and takeaways
## Notes    — arguments, evidence, and caveats that need elaboration, when useful
## Quotes   — 0–2 verbatim lines, each with speaker and locator
```

- **Summary** — grounded in the raw source; the first sentence states the source's main claim.
- **Notes** — expand on the Summary when the source warrants it. Each bold line is a claim the source makes. End each support bullet with a locator — `[mm:ss]` for a video, `§Section` for an article, `p. N` for a paper. Bold the top-level lines only. Reach for a table or Mermaid diagram where the structure is visual (a comparison, a flow).
- **Quotes** — copied from the raw source, so each one checks against it. Omit the section when nothing is quotable.

Link concepts and entities inline in the Summary and Notes as `[[links]]`: these claims are what ingest folds into evergreen pages. Name who holds each opinion or forecast.

## Answering Questions

Answer from the wiki's pages, cited as `[[links]]`. When an answer has lasting value — a comparison, an analysis, a connection you discovered — offer to **file it back** as a new `Wiki/` page; it may be a page, a table, or a Marp deck.

## Conventions

- Propose a split for approval when a concept page covers distinct concepts.
- Titles in Title Case, singular ("Multi-Agent System", not "agents").
- A filename (`<slug>`) is the page title with each of `\ / : * ? " < > | # [ ] ^` replaced by `-`.
- Link existing pages by their actual filenames (`[[Page Name]]`); use `[[Page Name|Alias]]` to display an acronym or alternate name.
- When filenames collide, qualify the intended role's path, including candidate links: `[[Wiki/Vannevar Bush|Vannevar Bush]]` targets the evergreen page, even while only `Sources/Vannevar Bush.md` exists.
- Absolute timestamps — ISO 8601 with the local timezone offset (`YYYY-MM-DDTHH:MM:SS±HH:MM`; `date -Iseconds` prints one), never "today".
- `log.md` entries: one plain paragraph each, `[YYYY-MM-DDTHH:MM:SS±HH:MM] <op> | <summary>` — keep them grep-able (`grep "^\[" log.md`).
- `index.md` is the catalog _you_ maintain and read first: one line per generated page in `Wiki/`, including source summaries and digests, `- [[<page path>]] — <summary>`, under the heading of its first domain tag's top-level tag (`ai/agent` sits under `` ## AI `#ai` ``). One heading per top-level tag in use; within each, evergreen pages first, then source summaries, then digests.
