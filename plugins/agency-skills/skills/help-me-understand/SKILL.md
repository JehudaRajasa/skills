---
name: help-me-understand
description: Explain how a feature, pipeline, workflow, or concept in this codebase actually works.
argument-hint: "What do you want to understand?"
disable-model-invocation: true
---

Explain how something in this codebase works. Comprehension is the deliverable — measured by what the user can restate afterwards, not by how much you covered. Answer in chat; write a file only if they ask for one.

Match vocabulary and depth to the audience named in the argument (`for a PM`, `for a non-engineer`) or evident from the conversation.

## Trace first

Read the real path before writing a word — entry point to exit, in the actual code. Names lie, and so does parametric knowledge of how a thing "usually" works. Done when you can name every **hop** with a `file:line` and say what that hop decides.

## Size it

Count the hops the user must hold in their head at once.

- **One answer** if the mechanism fits in ~200 words plus one snippet, with no forward references.
- **Rounds** otherwise. The forward reference is the tell: if explaining hop 1 needs "more on that later", it's rounds.

## Open with the map

Both branches start here, in five lines or fewer: one sentence on what the thing is for, then the whole path as an arrow chain.

```
🗺 The universe module: question → normalize → cache lookup → compute → return 42. 5 hops.
```

In rounds mode the hop count is a contract — the user knows how far this goes.

## One answer

Map, the mechanism in your own words, one snippet of the lines that make the decision, and the one thing that would surprise someone reading the code cold. Stop there.

## Rounds

One hop per round, then wait for the user.

```
**Hop 3/5 — Cache lookup**

<2–4 sentences: what this hop does, in your own words>

<≤10 lines of code — the lines that make the decision, rest elided with `…`>

<one line: what breaks if this hop is removed>

❓ <checkpoint question>
```

The code is evidence, not the explanation. If the prose only works with the snippet in front of it, the prose isn't doing its job yet.

A checkpoint asks the user to predict or apply — "a repeat question comes straight back from the cache; what happens the first time one is asked?" — an answer only comprehension produces. Wrong or hedged: re-explain that hop from a different angle before moving on. A question back from them means the round landed — answer it, then resume.

They say skip, or name a hop: jump there.

## Recap

After the last hop, the whole thing in eight lines or fewer: the map again, each hop annotated with what it decides. This is the part they keep.
