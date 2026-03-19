## Purpose

Track all Improvement Proposals (IPs) in a central index so every change is discoverable by number, title, status, and branch — similar to Bitcoin BIPs or JIRA tickets.

## Requirements

### Requirement: IP-INDEX.md tracks all Improvement Proposals
The project SHALL maintain an `IP-INDEX.md` file at the repository root that lists every IP (Improvement Proposal) with its number, title, status, branch, and date.

#### Scenario: New IP is proposed
- **WHEN** `/opsx:propose` creates a new IP branch
- **THEN** Claude SHALL add a row to `IP-INDEX.md` with status `Active`
- **AND** the entry SHALL include: IP number, title (from change description), status, branch name, and creation date

#### Scenario: IP is archived
- **WHEN** `/opsx:archive` completes for an IP
- **THEN** Claude SHALL update the IP's status in `IP-INDEX.md` to `Merged`

#### Scenario: IP is abandoned
- **WHEN** a developer explicitly abandons an IP branch
- **THEN** Claude SHALL update the IP's status in `IP-INDEX.md` to `Abandoned`

#### Scenario: IP-INDEX.md format
- **WHEN** `IP-INDEX.md` is created or updated
- **THEN** it SHALL use a markdown table with columns: IP, Title, Status, Branch, Date
- **AND** statuses SHALL be one of: `Active`, `Merged`, `Abandoned`
- **AND** entries SHALL be sorted by IP number ascending

#### Scenario: IP-INDEX.md does not exist
- **WHEN** `/opsx:propose` runs and `IP-INDEX.md` does not exist
- **THEN** Claude SHALL create it with a header and the first entry
