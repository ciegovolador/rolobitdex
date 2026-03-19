## ADDED Requirements

### Requirement: Style system uses co-located BEM-inspired modules
All view components SHALL have co-located `*.styles.ts` files with BEM-inspired naming conventions for React Native StyleSheet objects.

#### Scenario: View component uses co-located styles
- **WHEN** a view component is created or refactored
- **THEN** it SHALL import styles from a sibling `*.styles.ts` file
- **AND** the style file SHALL export a `styles` object via `StyleSheet.create()`

#### Scenario: BEM naming convention applied
- **WHEN** style keys are defined
- **THEN** they SHALL follow `block__element` for sub-parts and `block__element_modifier` for variants
