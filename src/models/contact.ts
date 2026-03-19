export type {
  Contact,
  BankingAlias,
  SilentPaymentAddress,
  TrustNote,
} from "../db/contacts";

export {
  getAllContacts,
  searchContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getAliases,
  createAlias,
  deleteAlias,
  getAddresses,
  createAddress,
  deleteAddress,
  getTrustNotes,
  createTrustNote,
  deleteTrustNote,
} from "../db/contacts";

export { getTradesByContact } from "../db/trades";

import { searchContacts, createContact } from "../db/contacts";

export function getContactInitials(name: string): string {
  return name.slice(0, 2).toUpperCase();
}

export function isValidContactName(name: string): boolean {
  return name.trim().length > 0;
}

export async function createContactIdempotent(name: string): Promise<string> {
  const trimmed = name.trim();
  const existing = await searchContacts(trimmed);
  const exact = existing.find(
    (c) => c.name.toLowerCase() === trimmed.toLowerCase()
  );
  if (exact) return exact.id;
  return createContact(trimmed);
}
