import { initMockDb, mockRows } from "../test/setup";
import { getContactInitials, isValidContactName, createContactIdempotent } from "./contact";

beforeEach(() => {
  initMockDb();
  mockRows.contacts = [];
  mockRows.banking_aliases = [];
  mockRows.silent_payment_addresses = [];
  mockRows.trust_notes = [];
});

describe("getContactInitials", () => {
  test("returns first two chars uppercased", () => {
    expect(getContactInitials("Alice")).toBe("AL");
  });

  test("handles single character name", () => {
    expect(getContactInitials("A")).toBe("A");
  });

  test("handles lowercase name", () => {
    expect(getContactInitials("bob")).toBe("BO");
  });

  test("handles two character name", () => {
    expect(getContactInitials("Al")).toBe("AL");
  });

  test("handles name with spaces", () => {
    expect(getContactInitials("Alice B.")).toBe("AL");
  });
});

describe("isValidContactName", () => {
  test("valid name returns true", () => {
    expect(isValidContactName("Alice")).toBe(true);
  });

  test("empty string returns false", () => {
    expect(isValidContactName("")).toBe(false);
  });

  test("whitespace-only returns false", () => {
    expect(isValidContactName("   ")).toBe(false);
  });

  test("single char is valid", () => {
    expect(isValidContactName("A")).toBe(true);
  });

  test("string with leading/trailing spaces is valid if has content", () => {
    expect(isValidContactName("  Alice  ")).toBe(true);
  });
});

describe("createContactIdempotent", () => {
  test("creates new contact when none exists", async () => {
    const id = await createContactIdempotent("Alice");
    expect(id).toBeTruthy();
    expect(mockRows.contacts.length).toBe(1);
  });

  test("returns existing contact id on duplicate name", async () => {
    const id1 = await createContactIdempotent("Alice");
    const id2 = await createContactIdempotent("Alice");
    expect(id2).toBe(id1);
    expect(mockRows.contacts.length).toBe(1);
  });

  test("case-insensitive match", async () => {
    const id1 = await createContactIdempotent("Alice");
    const id2 = await createContactIdempotent("alice");
    expect(id2).toBe(id1);
    expect(mockRows.contacts.length).toBe(1);
  });

  test("trims whitespace before matching", async () => {
    const id1 = await createContactIdempotent("Alice");
    const id2 = await createContactIdempotent("  Alice  ");
    expect(id2).toBe(id1);
    expect(mockRows.contacts.length).toBe(1);
  });

  test("different names create separate contacts", async () => {
    await createContactIdempotent("Alice");
    await createContactIdempotent("Bob");
    expect(mockRows.contacts.length).toBe(2);
  });
});
