## 1. Update CLAUDE.md

- [x] 1.1 Replace `opsx/<change-name>` with `SCOPE/IP-NUMBER-DESCRIPTION` in the Autonomous Workflow section
- [x] 1.2 Add scope auto-detection rules (feature, bugfix, hotfix, release)
- [x] 1.3 Add auto-increment logic description (scan branches for highest IP number)

## 2. Update existing spec references

- [x] 2.1 Update `gstack-lifecycle/spec.md` — replace `opsx/<change-name>` references with new convention in "Every change starts on a new branch" requirement
- [x] 2.2 Update `gstack-workflow/spec.md` — replace `opsx/<change-name>` references in branch-related scenarios

## 3. Verification

- [x] 3.1 Verify no remaining `opsx/<change-name>` references in CLAUDE.md or specs (grep check)
