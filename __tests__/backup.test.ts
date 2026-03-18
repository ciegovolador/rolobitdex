import { initMockDb, mockRows, mockFileStorage } from "./setup";
import { exportData, xorEncrypt, xorDecrypt, exportEncryptedBackup, importEncryptedBackup } from "../src/lib/backup";

beforeEach(() => {
  initMockDb();
  mockRows.contacts = [
    { id: "c1", name: "Alice", avatar_uri: null, created_at: "2024-01-01", updated_at: "2024-01-01" },
  ];
  mockRows.banking_aliases = [
    { id: "a1", contact_id: "c1", bank_name: "BBVA", account_identifier: "123", label: "personal", created_at: "2024-01-01" },
  ];
  mockRows.silent_payment_addresses = [
    { id: "sp1", contact_id: "c1", address: "sp1qtest123456789012345678", label: null, created_at: "2024-01-01" },
  ];
  mockRows.trades = [
    { id: "t1", contact_id: "c1", type: "buy", sats_amount: 100000, fiat_currency: "MXN", fiat_amount: 500, status: "completed", created_at: "2024-01-01", updated_at: "2024-01-01", completed_at: "2024-01-02" },
  ];
  mockRows.trust_notes = [
    { id: "n1", contact_id: "c1", note: "Very reliable", created_at: "2024-01-01", updated_at: "2024-01-01" },
  ];
});

describe("exportData", () => {
  test("returns structured backup with version 1", async () => {
    const data = await exportData();
    expect(data.version).toBe(1);
    expect(data.exported_at).toBeTruthy();
  });

  test("includes all tables", async () => {
    const data = await exportData();
    expect(data.contacts).toHaveLength(1);
    expect(data.contacts[0].name).toBe("Alice");
    expect(data.banking_aliases).toHaveLength(1);
    expect(data.banking_aliases[0].bank_name).toBe("BBVA");
    expect(data.silent_payment_addresses).toHaveLength(1);
    expect(data.silent_payment_addresses[0].address).toContain("sp1q");
    expect(data.trades).toHaveLength(1);
    expect(data.trades[0].sats_amount).toBe(100000);
    expect(data.trust_notes).toHaveLength(1);
    expect(data.trust_notes[0].note).toBe("Very reliable");
  });

  test("exported_at is a valid ISO date", async () => {
    const data = await exportData();
    const date = new Date(data.exported_at);
    expect(date.getTime()).not.toBeNaN();
  });

  test("handles empty tables", async () => {
    mockRows.contacts = [];
    mockRows.banking_aliases = [];
    mockRows.silent_payment_addresses = [];
    mockRows.trades = [];
    mockRows.trust_notes = [];
    const data = await exportData();
    expect(data.contacts).toHaveLength(0);
    expect(data.banking_aliases).toHaveLength(0);
    expect(data.trades).toHaveLength(0);
  });
});

describe("xorEncrypt / xorDecrypt", () => {
  test("encrypt then decrypt returns original", () => {
    const original = "Hello, World!";
    const passphrase = "secret123";
    const encrypted = xorEncrypt(original, passphrase);
    const decrypted = xorDecrypt(encrypted, passphrase);
    expect(decrypted).toBe(original);
  });

  test("encrypted string differs from original", () => {
    const original = "Hello, World!";
    const encrypted = xorEncrypt(original, "key");
    expect(encrypted).not.toBe(original);
  });

  test("wrong passphrase produces different result", () => {
    const original = "sensitive data";
    const encrypted = xorEncrypt(original, "correctKey");
    const wrongDecrypt = xorDecrypt(encrypted, "wrongKey");
    expect(wrongDecrypt).not.toBe(original);
  });

  test("handles empty string", () => {
    const encrypted = xorEncrypt("", "key");
    const decrypted = xorDecrypt(encrypted, "key");
    expect(decrypted).toBe("");
  });

  test("handles long data", () => {
    const original = "a".repeat(10000);
    const encrypted = xorEncrypt(original, "shortkey");
    const decrypted = xorDecrypt(encrypted, "shortkey");
    expect(decrypted).toBe(original);
  });

  test("handles JSON data roundtrip", () => {
    const data = { contacts: [{ name: "Alice" }], version: 1 };
    const json = JSON.stringify(data);
    const encrypted = xorEncrypt(json, "mypassphrase");
    const decrypted = xorDecrypt(encrypted, "mypassphrase");
    expect(JSON.parse(decrypted)).toEqual(data);
  });

  test("handles ASCII special characters", () => {
    const original = "Hello! @#$%^&*() = {}<>?/\\|~`";
    const encrypted = xorEncrypt(original, "key");
    const decrypted = xorDecrypt(encrypted, "key");
    expect(decrypted).toBe(original);
  });
});

describe("exportEncryptedBackup", () => {
  test("writes encrypted file and returns path", async () => {
    const path = await exportEncryptedBackup("mypassphrase");
    expect(path).toContain("rolobitdex-backup.enc");
    // File should contain encrypted data
    const fileContent = mockFileStorage[path];
    expect(fileContent).toBeTruthy();
    expect(fileContent).not.toContain("Alice"); // encrypted, not plaintext
  });

  test("encrypted file can be decrypted back", async () => {
    const path = await exportEncryptedBackup("secret123");
    const encrypted = mockFileStorage[path];
    const decrypted = xorDecrypt(encrypted, "secret123");
    const data = JSON.parse(decrypted);
    expect(data.version).toBe(1);
    expect(data.contacts[0].name).toBe("Alice");
  });
});

describe("importEncryptedBackup", () => {
  test("restores data from encrypted file", async () => {
    // Export first
    const path = await exportEncryptedBackup("pass123");

    // Clear mock data
    mockRows.contacts = [];
    mockRows.banking_aliases = [];
    mockRows.silent_payment_addresses = [];
    mockRows.trades = [];
    mockRows.trust_notes = [];

    // Import
    await importEncryptedBackup(path, "pass123");

    // Data should be restored
    expect(mockRows.contacts.length).toBe(1);
    expect(mockRows.contacts[0].name).toBe("Alice");
    expect(mockRows.banking_aliases.length).toBe(1);
    expect(mockRows.trades.length).toBe(1);
  });

  test("throws on wrong passphrase (invalid JSON)", async () => {
    const path = await exportEncryptedBackup("correctpass");
    await expect(importEncryptedBackup(path, "wrongpass")).rejects.toThrow();
  });
});
