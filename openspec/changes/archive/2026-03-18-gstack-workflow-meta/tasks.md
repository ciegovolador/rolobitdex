## 1. Replace existing gstack-workflow spec

- [x] 1.1 Remove or archive existing `openspec/specs/gstack-workflow/spec.md`
- [x] 1.2 Create `openspec/specs/gstack-lifecycle/spec.md` from delta spec
- [x] 1.3 Create `openspec/specs/review-gates/spec.md` from delta spec
- [x] 1.4 Create `openspec/specs/skill-chaining/spec.md` from delta spec

## 2. Apply cross-platform-shell delta

- [x] 2.1 Merge ADDED requirements from delta into `openspec/specs/cross-platform-shell/spec.md`

## 3. Update CLAUDE.md

- [x] 3.1 Add workflow reference pointing to the three new specs
- [x] 3.2 Document the four-phase lifecycle (Plan → Build → Verify → Ship) as a quick reference
- [x] 3.3 Add skill chaining patterns for common scenarios (full feature, backend-only, trivial fix)

## 4. Verify and clean up

- [x] 4.1 Run `openspec validate` to confirm all specs pass structural checks
- [x] 4.2 Verify no broken cross-references between specs
- [x] 4.3 Remove stale `openspec/specs/gstack-workflow/` directory after replacement
