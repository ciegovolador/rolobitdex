## 1. Create Bitcoiner review skill

- [x] 1.1 Create `.claude/skills/plan-bitcoiner-review/SKILL.md` with cognitive patterns (Satoshi, Finney, Szabo, Back), five rating dimensions (Sovereignty, Privacy, Trustlessness, Fee Control, Ethos), interactive AskUserQuestion per dimension, and 0-10 scoring
- [x] 1.2 Add preamble section matching gstack skill conventions (update check, session tracking, branch detection)
- [x] 1.3 Add the skill to CLAUDE.md skill table and chaining patterns

## 2. Create Cypherpunk review skill

- [x] 2.1 Create `.claude/skills/plan-cypherpunk-review/SKILL.md` with cognitive patterns (Schneier, Bernstein, Tor Project, Hughes, Zimmermann, Appelbaum), five rating dimensions (Threat Model, Metadata Minimization, Crypto Hygiene, Zero-Knowledge Defaults, Opsec), interactive AskUserQuestion per dimension, and 0-10 scoring
- [x] 2.2 Add preamble section matching gstack skill conventions
- [x] 2.3 Add the skill to CLAUDE.md skill table and chaining patterns

## 3. Update lifecycle and chaining specs

- [x] 3.1 Merge gstack-lifecycle delta into `openspec/specs/gstack-lifecycle/spec.md`
- [x] 3.2 Merge skill-chaining delta into `openspec/specs/skill-chaining/spec.md`
- [x] 3.3 Create `openspec/specs/bitcoiner-review/spec.md` from delta spec
- [x] 3.4 Create `openspec/specs/cypherpunk-review/spec.md` from delta spec

## 4. Update CLAUDE.md chaining patterns

- [x] 4.1 Add Bitcoin feature chain: CEO → Bitcoiner → Cypherpunk → Eng → Design
- [x] 4.2 Add security-focused chain: Cypherpunk → Eng
- [x] 4.3 Add Bitcoin protocol chain: Bitcoiner → Cypherpunk → Eng
- [x] 4.4 Add both roles to the "All Available Skills" table

## 5. Verify

- [x] 5.1 Run `openspec validate --specs` to confirm new specs pass
- [x] 5.2 Verify skill files are loadable (test that `/plan-bitcoiner-review` and `/plan-cypherpunk-review` are recognized)
