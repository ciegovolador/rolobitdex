## MODIFIED Requirements

### Requirement: README with run instructions
The project SHALL include a README.md with prerequisites, installation steps, and commands to run the app on iOS, Android, and Web. The README SHALL also document `npm run storybook` for launching the design system on port 6006.

#### Scenario: Developer reads README and starts app
- **WHEN** a new developer clones the repo and follows the README
- **THEN** they can install dependencies and launch the app on at least one platform

#### Scenario: Developer reads README and starts storybook
- **WHEN** a new developer follows the README storybook instructions
- **THEN** they can run `npm run storybook` and view the component library on port 6006

## ADDED Requirements

### Requirement: Metro config supports storybook mode
The `metro.config.js` SHALL wrap the config with `withStorybook` from `@storybook/react-native/metro/withStorybook`, enabled when `EXPO_PUBLIC_STORYBOOK_ENABLED` is `"true"`.

#### Scenario: Metro resolves storybook modules when enabled
- **WHEN** storybook mode is enabled via environment variable
- **THEN** Metro resolves `@storybook/*` imports and serves the storybook entry point

#### Scenario: Metro ignores storybook when disabled
- **WHEN** storybook mode is not enabled
- **THEN** Metro stubs storybook imports and serves the normal app

### Requirement: Browser auto-open disabled
The `npm run web` script SHALL set `BROWSER=none` to prevent Expo from attempting to launch a browser, avoiding crashes on systems without a recognized browser binary.

#### Scenario: Web starts without browser
- **WHEN** a developer runs `npm run web` on a system without firefox or chrome
- **THEN** Metro starts successfully and waits for manual browser navigation
