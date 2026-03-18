export const colors = {
  background: "#0F0F1A",
  surface: "#1A1A2E",
  surfaceLight: "#2A2A3E",
  primary: "#F7931A", // Bitcoin orange
  primaryDark: "#C77515",
  text: "#FFFFFF",
  textSecondary: "#AAAAAA",
  textMuted: "#666666",
  border: "#2A2A3E",
  error: "#FF4444",
  success: "#44BB44",
  warning: "#FFAA00",
};

export const statusColors: Record<string, string> = {
  pending: "#F5A623",    // amber
  accepted: "#4A90D9",   // blue
  fiat_sent: "#9B59B6",  // purple
  fiat_received: "#1ABC9C", // teal
  completed: "#2ECC71",  // green
  cancelled: "#E74C3C",  // red
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const fontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const typography = {
  xs: { fontSize: 11, lineHeight: 16, fontWeight: "400" as const },
  sm: { fontSize: 12, lineHeight: 18, fontWeight: "400" as const },
  md: { fontSize: 14, lineHeight: 20, fontWeight: "400" as const },
  lg: { fontSize: 16, lineHeight: 24, fontWeight: "500" as const },
  xl: { fontSize: 20, lineHeight: 28, fontWeight: "700" as const },
};

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
};

export const elevation = {
  0: "none",
  1: "0px 1px 3px rgba(0, 0, 0, 0.3)",
  2: "0px 2px 6px rgba(0, 0, 0, 0.4)",
  3: "0px 4px 12px rgba(0, 0, 0, 0.5)",
};

export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
};
