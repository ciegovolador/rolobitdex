## ADDED Requirements

### Requirement: gstack skill availability and recovery
The development environment SHALL verify gstack skill availability and provide a recovery path when skills are not working.

#### Scenario: Skills working normally
- **WHEN** a developer invokes a gstack skill (e.g., `/ship`, `/qa`)
- **THEN** the skill executes normally via the registered skill path

#### Scenario: Skills not responding
- **WHEN** a gstack skill fails to load or is not recognized
- **THEN** the developer SHALL run `cd .claude/skills/gstack && ./setup` to rebuild the binary and re-register skills

#### Scenario: Vendored copy out of sync
- **WHEN** the global gstack installation is updated but the local vendored copy is stale
- **THEN** `/gstack-upgrade` SHALL detect the version mismatch and sync the local copy
- **AND** the developer is reminded to commit `.claude/skills/gstack/` after sync
