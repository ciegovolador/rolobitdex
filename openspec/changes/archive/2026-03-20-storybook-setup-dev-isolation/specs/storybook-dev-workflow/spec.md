## ADDED Requirements

### Requirement: Storybook serves on dedicated port
The project SHALL provide an `npm run storybook` script that starts Storybook on port 6006, separate from the app on port 8081, so both can run simultaneously.

#### Scenario: Run storybook alongside app
- **WHEN** a developer runs `npm run web` and `npm run storybook` in separate terminals
- **THEN** the app is available on `http://localhost:8081` and Storybook on `http://localhost:6006`

### Requirement: Conditional entry point
The `index.js` entry point SHALL check `process.env.EXPO_PUBLIC_STORYBOOK_ENABLED` and load the Storybook UI when set to `"true"`, otherwise load `expo-router/entry`.

#### Scenario: Normal app launch
- **WHEN** `EXPO_PUBLIC_STORYBOOK_ENABLED` is not set
- **THEN** the app loads expo-router and renders the normal application

#### Scenario: Storybook launch
- **WHEN** `EXPO_PUBLIC_STORYBOOK_ENABLED` is `"true"`
- **THEN** the app loads `.rnstorybook` and renders the Storybook component browser

### Requirement: Story files colocated with components
Every interactive component in `src/components/` SHALL have a colocated `.stories.tsx` file in the same directory.

#### Scenario: Existing components have stories
- **WHEN** a developer opens Storybook
- **THEN** stories for Button, Card, Input, ConfirmModal, and Sidebar are listed and renderable

#### Scenario: New component requires story
- **WHEN** a developer creates a new component in `src/components/`
- **THEN** they SHALL create a corresponding `.stories.tsx` file before integrating into the app

### Requirement: Build in isolation guideline
All new frontend component work SHALL start in Storybook. Components MUST be buildable and reviewable in isolation before being integrated into app screens.

#### Scenario: New component development workflow
- **WHEN** a developer begins work on a new UI component
- **THEN** they create the component and its story file first, verify it renders correctly in Storybook, then integrate into the app

#### Scenario: Component modification workflow
- **WHEN** a developer modifies an existing component
- **THEN** they verify the change in Storybook before checking the app integration

### Requirement: Interactive stories for stateful components
Components with controlled state (e.g., modals with `visible` prop) SHALL use a `render` function in their story that provides local state management so the component can be interacted with.

#### Scenario: Modal story is interactive
- **WHEN** a developer views the ConfirmModal story in Storybook
- **THEN** they see a button to open the modal, and the modal closes when Cancel or Confirm is pressed
