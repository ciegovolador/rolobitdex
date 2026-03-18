## Context

Rolobitdex currently has 75+ Jest unit tests covering the database layer (contacts, trades, silent payments, backup) and utility modules. QA testing is done via gstack's `/qa` and `/browse` skills against the web build. However, there is no:

1. Dedicated E2E test suite that exercises full user flows (add contact → create trade → complete trade)
2. Review role that evaluates changes specifically for testability and coverage impact
3. CI integration for automated test runs beyond `npm test`

The project already has two domain-specific review roles (Bitcoiner and Cypherpunk) that follow the same pattern: a skill file defining five rated dimensions with interactive scoring 0-10. The Automation Tester review role follows this exact pattern.

## Goals / Non-Goals

**Goals:**
- Create an Automation Tester review role (`/plan-automation-tester-review`) following the established Bitcoiner/Cypherpunk pattern
- Define E2E testing conventions and infrastructure for the project
- Integrate the new role into the gstack lifecycle as an informational review gate
- Update skill chaining patterns to include the automation tester at the right position

**Non-Goals:**
- Full CI/CD pipeline setup (future work, depends on hosting decisions)
- Replacing the existing Jest unit test suite
- Making the automation tester review a required gate (it remains informational)
- Performance testing or load testing infrastructure

## Decisions

### Decision 1: Review role follows existing five-dimension pattern
**Choice**: Five scored dimensions (Test Coverage, Regression Safety, E2E Readiness, Testability, CI Integration), each rated 0-10 with "what makes it a 10" guidance.

**Why**: The Bitcoiner and Cypherpunk roles both use this exact pattern. Consistency makes the new role immediately familiar to developers and fits into the existing dashboard/chaining infrastructure.

**Alternative**: A simpler pass/fail checklist. Rejected because scored dimensions provide more nuance and match the interactive review style of existing roles.

### Decision 2: Skill file lives at `.claude/skills/plan-automation-tester-review.md`
**Choice**: Standard gstack skill file location and naming convention.

**Why**: All plan review skills follow the `plan-<role>-review` naming pattern. The skill file contains the system prompt, dimension definitions, and thought leader channels.

### Decision 3: E2E framework choice — Maestro for mobile, Playwright for web
**Choice**: Maestro for React Native mobile flows, Playwright for the Expo web build.

**Why**: Maestro is purpose-built for React Native E2E testing with YAML-based test flows — minimal boilerplate, works with Expo. Playwright handles web testing and is already compatible with the `/browse` headless browser pattern. Detox was considered but requires more native build configuration.

**Alternative**: Detox for mobile. Rejected because Detox requires native builds and ejecting from Expo's managed workflow, which conflicts with the project's Expo-first approach.

### Decision 4: Automation Tester review positioned after Eng, before Design in chains
**Choice**: The automation tester review runs after `/plan-eng-review` and before `/plan-design-review` in skill chains.

**Why**: The eng review locks down architecture; the automation tester review evaluates testability of that architecture before design polish. Testing concerns should be raised before visual design work begins.

### Decision 5: Review channels QA and testing thought leaders
**Choice**: Channel Kent Beck (TDD), Martin Fowler (test pyramid), Michael Bolton (exploratory testing), James Bach (context-driven testing), Lisa Crispin (agile testing quadrants).

**Why**: These represent complementary testing philosophies — from strict TDD to exploratory and context-driven approaches. This mirrors how Bitcoiner channels Satoshi/Finney and Cypherpunk channels Schneier/Bernstein.

## Risks / Trade-offs

- **[E2E tests are brittle]** → Mitigated by using Maestro's YAML flows which are more resilient to UI changes than selector-based tests. Keep E2E tests focused on critical happy paths only.
- **[Review role overload]** → Five review roles may feel heavy. Mitigated by keeping automation tester informational (never blocks shipping) and only recommending it when changes touch testable user flows.
- **[Maestro learning curve]** → Mitigated by providing sample test flows as part of the E2E scaffolding. Maestro's YAML syntax is simpler than Detox/Appium.
- **[CI not set up yet]** → The CI Integration dimension can still score and advise on CI-readiness even before a pipeline exists. Infrastructure can follow.
