/**
 * Theme objects that combine all design tokens
 * Used by ThemeProvider context
 */

import { darkTheme, lightTheme, ThemeType, DesignTokens } from './tokens';

export const themes: Record<ThemeType, DesignTokens> = {
  dark: darkTheme,
  light: lightTheme,
};

export type { ThemeType, DesignTokens };
export { darkTheme, lightTheme };
