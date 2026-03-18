import * as SecureStore from "expo-secure-store";

const SP_PRIVATE_KEY = "sp_private_key";
const SP_ADDRESS_KEY = "sp_address";

// Generate a random hex string (simplified key generation)
function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  for (let i = 0; i < bytes; i++) {
    arr[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Generate a mock silent payment address
// In production, this would use proper BIP-352 derivation
function deriveAddress(privateKey: string): string {
  // Silent payment addresses start with "sp1"
  // This is a simplified mock — real implementation needs secp256k1
  const hash = privateKey.slice(0, 58);
  return `sp1q${hash}`;
}

/** Returns the user's silent payment address, generating a new key pair if none exists. */
export async function getOrCreateAddress(): Promise<string> {
  const existing = await SecureStore.getItemAsync(SP_ADDRESS_KEY);
  if (existing) return existing;

  const privateKey = randomHex(32);
  const address = deriveAddress(privateKey);

  await SecureStore.setItemAsync(SP_PRIVATE_KEY, privateKey);
  await SecureStore.setItemAsync(SP_ADDRESS_KEY, address);

  return address;
}

/** Returns the stored silent payment address, or null if not yet generated. */
export async function getAddress(): Promise<string | null> {
  return SecureStore.getItemAsync(SP_ADDRESS_KEY);
}

/** Validates that a string is a plausible silent payment address (starts with "sp1", length >= 20). */
export function isValidSilentPaymentAddress(address: string): boolean {
  // Basic validation: starts with sp1, reasonable length
  return address.startsWith("sp1") && address.length >= 20;
}
