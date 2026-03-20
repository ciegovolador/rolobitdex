## Context

Components are currently only viewable within the full app. There is no way to develop or review UI in isolation. The app entry point is `expo-router/entry` with no conditional loading mechanism. Metro config handles wasm for expo-sqlite but has no storybook integration.

## Goals / Non-Goals

**Goals:**
- Storybook runs on a separate port (6006) so the app (8081) and design system are viewable simultaneously
- Every existing interactive component has a story file
- The entry point conditionally loads Storybook or the app based on an environment variable
- Establish a "build in isolation" guideline: new components start as stories before app integration

**Non-Goals:**
- Storybook for native-only (iOS/Android simulator) — web-only for now
- Visual regression testing or Chromatic integration
- Storybook docs/MDX pages

## Decisions

### 1. Custom entry point (`index.js`) with `EXPO_PUBLIC_STORYBOOK_ENABLED`
Expo only exposes `EXPO_PUBLIC_`-prefixed env vars to the client bundle. A custom `index.js` replaces `expo-router/entry` as `"main"` and conditionally requires either `.rnstorybook` or `expo-router/entry`.

**Alternative considered**: Separate Expo app config for storybook — rejected because it duplicates config and complicates the project structure.

### 2. `@storybook/react-native` v10 (not `@storybook/react` with react-native-web)
Components use react-native-reanimated animations and native Modal. `@storybook/react-native` provides the runtime fidelity needed. The `withStorybook` metro wrapper handles module resolution.

**Alternative considered**: `@storybook/react` with Vite and react-native-web aliases — rejected because reanimated and Modal don't work correctly through web-only storybook.

### 3. Stories colocated with components (`src/components/*.stories.tsx`)
Stories live next to the components they document. This keeps the relationship explicit and makes it easy to update stories when components change.

### 4. ConfirmModal uses render function with local state
Modal stories need a controlled `visible` prop. A `render` function with `useState` provides an "Open Modal" button and close-on-action behavior, making the story interactive.

## Risks / Trade-offs

- **[Risk] Metro cache conflicts between app and storybook modes** → Mitigated by using `--clear` flag when switching. Separate ports avoid runtime conflicts.
- **[Risk] New dependencies added for storybook peer requirements** (`@gorhom/bottom-sheet`, `@react-native-community/slider`, etc.) → These are storybook v10 peer deps. They only load in storybook mode and don't affect the app bundle.
- **[Trade-off] Single entry point for both modes** → Simpler than two separate configs, but means `index.js` must stay in sync if expo-router entry changes.
