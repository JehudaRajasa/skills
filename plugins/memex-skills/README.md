# Memex Skills

Skills for an [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), Andrej Karpathy's pattern for a personal knowledge base that an agent maintains. You collect sources and ask questions; the agent summarizes, cross-links, and keeps the wiki consistent as it grows.

There are three skills: [`/ingest`](#1-ingest) files and summarizes sources; [`/digest`](#2-digest) connects what you learned over a day, week, or month; and [`/lint-wiki`](#3-lint-wiki) finds problems in your wiki, fixes them, and suggests new pages. They follow your vault's **constitution** (`AGENTS.md` or `CLAUDE.md`), so the folder names and page formats stay yours. Like [Agency Skills](../agency-skills), they are human-invocable only: they add nothing to your model's system prompt, and agents cannot invoke them implicitly.

## The Pattern

Karpathy's gist describes three architectural layers and leaves the implementation to you:

| Layer | What it holds | Who writes it |
| --- | --- | --- |
| Raw sources | Preserved full-text originals saved locally, available when their URLs stop working | You and the agent |
| Generated wiki | Knowledge the agent compiles from those sources and maintains as it grows, plus an index and activity log | The agent; you pick new evergreen pages |
| Schema | Your vault's constitution: folder mappings, frontmatter, tags, page formats, and workflows | You and the agent |

The generated wiki contains three kinds of content:

- **Source summaries** — one page per ingested article, paper, or video, preserving its author's arguments, evidence, and caveats. The length fits the source: a short announcement may need a paragraph; a paper may warrant detailed notes.
- **Evergreen pages** — concept and entity pages that connect what you learn across sources and evolve as your understanding changes.
- **Digests** — reviews of logged ingests and evergreen changes for a completed calendar period.

Raw sources protect against link rot. Source summaries make individual sources easy to revisit; evergreen pages bring their contributions together while keeping each author's claims attributed.

The **constitution** maps each content role to a folder, so the paths stay yours. The [template](AGENTS.example.md) uses `Sources/` as the raw inbox for raw sources, `Wiki/` for concept and entity pages, `Wiki/Summaries/` for source summaries, and `Wiki/Digests/` for digests.

## Installation

Claude Code, Codex, and OpenCode install Memex Skills as a plugin. Other harnesses install its skills through the [skills CLI](https://github.com/vercel-labs/skills).

<details>
<summary><big><strong>Claude Code</strong></big></summary>

Run from your terminal:

```bash
claude plugin install memex-skills --marketplace jehudarajasa/skills
```

</details>

<details>
<summary><big><strong>Codex</strong></big></summary>

```bash
codex plugin marketplace add jehudarajasa/skills
codex plugin add memex-skills@jehudarajasa
```

</details>

<details>
<summary><big><strong>OpenCode</strong></big></summary>

```bash
opencode plugin --global @jehudarajasa/memex-skills
```

</details>

<details>
<summary><big><strong>Other Harnesses</strong></big></summary>

```bash
npx skills add https://github.com/jehudarajasa/skills/tree/skills-dist/plugins/memex-skills --global --agent cursor --skill '*'
```

Replace `cursor` with your agent's name.

</details>

Video ingest requires [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) and [`jq`](https://jqlang.org) on your `PATH`, plus captions in the video's spoken language.

## Setup

Copy [`AGENTS.example.md`](AGENTS.example.md) to your vault's root as `AGENTS.md`, then follow the comment at its top: rename the folders to yours, seed your tags, add a `CLAUDE.md` that imports it, and create an empty `index.md` and `log.md`. Or let your agent do it: give it the template's link and your vault's path, and ask it to follow the comment. It can map folders you already have onto the roles.

Already have notes in the vault? Folders not listed in the constitution stay yours: the agent reads them when relevant and edits them only when you ask.

## Skills

Run the skills from inside your vault. See [vault configuration](references/vault.md) to set a default vault.

### 1. [`/ingest`](skills/ingest/SKILL.md)

File a source into the wiki. Give it the URL of an article, paper, or video: it saves the full text as a raw source in the raw inbox, talks the takeaways over with you, and writes the source summary. Run it with no argument to process every raw source your constitution defines as unprocessed. Either way, it updates every evergreen page the source touches and links the missing ones as [candidates](#why-new-pages-are-your-pick).

```
/memex-skills:ingest https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
/memex-skills:ingest
```

### 2. [`/digest`](skills/digest/SKILL.md)

Review logged ingests and evergreen changes for the last completed day, week, or month with claims linked to their pages. Reruns return the existing digest unchanged.

```
/memex-skills:digest week
```

### 3. [`/lint-wiki`](skills/lint-wiki/SKILL.md)

Health-check the whole wiki: contradictions, stale claims and pages, orphans, duplicates, missing links and aliases, and unprocessed raw sources. It fixes the mechanical problems, reports the rest for you to rule on, and suggests where the wiki should grow next. That includes the candidate pages, ranked by how many pages mention them, for you to pick.

## Rationales

### Why Skills Speak in Roles

The skills never name a folder. They name roles — raw inbox, source summaries, evergreen pages, digests, index, log — and the constitution maps each role to a folder. Rename `Wiki/` to `Notes/`, or change a page format, and the skills follow without an edit.

### Why New Pages Are Your Pick

Karpathy's version lets the agent create pages freely, and it will create a page for every concept and entity a source mentions, whether you need one or not. Ingest a few articles on Ralph loops and you get a Claude Code page too, though you already know what Claude Code is. Pages like that bloat the wiki. They bury the pages you do need, and every later ingest and lint has one more page to keep current.

So `/ingest` writes the source summary and updates the evergreen pages that already exist, but it creates none. A concept or entity without a page stays an unresolved `[[link]]`: a **candidate**. `/lint-wiki` lists the candidates, ranked by how many pages mention them, and writes only the ones you pick. Obsidian already shows unresolved links, so candidates need no extra file, and the ones you skip keep collecting mentions until they earn a page.

## License

[MIT](../../LICENSE)
