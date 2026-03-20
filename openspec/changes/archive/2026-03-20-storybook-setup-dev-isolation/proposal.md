## Why

Frontend components are developed and tested only within the full app context, making it slow to iterate on UI and impossible to review the design system in isolation. Adding Storybook enables component-driven development where each component can be built, tested, and reviewed independently before integration.

## What Changes

- Add Storybook for React Native (v10) with on-device controls and actions addons
- Create a custom app entry point (`index.js`) that conditionally loads Storybook or the app via `EXPO_PUBLIC_STORYBOOK_ENABLED`
- Integrate Storybook into Metro via `withStorybook` wrapper in `metro.config.js`
- Add `npm run storybook` script serving the design system on port 6006 alongside the app on port 8081
- Create `.stories.tsx` files for all existing components (Button, Card, Input, ConfirmModal, Sidebar)
- Fix `npm run web` crash by setting `BROWSER=none` (firefox not available)
- Establish guideline: all new frontend component work starts in Storybook before app integration

## Capabilities

### New Capabilities
- `storybook-dev-workflow`: Storybook setup, configuration, story file conventions, and the "build in isolation" development guideline for frontend work

### Modified Capabilities
- `dev-tooling`: Adding Storybook as a core development tool with its own port, scripts, and metro integration

## Impact

- **New files**: `index.js` (entry point), `.rnstorybook/` (config), `src/components/*.stories.tsx`
- **Modified files**: `package.json` (scripts, deps), `metro.config.js` (withStorybook wrapper)
- **Dependencies added**: `@storybook/react-native`, `@storybook/addon-ondevice-controls`, `@storybook/addon-ondevice-actions`, `storybook`, `@react-native-async-storage/async-storage`, `@react-native-community/datetimepicker`, `@react-native-community/slider`, `@gorhom/bottom-sheet`, `@babel/core`, `babel-loader`
- **Dev workflow**: Frontend developers should run `npm run storybook` first when building new components
