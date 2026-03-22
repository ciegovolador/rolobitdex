import { checkBiometric, toggleBiometric, performExport } from "./settings";

jest.mock("expo-local-authentication", () => ({
  hasHardwareAsync: jest.fn(),
  isEnrolledAsync: jest.fn(),
  authenticateAsync: jest.fn(),
}));

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
}));

jest.mock("../lib/backup", () => ({
  exportEncryptedBackup: jest.fn(),
}));

const LocalAuth = require("expo-local-authentication");
const SecureStore = require("expo-secure-store");
const backup = require("../lib/backup");

beforeEach(() => jest.clearAllMocks());

describe("checkBiometric", () => {
  test("returns available and enabled when hardware present, enrolled, and saved", async () => {
    LocalAuth.hasHardwareAsync.mockResolvedValue(true);
    LocalAuth.isEnrolledAsync.mockResolvedValue(true);
    SecureStore.getItemAsync.mockResolvedValue("true");

    const result = await checkBiometric();
    expect(result).toEqual({ available: true, enabled: true });
  });

  test("returns not available when no hardware", async () => {
    LocalAuth.hasHardwareAsync.mockResolvedValue(false);
    LocalAuth.isEnrolledAsync.mockResolvedValue(true);
    SecureStore.getItemAsync.mockResolvedValue("false");

    const result = await checkBiometric();
    expect(result).toEqual({ available: false, enabled: false });
  });

  test("returns not available when not enrolled", async () => {
    LocalAuth.hasHardwareAsync.mockResolvedValue(true);
    LocalAuth.isEnrolledAsync.mockResolvedValue(false);
    SecureStore.getItemAsync.mockResolvedValue("false");

    const result = await checkBiometric();
    expect(result).toEqual({ available: false, enabled: false });
  });

  test("returns not enabled when saved value is not true", async () => {
    LocalAuth.hasHardwareAsync.mockResolvedValue(true);
    LocalAuth.isEnrolledAsync.mockResolvedValue(true);
    SecureStore.getItemAsync.mockResolvedValue("false");

    const result = await checkBiometric();
    expect(result).toEqual({ available: true, enabled: false });
  });

  test("returns defaults on error", async () => {
    LocalAuth.hasHardwareAsync.mockRejectedValue(new Error("fail"));

    const result = await checkBiometric();
    expect(result).toEqual({ available: false, enabled: false });
  });
});

describe("toggleBiometric", () => {
  test("throws when enabling without available hardware", async () => {
    await expect(toggleBiometric(true, false)).rejects.toThrow(
      "Biometric authentication is not available on this device."
    );
  });

  test("returns false when authentication fails", async () => {
    LocalAuth.authenticateAsync.mockResolvedValue({ success: false });

    const result = await toggleBiometric(true, true);
    expect(result).toBe(false);
  });

  test("stores true on successful enable", async () => {
    LocalAuth.authenticateAsync.mockResolvedValue({ success: true });

    const result = await toggleBiometric(true, true);
    expect(result).toBe(true);
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      "biometric_enabled",
      "true"
    );
  });

  test("stores false on disable without prompting auth", async () => {
    const result = await toggleBiometric(false, true);
    expect(result).toBe(true);
    expect(LocalAuth.authenticateAsync).not.toHaveBeenCalled();
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      "biometric_enabled",
      "false"
    );
  });
});

describe("performExport", () => {
  test("calls exportEncryptedBackup with trimmed passphrase", async () => {
    backup.exportEncryptedBackup.mockResolvedValue(undefined);

    await performExport("  my secret  ");
    expect(backup.exportEncryptedBackup).toHaveBeenCalledWith("my secret");
  });
});
