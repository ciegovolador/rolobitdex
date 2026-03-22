import { darkTheme, lightTheme, getTheme } from "./tokens";

describe("Design Tokens", () => {
  test("darkTheme has bitcoin orange as primary", () => {
    expect(darkTheme.colors.primary).toBe("#F7931A");
  });

  test("lightTheme has bitcoin orange as primary", () => {
    expect(lightTheme.colors.primary).toBe("#F7931A");
  });

  test("darkTheme has dark background", () => {
    expect(darkTheme.colors.background).toBe("#0F0F1A");
  });

  test("lightTheme has light background", () => {
    expect(lightTheme.colors.background).toBe("#FFFFFF");
  });

  test("both themes have required color tokens", () => {
    for (const theme of [darkTheme, lightTheme]) {
      expect(theme.colors.background).toBeDefined();
      expect(theme.colors.surface).toBeDefined();
      expect(theme.colors.primary).toBeDefined();
      expect(theme.colors.text).toBeDefined();
      expect(theme.colors.error).toBeDefined();
      expect(theme.colors.success).toBeDefined();
      expect(theme.colors.warning).toBeDefined();
    }
  });

  test("spacing tokens are consistent between themes", () => {
    expect(darkTheme.spacing).toEqual(lightTheme.spacing);
  });

  test("typography tokens are consistent between themes", () => {
    expect(darkTheme.typography).toEqual(lightTheme.typography);
  });

  test("animation tokens are defined", () => {
    expect(darkTheme.animation.fast).toBe(150);
    expect(darkTheme.animation.normal).toBe(300);
    expect(darkTheme.animation.slow).toBe(500);
  });

  test("statusColors include all trade statuses", () => {
    const statuses = ["pending", "accepted", "fiat_sent", "fiat_received", "completed", "cancelled"];
    for (const status of statuses) {
      expect(darkTheme.statusColors[status]).toBeDefined();
    }
  });

  test("getTheme returns correct theme", () => {
    expect(getTheme("dark")).toBe(darkTheme);
    expect(getTheme("light")).toBe(lightTheme);
  });

  test("elevation levels exist for 0-3", () => {
    for (const theme of [darkTheme, lightTheme]) {
      expect(theme.elevation[0]).toBe("none");
      expect(theme.elevation[1]).toBeDefined();
      expect(theme.elevation[2]).toBeDefined();
      expect(theme.elevation[3]).toBeDefined();
    }
  });
});
