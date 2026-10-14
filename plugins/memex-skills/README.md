# Memex Skills

> "The part he couldn't solve was who does the maintenance. The LLM handles that." — Andrej Karpathy, on Vannevar Bush's Memex (1945)

Skills for an [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), Andrej Karpathy's pattern for a personal knowledge base that an agent maintains. You collect sources and ask questions; the agent summarizes, cross-links, and keeps the wiki consistent as it grows.

There are three skills: [`/ingest`](#1-ingest) files a source, [`/digest`](#2-digest) writes a dated review of a time window, and [`/lint-wiki`](#3-lint-wiki) health-checks the whole wiki. They work against any vault whose `AGENTS.md` describes it, so the folder names and page formats stay yours. Like [Agency Skills](../agency-skills), they are human-invocable only: they add nothing to your model's system prompt, and agents cannot invoke them implicitly.

## The Pattern

Karpathy's gist describes the idea and leaves the implementation to you. Memex Skills implements it in these layers:

| Layer | What it holds | Who writes it |
| --- | --- | --- |
| Raw inbox | Full-text captures, never edited — your Obsidian Web Clipper clips, and the sources `/ingest` fetches | You and the agent |
| Summary layer | One self-contained summary per article, paper, or video — enough that it survives link rot | The agent |
| Evergreen pages | Cross-linked concept and entity pages: the knowledge that compounds | The agent; you pick new ones |
| Digest layer | Dated reviews of a day, week, or month | The agent |
| Index and log | The catalog of every page, and the record of every operation | The agent |

Karpathy's third layer, the schema, is your vault's `AGENTS.md`. The skills call it the **constitution**: it maps each layer to a folder and sets the frontmatter, tags, and page formats.

## Installation

In Claude Code, run from your terminal:

```bash
claude plugin marketplace add JehudaRajasa/skills
claude plugin install memex-skills@jehudarajasa
```

Ingesting a video also needs [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) and [`jq`](https://jqlang.org) on your `PATH`. It works on any site yt-dlp supports, as long as the video has captions.

## Setup

Copy [`AGENTS.example.md`](AGENTS.example.md) to your vault's root as `AGENTS.md`, then follow the comment at its top: rename the folders to yours, seed your tags, add a `CLAUDE.md` that imports it, and create an empty `index.md` and `log.md`.

Or let your agent do it: give it the template's link and your vault's path, and ask it to follow the comment. It can map folders you already have onto the roles.

Already have notes in the vault? Folders the constitution doesn't list stay yours: the agent reads them when relevant and edits them only when you ask.

## Finding Your Vault

Every skill finds your vault the same way, taking the first that resolves:

1. **Config** — the `vault` key in `.agents/config.yml` at the project root, then in `~/.agents/config.yml`. Agency Skills shares this file.
2. **Environment** — `$MEMEX_VAULT`, for one shell.
3. **Marker** — you run the skill from inside the vault, whose `AGENTS.md` declares the LLM Wiki pattern. No setup needed.
4. **Ask** — the skill asks for the path, then offers to save it to `~/.agents/config.yml`.

```yaml
# ~/.agents/config.yml
vault: ~/Documents/Obsidian Vault
```

Running a skill from outside the vault? Claude Code may ask before it reads the vault. Approve the prompt, run `/add-dir` with the vault's path, or add the vault to `permissions.additionalDirectories` in your settings.

## Skills

### 1. [`/ingest`](skills/ingest/SKILL.md)

File a source into the wiki. Give it the URL of an article, paper, or video: it saves the full text to the raw inbox, talks the takeaways over with you, and writes the summary. Run it with no argument to file every clip you captured but never processed. Either way, it updates every evergreen page the source touches and links the missing ones as [candidates](#why-new-pages-are-your-pick).

```
/memex-skills:ingest https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
/memex-skills:ingest
```

### 2. [`/digest`](skills/digest/SKILL.md)

Write a dated review of a day, week, or month of what you learned. It reads the log to find what was filed and changed in the window, then writes one digest grouped by your tags, with each claim linked to its page.

```
/memex-skills:digest week
```

### 3. [`/lint-wiki`](skills/lint-wiki/SKILL.md)

Health-check the whole wiki: contradictions, stale claims and pages, orphans, duplicates, missing links and aliases, unapproved tags, and unfiled clips. It fixes the mechanical problems, reports the rest for you to rule on, and suggests where the wiki should grow next. That includes the candidate pages, ranked by how many pages mention them, for you to pick.

## Rationales

### Why Skills Speak in Roles

The skills never name a folder. They name roles — raw inbox, summary layer, evergreen pages, digest layer, index, log — and your constitution maps each role to a folder. Rename `Wiki/` to `Notes/`, or change a page format, and the skills follow without an edit.

### Why New Pages Are Your Pick

Karpathy's version lets the agent create pages freely, and it will create a page for every concept and entity a source mentions, whether you need one or not. Ingest a few articles on Ralph loops and you get a Claude Code page too, though you already know what Claude Code is. Pages like that bloat the wiki. They bury the pages you do need, and every later ingest and lint has one more page to keep current.

So `/ingest` writes the source's summary and updates the evergreen pages that already exist, but it creates none. A concept or entity without a page stays an unresolved `[[link]]`: a **candidate**. `/lint-wiki` lists the candidates, ranked by how many pages mention them, and writes only the ones you pick. Obsidian already shows unresolved links, so candidates need no extra file, and the ones you skip keep collecting mentions until they earn a page.

## License

[MIT](../../LICENSE)
