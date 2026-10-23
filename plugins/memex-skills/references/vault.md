# Resolving the vault

Every wiki skill runs against a **vault** — an LLM Wiki (Karpathy pattern) whose root `AGENTS.md` (or `CLAUDE.md`) is the **constitution**. Resolve the vault the same way every run, read the constitution, and run the operation in the vault's own terms.

## Which vault

Take the first that resolves:

1. **Config** — the `vault` key in `.agents/config.yml` (project root), then `~/.agents/config.yml` (your default vault). The set-once, durable answer.
2. **Env** — `$MEMEX_VAULT`, a per-shell override.
3. **Marker** — you're working inside the vault: the nearest ancestor of the working directory whose root `AGENTS.md`/`CLAUDE.md` declares the LLM Wiki pattern. Resolves with zero config when you invoke from inside the vault.
4. **Ask** — none resolve: ask the user for the path, then offer to write it to `~/.agents/config.yml` so the next run skips this.

## The constitution binds the specifics

The skills speak in **roles**; the constitution binds each role to this vault's concrete paths, frontmatter, and page shape. Match roles by purpose, using only the paths and field names the constitution defines. The roles a skill may name:

- **raw inbox** — holds immutable **raw sources**, the link-rot backstop and the feedstock ingest sweeps.
- **source summaries** — one self-contained page per ingested source, preserving its arguments, evidence, and caveats for convenient review.
- **evergreen pages** — the cross-linked concept and entity pages, the compounding knowledge. New ones are the user's pick: a concept or entity without a matching evergreen page stays an unresolved `[[link]]` — a **candidate** — until the user picks it in `lint-wiki`, even if a raw source, source summary, digest, or human note has the same name.
- **digests** — dated snapshots of a window (day/week/month). Preserve their wording and claims; allow only mechanical link and metadata repairs that preserve meaning.
- **index** and **log** — the map the agent maintains, and the audit trail it appends.

Resolve links by the intended page's role as well as its name. For name collisions, use the intended page's vault-relative path, including the future evergreen path for candidates, and preserve the display name with `[[path/to/Page|Page]]`.

The constitution also owns the **session-close protocol** — what to update and append when an operation ends. Follow it; the skill body carries only its own operation.

## Access

A vault outside the working directory may not be readable until the user grants access. If a read or write is denied or prompts, that's the signal: ask the user to grant it — in-session `/add-dir "<vault>"`, permanently via `permissions.additionalDirectories`, or by approving the prompt. If the constitution itself is unreadable, stop and say so; the vault is the source of truth, so build nothing to stand in for it.
