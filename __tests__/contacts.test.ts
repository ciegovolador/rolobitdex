import { initMockDb, mockRows } from "./setup";
import {
  getAllContacts, searchContacts, getContact,
  createContact, updateContact, deleteContact,
  getAliases, createAlias, updateAlias, deleteAlias,
  getAddresses, createAddress, updateAddress, deleteAddress,
  getTrustNotes, createTrustNote, updateTrustNote, deleteTrustNote,
} from "../src/db/contacts";

beforeEach(() => {
  initMockDb();
  // Init tables
  mockRows.contacts = [];
  mockRows.banking_aliases = [];
  mockRows.silent_payment_addresses = [];
  mockRows.trust_notes = [];
});

describe("Contacts CRUD", () => {
  test("createContact returns an ID", async () => {
    const id = await createContact("Alice");
    expect(id).toBeTruthy();
    expect(typeof id).toBe("string");
  });

  test("getContact returns created contact", async () => {
    const id = await createContact("Bob");
    const contact = await getContact(id);
    expect(contact).toBeTruthy();
    expect(contact!.name).toBe("Bob");
  });

  test("getAllContacts returns all contacts", async () => {
    await createContact("Alice");
    await createContact("Bob");
    const all = await getAllContacts();
    expect(all.length).toBe(2);
  });

  test("searchContacts filters by name", async () => {
    await createContact("Alice");
    await createContact("Bob");
    const results = await searchContacts("Ali");
    expect(results.length).toBe(1);
    expect(results[0].name).toBe("Alice");
  });

  test("updateContact changes the name", async () => {
    const id = await createContact("Alice");
    await updateContact(id, "Alice B.");
    const contact = await getContact(id);
    expect(contact!.name).toBe("Alice B.");
  });

  test("deleteContact removes the contact", async () => {
    const id = await createContact("Alice");
    await deleteContact(id);
    const contact = await getContact(id);
    expect(contact).toBeNull();
  });

  test("getContact returns null for non-existent id", async () => {
    const contact = await getContact("nonexistent");
    expect(contact).toBeNull();
  });

  test("searchContacts returns empty for no match", async () => {
    await createContact("Alice");
    const results = await searchContacts("Zzzz");
    expect(results.length).toBe(0);
  });

  test("createContact with avatar", async () => {
    const id = await createContact("Alice", "file:///avatar.png");
    const contact = await getContact(id);
    expect(contact!.avatar_uri).toBe("file:///avatar.png");
  });

  test("updateContact clears avatar with null", async () => {
    const id = await createContact("Alice", "file:///avatar.png");
    await updateContact(id, "Alice", null);
    const contact = await getContact(id);
    expect(contact!.avatar_uri).toBeNull();
  });
});

describe("Banking Aliases", () => {
  test("createAlias and getAliases", async () => {
    const contactId = await createContact("Alice");
    await createAlias(contactId, "BBVA", "123456", "personal");
    const aliases = await getAliases(contactId);
    expect(aliases.length).toBe(1);
    expect(aliases[0].bank_name).toBe("BBVA");
  });

  test("deleteAlias removes the alias", async () => {
    const contactId = await createContact("Alice");
    const aliasId = await createAlias(contactId, "BBVA", "123456");
    await deleteAlias(aliasId);
    const aliases = await getAliases(contactId);
    expect(aliases.length).toBe(0);
  });

  test("createAlias without label", async () => {
    const contactId = await createContact("Alice");
    await createAlias(contactId, "Banamex", "789012");
    const aliases = await getAliases(contactId);
    expect(aliases[0].label).toBeNull();
  });

  test("updateAlias changes fields", async () => {
    const contactId = await createContact("Alice");
    const aliasId = await createAlias(contactId, "BBVA", "123456", "personal");
    await updateAlias(aliasId, "Banamex", "789012", "business");
    const aliases = await getAliases(contactId);
    expect(aliases[0].bank_name).toBe("Banamex");
    expect(aliases[0].account_identifier).toBe("789012");
    expect(aliases[0].label).toBe("business");
  });

  test("multiple aliases per contact", async () => {
    const contactId = await createContact("Alice");
    await createAlias(contactId, "BBVA", "111");
    await createAlias(contactId, "Banamex", "222");
    await createAlias(contactId, "HSBC", "333");
    const aliases = await getAliases(contactId);
    expect(aliases.length).toBe(3);
  });
});

describe("Silent Payment Addresses", () => {
  test("createAddress and getAddresses", async () => {
    const contactId = await createContact("Alice");
    await createAddress(contactId, "sp1qtest123456789012345678");
    const addrs = await getAddresses(contactId);
    expect(addrs.length).toBe(1);
    expect(addrs[0].address).toContain("sp1q");
  });

  test("deleteAddress removes the address", async () => {
    const contactId = await createContact("Alice");
    const addrId = await createAddress(contactId, "sp1qtest123456789012345678");
    await deleteAddress(addrId);
    const addrs = await getAddresses(contactId);
    expect(addrs.length).toBe(0);
  });

  test("createAddress with label", async () => {
    const contactId = await createContact("Alice");
    await createAddress(contactId, "sp1qtest123456789012345678", "main");
    const addrs = await getAddresses(contactId);
    expect(addrs[0].label).toBe("main");
  });

  test("updateAddress changes fields", async () => {
    const contactId = await createContact("Alice");
    const addrId = await createAddress(contactId, "sp1qold000000000000000000");
    await updateAddress(addrId, "sp1qnew000000000000000000", "updated");
    const addrs = await getAddresses(contactId);
    expect(addrs[0].address).toBe("sp1qnew000000000000000000");
    expect(addrs[0].label).toBe("updated");
  });
});

describe("Trust Notes", () => {
  test("createTrustNote and getTrustNotes", async () => {
    const contactId = await createContact("Alice");
    await createTrustNote(contactId, "Very reliable");
    const notes = await getTrustNotes(contactId);
    expect(notes.length).toBe(1);
    expect(notes[0].note).toBe("Very reliable");
  });

  test("deleteTrustNote removes the note", async () => {
    const contactId = await createContact("Alice");
    const noteId = await createTrustNote(contactId, "Reliable");
    await deleteTrustNote(noteId);
    const notes = await getTrustNotes(contactId);
    expect(notes.length).toBe(0);
  });

  test("updateTrustNote changes the text", async () => {
    const contactId = await createContact("Alice");
    const noteId = await createTrustNote(contactId, "Reliable");
    await updateTrustNote(noteId, "Very reliable, always on time");
    const notes = await getTrustNotes(contactId);
    expect(notes[0].note).toBe("Very reliable, always on time");
  });

  test("multiple trust notes per contact", async () => {
    const contactId = await createContact("Alice");
    await createTrustNote(contactId, "First note");
    await createTrustNote(contactId, "Second note");
    const notes = await getTrustNotes(contactId);
    expect(notes.length).toBe(2);
  });
});
