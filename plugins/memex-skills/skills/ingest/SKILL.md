---
name: ingest
description: Ingest a source into the wiki — fetch a URL or video, or sweep the raw inbox, then file a durable summary, a raw backstop, and fold it into every page it touches.
argument-hint: "[source]"
disable-model-invocation: true
---

Ingest a source into the wiki — a durable summary, a raw backstop, folded into every page it touches.

Resolve the vault per [`references/vault.md`](../../references/vault.md), then read its `AGENTS.md` and run this in the vault's own terms.

## Get the raw

Start from whichever entry point you were invoked with:

- **A source given** — a URL in the argument, or the source under discussion. Fetch it and save the full text verbatim to the **raw inbox** (Markdown, PDF, or image). Interactive by default: read it, talk the takeaways over with the user, then file.
  - **A video URL** — YouTube, Vimeo, TED, or any other site yt-dlp supports: its full text is the transcript. Run [`scripts/fetch_transcript.sh`](scripts/fetch_transcript.sh) `<url>`; its header documents the output. Exit 4: rerun with the title's language as the second argument, or ask the user when the title doesn't show it. Any other failure: report the script's error output and stop — a video summary comes from its transcript alone.
- **No argument** — sweep the **raw inbox** for clips the user captured but never filed (Web Clipper output, no processed stamp). Batch them with less back-and-forth.

## File it

For each raw item:

1. Write one page in **source summaries** that preserves the source's arguments, evidence, and caveats.
2. Fold the source into every **evergreen page** it touches — the concepts it informs and the entities it names, often many. Update every one that exists; link the rest as **candidates**.
3. Stamp the raw item processed so the next sweep skips it. Never edit the raw beyond the stamp.

Done when every raw item has a source summary and every page it touches reflects it — updated if it exists, linked as a candidate if not.
