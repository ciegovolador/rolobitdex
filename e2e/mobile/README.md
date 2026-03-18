# Mobile E2E Tests (Maestro)

## Prerequisites

Install Maestro CLI:
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

## Running Tests

```bash
# Run all mobile E2E tests
maestro test e2e/mobile/

# Run a specific flow
maestro test e2e/mobile/contacts.yaml
```

## Writing Flows

Maestro uses YAML-based flow definitions. See [Maestro docs](https://maestro.mobile.dev/getting-started/writing-your-first-flow).
