## Context

The project has a rich set of gstack skills across four phases but they are currently invoked manually. The user wants Claude to work autonomously — like a one-person company — running the full pipeline for every change without being told which skills to use.

## Goals / Non-Goals

**Goals:**
- `/opsx:propose` automatically determines change scope and runs relevant plan reviews before generating artifacts
- `/opsx:archive` commits all work and pushes to origin
- Branch creation from main happens at propose time
- CLAUDE.md documents the autonomous convention so Claude follows it in every session
- Scope detection logic: if change touches UI → design + a11y reviews; if touches Bitcoin/payments → bitcoiner + cypherpunk reviews; if touches testable code → automation tester review; always run eng review

**Non-Goals:**
- Automating `/ship` or `/qa` (these require running the app, which may not be available)
- Making reviews blocking (they remain informational except eng review)
- CI/CD integration

## Decisions

### Scope-based auto-detection in CLAUDE.md instructions
Rather than hard-coding review selection, document a decision tree in CLAUDE.md that Claude evaluates at propose time. This keeps it flexible — Claude reads the description, determines which domains are affected, and runs the appropriate reviews. No code needed.

### Autonomous lifecycle convention
Add an "Autonomous Workflow" section to CLAUDE.md that says: "When the user runs `/opsx:propose`, Claude SHALL automatically: (1) create branch from main, (2) analyze change scope, (3) run all relevant plan reviews, (4) generate OpenSpec artifacts. When the user runs `/opsx:archive`, Claude SHALL: (1) commit all work, (2) push to origin."

### Reviews run inline, not as separate invocations
Rather than spawning separate skill invocations, Claude applies the review criteria inline during propose. This avoids context-switching overhead and keeps the flow smooth.

## Risks / Trade-offs

- [Reviews add time to propose] → Acceptable; the user explicitly wants thoroughness over speed. Reviews are the value.
- [Claude may misjudge scope] → The decision tree in CLAUDE.md provides clear heuristics; Claude can always ask if scope is ambiguous.
