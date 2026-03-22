import { rowLayout, cardBase, formGroup } from "./mixins";

describe("Style Mixins", () => {
  test("rowLayout returns row flexDirection with default gap", () => {
    const style = rowLayout();
    expect(style.flexDirection).toBe("row");
    expect(style.alignItems).toBe("center");
    expect(style.gap).toBe(16); // spacing.md
  });

  test("rowLayout accepts custom gap", () => {
    const style = rowLayout(8);
    expect(style.gap).toBe(8);
  });

  test("cardBase returns surface background with border", () => {
    const style = cardBase();
    expect(style.backgroundColor).toBe("#1A1A2E");
    expect(style.borderWidth).toBe(1);
    expect(style.borderColor).toBe("#2A2A3E");
    expect(style.borderRadius).toBe(16); // borderRadius.lg
    expect(style.padding).toBe(16); // spacing.md
  });

  test("formGroup returns bottom margin", () => {
    const style = formGroup();
    expect(style.marginBottom).toBe(16); // spacing.md
  });
});
