## Context

The `branch-per-change-workflow` change established that `/opsx:propose` creates a branch from main, commits artifacts, and pushes. `/opsx:apply` also pushes on completion. The user wants to simplify: all work stays local until `/opsx:archive` completes, at which point everything is committed and pushed in one shot.

## Goals / Non-Goals

**Goals:**
- `/opsx:propose` creates branch from main but does NOT commit or push
- `/opsx:apply` works locally, does NOT push
- `/opsx:archive` commits all work and pushes the branch to origin as the final step

**Non-Goals:**
- Changing branch naming convention (stays `opsx/<change-name>`)
- Preventing manual intermediate commits (developer can still commit whenever they want)

## Decisions

### Single commit+push at archive time
All artifacts and implementation stay uncommitted (or locally committed) until archive. The archive step does `git add`, `git commit`, `git push`. This makes the remote branch a clean "done" signal. Alternative: push after each phase — rejected because it clutters the remote with WIP.

### CLAUDE.md is the enforcement point
Since this is convention-based (no git hooks), CLAUDE.md instructions are what Claude reads. The specs document the requirement; CLAUDE.md makes it actionable.

## Risks / Trade-offs

- [Work loss if session crashes before archive] → Developer can manually commit at any time; this convention is about the automated push, not preventing local commits.
- [Large single commit] → Acceptable for workflow changes; for code changes, the developer or `/ship` can create atomic commits before archive.
