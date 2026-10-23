---
name: ingest
description: Ingest a source into the wiki — fetch a URL or video, or sweep the raw inbox, then preserve the raw source, write its source summary, and fold it into every page it touches.
argument-hint: "[source]"
disable-model-invocation: true
---

Ingest a source into the wiki — preserve the raw source, write its source summary, and fold it into every page it touches.

Resolve the vault per [`references/vault.md`](../../references/vault.md).

## Get the raw source

Start from whichever entry point you were invoked with:

- **A source given** — a URL in the argument. Fetch it and save the full text verbatim as a raw source in the **raw inbox** (Markdown, PDF, or image). Interactive by default: read it, talk the takeaways over with the user, then file.
  - **A video URL** — YouTube, Vimeo, TED, or any other site yt-dlp supports: its full text is the transcript. Run [`scripts/fetch_transcript.sh`](scripts/fetch_transcript.sh) `<url>`; its header documents the output. Exit 4: rerun with the known spoken language as argument 2; ask the user if unknown. Any other failure: report the script's error output and stop.
- **No argument** — sweep the **raw inbox** for every raw source the constitution defines as **unprocessed**, including previously processed ones that have changed. Batch them with less back-and-forth.

## File it

For each raw source:

1. Write one page in **source summaries** that preserves the source's arguments, evidence, and caveats. When reprocessing the same source, update its existing source summary.
2. Fold the source into every **evergreen page** it touches — the concepts it informs and the entities it names, often many. Update every matching evergreen page; link the rest as **candidates**, using their intended evergreen paths when names collide.
3. After steps 1–2 succeed, set or refresh the raw source's processed stamp so the next sweep skips it. Never edit the raw source beyond the stamp.

Done when every raw source has a source summary and every concept or entity it touches has either an updated evergreen page or a candidate link to its intended evergreen path.
