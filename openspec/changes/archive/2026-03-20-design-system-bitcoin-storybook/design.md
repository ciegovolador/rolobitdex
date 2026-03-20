## Context

The application currently uses inline styles and a centralized theme constants file, which works for a small app but doesn't scale. Developers must search code to understand available colors, typography, and spacing options. There's no visual reference for components or consistent component patterns. The bitcoin.design project provides proven design principles for Bitcoin applications (accessible, Bitcoin-focused, privacy-respecting). Adopting these principles with Storybook will formalize our design system and improve developer onboarding.

## Goals / Non-Goals

**Goals:**
- Establish a single source of truth for design tokens (colors, typography, spacing, elevations)
- Create a reusable component library that all screens use consistently
- Set up Storybook as interactive documentation and testing reference
- Enable light/dark theme switching with design tokens
- Follow bitcoin.design guidelines for Bitcoin application UX
- Reduce visual inconsistency across the app
- Improve developer experience through component discovery and documentation

**Non-Goals:**
- Complete rewrite of all existing screens in one go (migration happens over time)
- Create a design tool integration (Figma→code automation)
- Build a full comprehensive icon system (use existing expo icons initially)
- Implement dynamic theming from user preferences (static light/dark only)

## Decisions

**1. Token Organization (TSconfig/naming approach)**
- **Decision**: Use a flat design token structure with semantic naming (e.g., `color.surface`, `color.border`, `spacing.lg`)
- **Rationale**: Flat structure is easier to maintain and discover than nested hierarchies. Semantic names (not color values) survive theme changes.
- **Alternatives**: Nested structure (harder to search), raw color values only (not scalable).

**2. Storybook Setup for React Native**
- **Decision**: Use `@storybook/react-native` with Storybook's native runner for on-device preview. Fallback to web preview for CI.
- **Rationale**: React Native doesn't have native browser DevTools like web. This approach lets developers preview on actual devices. Web preview works for component documentation.
- **Alternatives**: Web-only Storybook (loses real device context), manual testing only (slow iteration).

**3. Component File Structure**
- **Decision**: Colocate components with stories: `src/components/Button/Button.tsx`, `src/components/Button/Button.stories.tsx`, `src/components/Button/Button.test.tsx`
- **Rationale**: Keeps related code together, easier to refactor, stories stay in sync with components.
- **Alternatives**: Separate stories folder (harder to keep in sync), single flat folder (hard to navigate as library grows).

**4. Token Generation**
- **Decision**: Use TypeScript for token definitions (types + values) rather than JSON. Generate theme objects at build time.
- **Rationale**: TypeScript gives type safety and IDE autocomplete. Can validate tokens at compile time.
- **Alternatives**: JSON + code gen (one extra tool), CSS variables (loses type safety).

**5. Theme Management**
- **Decision**: Store theme in React Context, apply via theme provider at app root. StyleSheet.create uses tokens from context.
- **Rationale**: Context is built into React, avoids external state management complexity. Themes switch at runtime.
- **Alternatives**: CSS-in-JS (more overhead), theme files (static, can't switch at runtime).

**6. Existing Component Migration**
- **Decision**: Migrate components incrementally as they're touched. Don't block on full migration before shipping design system.
- **Rationale**: Reduces risk, lets team work in parallel, ships value early.
- **Alternatives**: Big-bang rewrite (high risk, blocks other work), never migrate (defeats purpose).

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| **Storybook setup complexity** | Start with minimal setup, add features incrementally. Provide onboarding docs. |
| **Token naming becomes inconsistent** | Document naming conventions. Code review component PRs for token usage. |
| **Theme switching causes bugs** | Add tests for both light/dark themes. Test theme changes in E2E. |
| **Performance cost of Context updates** | Use useMemo, useCallback to prevent unnecessary renders. Benchmark with DevTools. |
| **Old and new components coexist** | Mark unfinished components with console warnings. Update docs to guide migration. |

## Migration Plan

1. **Phase 1 (Foundation)**: Create token definitions, theme provider, Storybook setup
2. **Phase 2 (Base Components)**: Build Button, Input, Card, Modal using tokens (create stories for each)
3. **Phase 3 (Integration)**: Update app to use theme provider, migrate highest-traffic screens
4. **Phase 4 (Completion)**: Migrate remaining screens, deprecate old styling approach

Each phase ships independently to get feedback early.

## Open Questions

- Which specific colors/typography from bitcoin.design should we adopt? (Needs design audit)
- Should Storybook be available in production or dev-only?
- Do we need animation tokens and transition specs?
