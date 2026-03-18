import { getDatabase, generateId } from "./database";

export type Contact = {
  id: string;
  name: string;
  avatar_uri: string | null;
  created_at: string;
  updated_at: string;
};

export type BankingAlias = {
  id: string;
  contact_id: string;
  bank_name: string;
  account_identifier: string;
  label: string | null;
  created_at: string;
};

export type SilentPaymentAddress = {
  id: string;
  contact_id: string;
  address: string;
  label: string | null;
  created_at: string;
};

export type TrustNote = {
  id: string;
  contact_id: string;
  note: string;
  created_at: string;
  updated_at: string;
};

// --- Contacts ---

/** Returns all contacts sorted by name (case-insensitive). */
export async function getAllContacts(): Promise<Contact[]> {
  const db = await getDatabase();
  return db.getAllAsync<Contact>("SELECT * FROM contacts ORDER BY name COLLATE NOCASE");
}

/** Searches contacts by name using a LIKE query. */
export async function searchContacts(query: string): Promise<Contact[]> {
  const db = await getDatabase();
  return db.getAllAsync<Contact>(
    "SELECT * FROM contacts WHERE name LIKE ? ORDER BY name COLLATE NOCASE",
    [`%${query}%`]
  );
}

export async function getContact(id: string): Promise<Contact | null> {
  const db = await getDatabase();
  return db.getFirstAsync<Contact>("SELECT * FROM contacts WHERE id = ?", [id]);
}

/** Creates a new contact and returns its generated ID. */
export async function createContact(name: string, avatarUri?: string): Promise<string> {
  const db = await getDatabase();
  const id = generateId();
  await db.runAsync(
    "INSERT INTO contacts (id, name, avatar_uri) VALUES (?, ?, ?)",
    [id, name, avatarUri ?? null]
  );
  return id;
}

export async function updateContact(id: string, name: string, avatarUri?: string | null): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    "UPDATE contacts SET name = ?, avatar_uri = ?, updated_at = datetime('now') WHERE id = ?",
    [name, avatarUri ?? null, id]
  );
}

export async function deleteContact(id: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM contacts WHERE id = ?", [id]);
}

// --- Banking Aliases ---

export async function getAliases(contactId: string): Promise<BankingAlias[]> {
  const db = await getDatabase();
  return db.getAllAsync<BankingAlias>(
    "SELECT * FROM banking_aliases WHERE contact_id = ? ORDER BY created_at",
    [contactId]
  );
}

export async function createAlias(
  contactId: string,
  bankName: string,
  accountIdentifier: string,
  label?: string
): Promise<string> {
  const db = await getDatabase();
  const id = generateId();
  await db.runAsync(
    "INSERT INTO banking_aliases (id, contact_id, bank_name, account_identifier, label) VALUES (?, ?, ?, ?, ?)",
    [id, contactId, bankName, accountIdentifier, label ?? null]
  );
  return id;
}

export async function updateAlias(
  id: string,
  bankName: string,
  accountIdentifier: string,
  label?: string
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    "UPDATE banking_aliases SET bank_name = ?, account_identifier = ?, label = ? WHERE id = ?",
    [bankName, accountIdentifier, label ?? null, id]
  );
}

export async function deleteAlias(id: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM banking_aliases WHERE id = ?", [id]);
}

// --- Silent Payment Addresses ---

export async function getAddresses(contactId: string): Promise<SilentPaymentAddress[]> {
  const db = await getDatabase();
  return db.getAllAsync<SilentPaymentAddress>(
    "SELECT * FROM silent_payment_addresses WHERE contact_id = ? ORDER BY created_at",
    [contactId]
  );
}

export async function createAddress(contactId: string, address: string, label?: string): Promise<string> {
  const db = await getDatabase();
  const id = generateId();
  await db.runAsync(
    "INSERT INTO silent_payment_addresses (id, contact_id, address, label) VALUES (?, ?, ?, ?)",
    [id, contactId, address, label ?? null]
  );
  return id;
}

export async function updateAddress(id: string, address: string, label?: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    "UPDATE silent_payment_addresses SET address = ?, label = ? WHERE id = ?",
    [address, label ?? null, id]
  );
}

export async function deleteAddress(id: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM silent_payment_addresses WHERE id = ?", [id]);
}

// --- Trust Notes ---

export async function getTrustNotes(contactId: string): Promise<TrustNote[]> {
  const db = await getDatabase();
  return db.getAllAsync<TrustNote>(
    "SELECT * FROM trust_notes WHERE contact_id = ? ORDER BY updated_at DESC",
    [contactId]
  );
}

export async function createTrustNote(contactId: string, note: string): Promise<string> {
  const db = await getDatabase();
  const id = generateId();
  await db.runAsync(
    "INSERT INTO trust_notes (id, contact_id, note) VALUES (?, ?, ?)",
    [id, contactId, note]
  );
  return id;
}

export async function updateTrustNote(id: string, note: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    "UPDATE trust_notes SET note = ?, updated_at = datetime('now') WHERE id = ?",
    [note, id]
  );
}

export async function deleteTrustNote(id: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM trust_notes WHERE id = ?", [id]);
}
