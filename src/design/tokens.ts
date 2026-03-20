/**
 * Design Tokens
 * Bitcoin-aligned design system based on bitcoin.design principles
 * Supports light and dark themes with semantic color naming
 */

export type ThemeType = 'light' | 'dark';

export interface ColorTokens {
  // Surfaces and backgrounds
  background: string;
  surface: string;
  surfaceLight: string;

  // Brand colors
  primary: string;
  primaryDark: string;

  // Text colors
  text: string;
  textSecondary: string;
  textMuted: string;

  // Semantic colors
  border: string;
  error: string;
  success: string;
  warning: string;

  // Interactive states
  onPrimary: string;
  onSurface: string;
}

export interface TypographyTokens {
  xs: { fontSize: number; lineHeight: number; fontWeight: '400' | '500' | '700' };
  sm: { fontSize: number; lineHeight: number; fontWeight: '400' | '500' | '700' };
  md: { fontSize: number; lineHeight: number; fontWeight: '400' | '500' | '700' };
  lg: { fontSize: number; lineHeight: number; fontWeight: '400' | '500' | '700' };
  xl: { fontSize: number; lineHeight: number; fontWeight: '400' | '500' | '700' };
  xxl?: { fontSize: number; lineHeight: number; fontWeight: '400' | '500' | '700' };
}

export interface SpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface BorderRadiusTokens {
  sm: number;
  md: number;
  lg: number;
}

export interface ElevationTokens {
  0: string;
  1: string;
  2: string;
  3: string;
}

export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borderRadius: BorderRadiusTokens;
  elevation: ElevationTokens;
  fontSize: Record<keyof TypographyTokens, number>;
  statusColors: Record<string, string>;
  animation: {
    fast: number;
    normal: number;
    slow: number;
  };
}

/**
 * Dark theme (default) - Bitcoin-aligned colors for dark mode
 * Uses bitcoin.design principles: accessible, professional, privacy-focused
 */
export const darkTheme: DesignTokens = {
  colors: {
    background: '#0F0F1A',
    surface: '#1A1A2E',
    surfaceLight: '#2A2A3E',
    primary: '#F7931A', // Bitcoin orange
    primaryDark: '#C77515',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    textMuted: '#666666',
    border: '#2A2A3E',
    error: '#FF4444',
    success: '#44BB44',
    warning: '#FFAA00',
    onPrimary: '#000000', // Black text on bitcoin orange
    onSurface: '#FFFFFF',
  },
  typography: {
    xs: { fontSize: 11, lineHeight: 16, fontWeight: '400' },
    sm: { fontSize: 12, lineHeight: 18, fontWeight: '400' },
    md: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
    lg: { fontSize: 16, lineHeight: 24, fontWeight: '500' },
    xl: { fontSize: 20, lineHeight: 28, fontWeight: '700' },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 16,
  },
  elevation: {
    0: 'none',
    1: '0px 1px 3px rgba(0, 0, 0, 0.3)',
    2: '0px 2px 6px rgba(0, 0, 0, 0.4)',
    3: '0px 4px 12px rgba(0, 0, 0, 0.5)',
  },
  fontSize: {
    xs: 11,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  statusColors: {
    pending: '#F5A623',
    accepted: '#4A90D9',
    fiat_sent: '#9B59B6',
    fiat_received: '#1ABC9C',
    completed: '#2ECC71',
    cancelled: '#E74C3C',
  },
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
};

/**
 * Light theme - Light variant for accessibility and context-specific use
 * Maintains bitcoin.design principles in light mode
 */
export const lightTheme: DesignTokens = {
  colors: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceLight: '#EEEEEE',
    primary: '#F7931A', // Bitcoin orange (same in both themes)
    primaryDark: '#C77515',
    text: '#1A1A1A',
    textSecondary: '#555555',
    textMuted: '#999999',
    border: '#DDDDDD',
    error: '#CC0000',
    success: '#008800',
    warning: '#FF8800',
    onPrimary: '#000000',
    onSurface: '#1A1A1A',
  },
  typography: darkTheme.typography, // Same typography for both themes
  spacing: darkTheme.spacing, // Same spacing for both themes
  borderRadius: darkTheme.borderRadius, // Same border radius for both themes
  elevation: {
    0: 'none',
    1: '0px 1px 3px rgba(0, 0, 0, 0.12)',
    2: '0px 2px 6px rgba(0, 0, 0, 0.16)',
    3: '0px 4px 12px rgba(0, 0, 0, 0.20)',
  },
  fontSize: {
    xs: 11,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
  }, // Same font sizes for both themes
  statusColors: darkTheme.statusColors, // Same status colors for both themes
  animation: darkTheme.animation, // Same animation timings for both themes
};

/**
 * Get theme tokens by name
 */
export function getTheme(themeType: ThemeType): DesignTokens {
  return themeType === 'light' ? lightTheme : darkTheme;
}

/**
 * Default export is dark theme
 */
export default darkTheme;
