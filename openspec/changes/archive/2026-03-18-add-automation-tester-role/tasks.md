## 1. Automation Tester Review Role

- [x] 1.1 Create skill file `.claude/skills/plan-automation-tester-review.md` with five dimensions (Test Coverage, Regression Safety, E2E Readiness, Testability, CI Integration), scoring 0-10, and thought leader channels (Kent Beck, Martin Fowler, Michael Bolton, James Bach, Lisa Crispin)
- [x] 1.2 Update CLAUDE.md to add `/plan-automation-tester-review` to the lifecycle table, review gates section, skill chaining patterns, and all available skills table

## 2. E2E Test Infrastructure

- [x] 2.1 Create `e2e/` directory structure: `e2e/web/`, `e2e/mobile/`, `e2e/helpers/`
- [x] 2.2 Install Playwright as dev dependency and create `e2e/web/playwright.config.ts`
- [x] 2.3 Install Maestro CLI instructions and create `e2e/mobile/.maestro/` config
- [x] 2.4 Add npm scripts to package.json: `test:e2e:web`, `test:e2e:mobile`, `test:e2e`
- [x] 2.5 Create `e2e/helpers/seed.ts` with test data factories for contacts, trades, and silent payment addresses
- [x] 2.6 Create `e2e/helpers/cleanup.ts` with database reset and teardown utilities

## 3. Sample E2E Tests

- [x] 3.1 Create `e2e/web/contacts.test.ts` — add contact, edit contact, delete contact flows
- [x] 3.2 Create `e2e/web/trades.test.ts` — create trade, update trade status, complete trade flows
- [x] 3.3 Create `e2e/mobile/contacts.yaml` — Maestro flow for contact creation on mobile
- [x] 3.4 Create `e2e/mobile/trades.yaml` — Maestro flow for trade lifecycle on mobile

## 4. Spec Updates (Delta Specs)

- [x] 4.1 Verify review-gates delta spec covers dashboard display with Automation Tester row
- [x] 4.2 Verify skill-chaining delta spec includes automation tester in all chain patterns
- [x] 4.3 Verify gstack-lifecycle delta spec adds automation tester to Planning and Verify phases

## 5. Integration Verification

- [x] 5.1 Run existing Jest test suite (`npm test`) to confirm no regressions
- [x] 5.2 Run Playwright web E2E tests against Expo web build
- [x] 5.3 Verify the skill file loads correctly by running `/plan-automation-tester-review` on a sample change
