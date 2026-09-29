# Skills for Everyday Software Engineering

![Agency Skills banner](assets/agency-skills-banner-dark-0375.png)

> Coding and execution can be delegated to agents. The agency is still yours.

Jehuda's daily driver Claude Code skills marketplace.

Agency Skills is built for issue-driven development: pull an issue from any issue tracker (GitLab, GitHub, Jira, or Linear), cut a branch, plan, implement, review, commit, and open a change request.

Spec Kit and BMad are popular spec-driven development frameworks, but they introduce more process and context bloat than the typical engineering workflow needs. Not every issue warrants a spec, and engineers working from a groomed backlog do not need product discovery or UX design skills in the same toolchain. Agency Skills are human-invocable only, meaning they do not bloat your model's system prompt and agents cannot invoke them implicitly. Simple, minimal, and built with YAGNI philosophy in mind.

I am a fan of Matt Pocock's skills. In fact, I built Agency Skills using his [`/writing-for-agents`](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md) skill. These skills were created to fill gaps I encountered in my day-to-day work as a product engineer. See [how Agency Skills overlap with Matt Pocock Skills](#how-agency-skills-overlap-with-matt-pocock-skills).

## Installation

Agency Skills depend on [Matt Pocock Skills](https://github.com/mattpocock/skills) for [`/grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md), [`/to-tickets`](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md), [`/tdd`](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md), and [`/code-review`](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md).

Claude Code and Codex install both Agency Skills and Matt Pocock Skills as plugins. OpenCode installs Agency Skills as a plugin and Matt Pocock Skills through the skills CLI. Other harnesses install both skill sets through the skills CLI.

<details>
<summary><big><strong>Claude Code</strong></big></summary>

Run from your terminal:

```bash
npx @jehudarajasa/agency-skills@latest install claude
```

</details>

<details>
<summary><big><strong>Codex</strong></big></summary>

```bash
npx @jehudarajasa/agency-skills@latest install codex
```

</details>

<details>
<summary><big><strong>OpenCode and Other Harnesses</strong></big></summary>

```bash
npx @jehudarajasa/agency-skills@latest install opencode
```

Replace `opencode` with your agent's name.

</details>

## Setup

Run [`/setup-agency-skills`](plugins/agency-skills/skills/setup-agency-skills/SKILL.md) (or `$setup-agency-skills` for Codex) once per project to detect your issue tracker and map your board's workflow states into `.agents/config.yml` (see [`config.example.yml`](plugins/agency-skills/config.example.yml)).

## Workflow

![Agency skills workflow](assets/agency-skills-workflow.excalidraw.svg)

### 1. [`/fetch-issues`](plugins/agency-skills/skills/fetch-issues/SKILL.md)

List your open issues in the project's issue tracker so you can pick one.

### 2. [`/cut-branch`](plugins/agency-skills/skills/cut-branch/SKILL.md)

Cut a branch named after the issue in `<type>/<issue-id>-<slug>` format.

### 3. [`/plan-implementation`](plugins/agency-skills/skills/plan-implementation/SKILL.md) (Optional)

This is the load-bearing skill within the workflow, where you will likely spend most of your time. The generated plan is the agreed contract between you and your agent.

Issues often come off the board thin—a title, a sentence, whatever grooming left behind. This is where you and the agent turn that into a concrete plan, and `/grilling` grills it out first when a real decision is still open. The plan is yours; the typing is the agent's. Plans follow the [issue workspace layout](plugins/agency-skills/references/issue-workspace.md) under `.issues/<issue-id>-<slug>/`. See [why plans are persisted locally](#why-plans-persist-locally).

When the issue's intended behavior, affected scope, and verification are already clear, go straight to [`/implement-change`](#4-implement-change). It follows a saved plan when one exists; otherwise it works directly from the issue. Planning is driven by unresolved decisions, not the number of files involved.

### 4. [`/implement-change`](plugins/agency-skills/skills/implement-change/SKILL.md)

Implement from a saved plan or clear issue requirements. In repositories that already have tests, implementation runs through TDD. This skill tells your agent to verify and stop before review and commit. See [why implementation stops before commit](#why-implementation-stops-before-commit).

### 5. [`/code-review`](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md)

In this step, you can review the agent's work by hand, with Matt Pocock's `/code-review`, or both. The skill reviews the changes against two independent axes: the repository's documented standards and the originating issue or plan.

Skip directly to [`/commit`](#6-commit) for trivial changes that do not warrant a full code review, such as comment edits or typo fixes.

### 6. [`/commit`](plugins/agency-skills/skills/commit/SKILL.md)

Create small [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), one concern each.

### 7. [`/open-change-request`](plugins/agency-skills/skills/open-change-request/SKILL.md)

Open a pull or merge request, assign it to yourself, and move the issue to the review state.

## Supporting Skills

### i. [`/update-plan`](plugins/agency-skills/skills/update-plan/SKILL.md)

Re-synthesize the plan when context grows. Spikes and research tasks may surface new information that changes the plan's assumptions, scope, or approach.

### ii. [`/where-were-we`](plugins/agency-skills/skills/where-were-we/SKILL.md)

Reorient yourself on the issue's current state after a long break and identify the next step.

### iii. [`/help-me-understand`](plugins/agency-skills/skills/help-me-understand/SKILL.md)

Explain how a tech stack, feature, or workflow in the codebase works. If `/grilling` extracts decisions, `/help-me-understand` builds your comprehension through guided rounds and checkpoint questions.

**Bonus**: Add an audience to the prompt to tailor the explanation's vocabulary and depth:

```
/help-me-understand the universe pipeline for a PM
```

## Rationales

### How Agency Skills Overlap with Matt Pocock Skills

Matt Pocock's Skills cover the full **idea → ship** path, well suited to a sole decision-maker who creates the tickets: [`/grill-with-docs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md) → [`/to-spec`](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md) → [`/to-tickets`](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md) → [`/implement`](https://github.com/mattpocock/skills/blob/main/skills/engineering/implement/SKILL.md).

Agency Skills are **downstream**, starting with issues your team has already groomed and placed on the board. They reuse Matt's focused skills where useful—`/grilling`, `/to-tickets`, `/tdd`, and `/code-review`—and add the tracker-aware steps around them: pull an issue, cut a branch, plan, implement, commit, and open the change request.

### Why Plans Persist Locally

Plans live in the repository's `.issues/` directory instead of the issue tracker so I can read and edit them inline with the code in my editor. Any agent session can resume from the same files and reference decisions made in other plans too.

You can also put supporting files, such as PRD docs and CSVs inside the issue workspace directory—this setup creates a neat home for each issue. The tracker only carries the issue state for the team to see.

<img src="assets/issue-workspace-directory-example.png" alt="Example issue workspace directory" width="375">

### Why Implementation Stops Before Commit

Matt Pocock's `/implement` bundles implementation, code review, and commit. I keep these steps separate because even frontier models still need adjustments or steering after implementation and review, especially for changes with a large blast radius. I need to review the full diff before committing so I can keep my commit history clean.

## License

[MIT](LICENSE)
