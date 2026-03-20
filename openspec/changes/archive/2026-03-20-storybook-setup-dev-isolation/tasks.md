## 1. Storybook Installation and Configuration

- [x] 1.1 Install `@storybook/react-native` v10, `@storybook/addon-ondevice-controls`, `@storybook/addon-ondevice-actions`, and `storybook` as devDependencies
- [x] 1.2 Run `npx sb@latest init --type react_native` to scaffold `.rnstorybook/` config directory
- [x] 1.3 Update `.rnstorybook/main.ts` stories path to `../src/components/**/*.stories.?(ts|tsx|js|jsx)`
- [x] 1.4 Move storybook-related packages from dependencies to devDependencies in `package.json`

## 2. Metro and Entry Point Integration

- [x] 2.1 Add `withStorybook` wrapper to `metro.config.js` using `@storybook/react-native/metro/withStorybook`, enabled via `EXPO_PUBLIC_STORYBOOK_ENABLED`
- [x] 2.2 Create `index.js` custom entry point that conditionally loads `.rnstorybook` or `expo-router/entry` based on `EXPO_PUBLIC_STORYBOOK_ENABLED`
- [x] 2.3 Update `package.json` `"main"` field from `"expo-router/entry"` to `"./index.js"`

## 3. Scripts and Browser Fix

- [x] 3.1 Add `"storybook"` script: `EXPO_PUBLIC_STORYBOOK_ENABLED=true BROWSER=none expo start --web --port 6006`
- [x] 3.2 Add `"storybook-generate"` script: `sb-rn-get-stories`
- [x] 3.3 Fix `"web"` script by adding `BROWSER=none` to prevent firefox ENOENT crash

## 4. Story Files for Existing Components

- [x] 4.1 Create `src/components/Button.stories.tsx` with Primary, Secondary, Danger, Loading, Disabled variants
- [x] 4.2 Create `src/components/Card.stories.tsx` with Default, Elevated, Flat variants
- [x] 4.3 Create `src/components/Input.stories.tsx` with Default, WithLabel, WithError variants
- [x] 4.4 Create `src/components/ConfirmModal.stories.tsx` with render function for state management, Default and DangerVariant stories
- [x] 4.5 Create `src/components/Sidebar.stories.tsx` with ContactsActive, TradesActive, AddressActive, SettingsActive variants

## 5. Build-in-Isolation Guideline

- [x] 5.1 Add storybook dev workflow spec to `openspec/specs/storybook-dev-workflow/spec.md`
- [x] 5.2 Update `openspec/specs/dev-tooling/spec.md` with storybook-related requirements
- [x] 5.3 Update CLAUDE.md with build-in-isolation guideline for frontend work

## 6. Verification

- [x] 6.1 Run `npm run storybook` and verify all 5 component stories render on port 6006
- [x] 6.2 Run `npm run web` and verify the app still loads normally on port 8081
- [x] 6.3 Verify ConfirmModal story is interactive (open/close via buttons)
- [x] 6.4 Run `npx sb-rn-get-stories` and verify storybook.requires.ts points to `src/components`
