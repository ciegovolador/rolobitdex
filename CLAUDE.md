# CLAUDE.md

## gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

Available skills:
- `/plan-ceo-review` - CEO/founder-mode plan review
- `/plan-eng-review` - Eng manager-mode plan review
- `/plan-design-review` - Designer's eye review of a live site
- `/design-consultation` - Design system consultation
- `/review` - Pre-landing PR review
- `/ship` - Ship workflow (merge, test, review, bump, PR)
- `/browse` - Fast headless browser for QA and dogfooding
- `/qa` - QA test and fix bugs
- `/qa-only` - Report-only QA testing
- `/qa-design-review` - Designer's eye QA with fixes
- `/setup-browser-cookies` - Import browser cookies for authenticated testing
- `/retro` - Weekly engineering retrospective
- `/document-release` - Post-ship documentation update

If gstack skills aren't working, run `cd .claude/skills/gstack && ./setup` to build the binary and register skills.
