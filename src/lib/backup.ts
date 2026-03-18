import { getDatabase } from "../db/database";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

type BackupData = {
  version: 1;
  exported_at: string;
  contacts: any[];
  banking_aliases: any[];
  silent_payment_addresses: any[];
  trades: any[];
  trust_notes: any[];
};

/** Exports all database tables into a structured backup object. */
export async function exportData(): Promise<BackupData> {
  const db = await getDatabase();
  const [contacts, aliases, addresses, trades, notes] = await Promise.all([
    db.getAllAsync("SELECT * FROM contacts"),
    db.getAllAsync("SELECT * FROM banking_aliases"),
    db.getAllAsync("SELECT * FROM silent_payment_addresses"),
    db.getAllAsync("SELECT * FROM trades"),
    db.getAllAsync("SELECT * FROM trust_notes"),
  ]);
  return {
    version: 1,
    exported_at: new Date().toISOString(),
    contacts,
    banking_aliases: aliases,
    silent_payment_addresses: addresses,
    trades,
    trust_notes: notes,
  };
}

// Simple XOR-based encryption with passphrase (for demo purposes)
// In production, use a proper library like tweetnacl or libsodium
export function xorEncrypt(data: string, passphrase: string): string {
  const encoded = [];
  for (let i = 0; i < data.length; i++) {
    encoded.push(data.charCodeAt(i) ^ passphrase.charCodeAt(i % passphrase.length));
  }
  return btoa(String.fromCharCode(...encoded));
}

export function xorDecrypt(encoded: string, passphrase: string): string {
  const decoded = atob(encoded);
  const result = [];
  for (let i = 0; i < decoded.length; i++) {
    result.push(decoded.charCodeAt(i) ^ passphrase.charCodeAt(i % passphrase.length));
  }
  return String.fromCharCode(...result);
}

/** Encrypts all data with the given passphrase, writes to file, and shares it. Returns the file URI. */
export async function exportEncryptedBackup(passphrase: string): Promise<string> {
  const data = await exportData();
  const json = JSON.stringify(data);
  const encrypted = xorEncrypt(json, passphrase);
  const file = new File(Paths.document, "rolobitdex-backup.enc");
  if (!file.exists) file.create();
  file.write(encrypted);
  const path = file.uri;
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(path);
  }
  return path;
}

/** Decrypts a backup file with the given passphrase and restores all data, replacing existing records. */
export async function importEncryptedBackup(fileUri: string, passphrase: string): Promise<void> {
  const importFile = new File(fileUri);
  const encrypted = await importFile.text();
  const json = xorDecrypt(encrypted, passphrase);
  const data: BackupData = JSON.parse(json);

  if (data.version !== 1) throw new Error("Unsupported backup version");

  const db = await getDatabase();
  await db.execAsync("DELETE FROM trust_notes");
  await db.execAsync("DELETE FROM trades");
  await db.execAsync("DELETE FROM silent_payment_addresses");
  await db.execAsync("DELETE FROM banking_aliases");
  await db.execAsync("DELETE FROM contacts");

  for (const c of data.contacts) {
    await db.runAsync(
      "INSERT INTO contacts (id, name, avatar_uri, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
      [c.id, c.name, c.avatar_uri, c.created_at, c.updated_at]
    );
  }
  for (const a of data.banking_aliases) {
    await db.runAsync(
      "INSERT INTO banking_aliases (id, contact_id, bank_name, account_identifier, label, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      [a.id, a.contact_id, a.bank_name, a.account_identifier, a.label, a.created_at]
    );
  }
  for (const a of data.silent_payment_addresses) {
    await db.runAsync(
      "INSERT INTO silent_payment_addresses (id, contact_id, address, label, created_at) VALUES (?, ?, ?, ?, ?)",
      [a.id, a.contact_id, a.address, a.label, a.created_at]
    );
  }
  for (const t of data.trades) {
    await db.runAsync(
      "INSERT INTO trades (id, contact_id, type, sats_amount, fiat_currency, fiat_amount, status, created_at, updated_at, completed_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [t.id, t.contact_id, t.type, t.sats_amount, t.fiat_currency, t.fiat_amount, t.status, t.created_at, t.updated_at, t.completed_at]
    );
  }
  for (const n of data.trust_notes) {
    await db.runAsync(
      "INSERT INTO trust_notes (id, contact_id, note, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
      [n.id, n.contact_id, n.note, n.created_at, n.updated_at]
    );
  }
}
