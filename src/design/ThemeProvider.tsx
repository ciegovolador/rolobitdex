/**
 * Theme Context Provider
 * Manages theme state (light/dark) and provides design tokens to the app
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { themes, ThemeType, DesignTokens } from './themes';

interface ThemeContextType {
  theme: ThemeType;
  tokens: DesignTokens;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeType;
}

/**
 * ThemeProvider component - wrap your app with this to enable theming
 *
 * Usage:
 * ```tsx
 * <ThemeProvider initialTheme="dark">
 *   <YourApp />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children, initialTheme = 'dark' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeType>(initialTheme);

  const setTheme = useCallback((newTheme: ThemeType) => {
    setThemeState(newTheme);
    // Could persist to AsyncStorage here if needed
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value: ThemeContextType = {
    theme,
    tokens: themes[theme],
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to use theme context
 * Must be used within ThemeProvider
 *
 * Usage:
 * ```tsx
 * const { tokens, theme, toggleTheme } = useTheme();
 * ```
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export type { ThemeContextType };
