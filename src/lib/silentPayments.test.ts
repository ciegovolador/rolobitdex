import { isValidSilentPaymentAddress } from "./silentPayments";

// Mock SecureStore before importing getOrCreateAddress
jest.mock("expo-secure-store", () => {
  const store: Record<string, string> = {};
  return {
    getItemAsync: jest.fn(async (key: string) => store[key] ?? null),
    setItemAsync: jest.fn(async (key: string, value: string) => { store[key] = value; }),
    __store: store,
    __clear: () => { for (const k of Object.keys(store)) delete store[k]; },
  };
});

import * as SecureStore from "expo-secure-store";
import { getOrCreateAddress, getAddress } from "./silentPayments";

beforeEach(() => {
  (SecureStore as any).__clear();
});

describe("isValidSilentPaymentAddress", () => {
  test("valid address starting with sp1 and long enough", () => {
    expect(isValidSilentPaymentAddress("sp1q" + "a".repeat(58))).toBe(true);
  });

  test("valid address at minimum length (20)", () => {
    expect(isValidSilentPaymentAddress("sp1q" + "a".repeat(16))).toBe(true);
  });

  test("valid address exactly 20 chars", () => {
    expect(isValidSilentPaymentAddress("sp1q1234567890123456")).toBe(true);
  });

  test("rejects address not starting with sp1", () => {
    expect(isValidSilentPaymentAddress("bc1qsomething12345678")).toBe(false);
  });

  test("rejects empty string", () => {
    expect(isValidSilentPaymentAddress("")).toBe(false);
  });

  test("rejects too short address (19 chars)", () => {
    expect(isValidSilentPaymentAddress("sp1q12345678901234")).toBe(false);
  });

  test("rejects random string", () => {
    expect(isValidSilentPaymentAddress("hello world")).toBe(false);
  });

  test("rejects sp1 alone (only 3 chars)", () => {
    expect(isValidSilentPaymentAddress("sp1")).toBe(false);
  });

  test("rejects bitcoin mainnet address", () => {
    expect(isValidSilentPaymentAddress("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")).toBe(false);
  });
});

describe("getOrCreateAddress", () => {
  test("generates address on first call", async () => {
    const address = await getOrCreateAddress();
    expect(address).toBeTruthy();
    expect(address.startsWith("sp1q")).toBe(true);
  });

  test("returns same address on subsequent calls", async () => {
    const first = await getOrCreateAddress();
    const second = await getOrCreateAddress();
    expect(second).toBe(first);
  });

  test("stores keys in SecureStore", async () => {
    await getOrCreateAddress();
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith("sp_private_key", expect.any(String));
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith("sp_address", expect.any(String));
  });
});

describe("getAddress", () => {
  test("returns null when no address generated", async () => {
    const address = await getAddress();
    expect(address).toBeNull();
  });

  test("returns address after generation", async () => {
    const generated = await getOrCreateAddress();
    const retrieved = await getAddress();
    expect(retrieved).toBe(generated);
  });
});
