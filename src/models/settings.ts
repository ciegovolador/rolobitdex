import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { exportEncryptedBackup } from "../lib/backup";

const BIOMETRIC_KEY = "biometric_enabled";

export async function checkBiometric(): Promise<{
  available: boolean;
  enabled: boolean;
}> {
  try {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    const available = compatible && enrolled;
    const saved = await SecureStore.getItemAsync(BIOMETRIC_KEY);
    return { available, enabled: saved === "true" };
  } catch {
    return { available: false, enabled: false };
  }
}

export async function toggleBiometric(
  value: boolean,
  available: boolean
): Promise<boolean> {
  if (value && !available) {
    throw new Error("Biometric authentication is not available on this device.");
  }
  if (value) {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Enable biometric lock",
    });
    if (!result.success) return false;
  }
  await SecureStore.setItemAsync(BIOMETRIC_KEY, value ? "true" : "false");
  return true;
}

export async function performExport(passphrase: string): Promise<void> {
  await exportEncryptedBackup(passphrase.trim());
}
