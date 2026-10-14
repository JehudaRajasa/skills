---
name: lint-wiki
description: Health-check the whole wiki — contradictions, stale claims, orphans, gaps — plus where it should grow next, with candidate pages for the user to pick. Report, auto-fix the safe ones, write the picks.
disable-model-invocation: true
---

Health-check the whole wiki: sweep every page for what's broken or missing, report it, fix the safe ones in place, and write the candidate pages the user picks. Run it periodically as the wiki grows.

Resolve the vault per [`references/vault.md`](../../references/vault.md), then read its `AGENTS.md` and run this in the vault's own terms.

## Checks

Run every check across the wiki — a full sweep, not a spot-check. Add any the constitution defines on top of these.

- **Contradictions** — pages that disagree; a newer source should have superseded an older claim, and hasn't.
- **Stale claims** — a claim a later source has overturned, still standing unreconciled.
- **Stale pages** — a page still marked as growing whose last update is months old.
- **Orphans** — evergreen pages with no inbound links.
- **Duplicates** — two pages for one concept or entity.
- **Missing cross-references** — pages that should link to each other and don't.
- **Unlisted tags** — a tag the constitution's tag list leaves out, on a page the constitution says to tag: an agent's slip, or a tag the user added by hand. Report each with the pages that carry it; the user approves it onto the list or has it replaced.
- **Missing aliases** — an acronym or alternate name the wiki uses for a page that its aliases don't list, so links by that name break.
- **Data gaps** — a question the wiki raises but never answers, fillable with a web search.
- **Unfiled clips** — raw inbox items ingest never filed. The fix is `/memex-skills:ingest` with no argument, which files them all.

Then the generative half — where the wiki should grow next:

- **Candidates** — concepts and entities with no page of their own: every unresolved link, and every name that recurs across pages unlinked.
- **New questions** worth investigating from what's already here.
- **New sources** worth hunting down to fill the thin spots.

## Report and fix

Report every finding. Auto-fix only the safe, mechanical ones — a missing cross-reference, a missing alias, or a broken link whose page exists under another title or alias (point it there). Leave the judgment calls — contradictions, stale claims, what to reconcile — for the user to rule on.

Report the candidates as a pick list, ranked by how many pages mention each, with those pages as its evidence. Write the ones the user picks from the pages that mention them, and link their unlinked mentions; the rest stay candidates.

Done when every check has run across the wiki, each finding is either fixed or reported, and every candidate the user picked is a page.
