import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect, router } from "expo-router";
import {
  getContact,
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
  getTradesByContact,
  getContactInitials,
  type Contact,
  type BankingAlias,
  type SilentPaymentAddress,
  type TrustNote,
} from "../models/contact";
import type { Trade } from "../models/trade";

export function useContactDetail(id: string | undefined) {
  const [contact, setContact] = useState<Contact | null>(null);
  const [aliases, setAliases] = useState<BankingAlias[]>([]);
  const [addresses, setAddresses] = useState<SilentPaymentAddress[]>([]);
  const [notes, setNotes] = useState<TrustNote[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [showDelete, setShowDelete] = useState(false);

  // Edit name
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");

  // Add alias form
  const [showAliasForm, setShowAliasForm] = useState(false);
  const [aliasBank, setAliasBank] = useState("");
  const [aliasAccount, setAliasAccount] = useState("");
  const [aliasLabel, setAliasLabel] = useState("");

  // Add address form
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [addrValue, setAddrValue] = useState("");
  const [addrLabel, setAddrLabel] = useState("");

  // Add note form
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteValue, setNoteValue] = useState("");

  const loadAll = useCallback(async () => {
    if (!id) return;
    const [c, a, addr, n, t] = await Promise.all([
      getContact(id),
      getAliases(id),
      getAddresses(id),
      getTrustNotes(id),
      getTradesByContact(id),
    ]);
    setContact(c);
    setAliases(a);
    setAddresses(addr);
    setNotes(n);
    setTrades(t);
    if (c) setNameValue(c.name);
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      loadAll();
    }, [loadAll])
  );

  const saveName = useCallback(async () => {
    if (!contact || !nameValue.trim()) return;
    await updateContact(contact.id, nameValue.trim());
    setEditingName(false);
    loadAll();
  }, [contact, nameValue, loadAll]);

  const startEditName = useCallback(() => setEditingName(true), []);
  const cancelEditName = useCallback(() => setEditingName(false), []);

  const confirmDelete = useCallback(() => setShowDelete(true), []);
  const cancelDelete = useCallback(() => setShowDelete(false), []);

  const handleDelete = useCallback(async () => {
    if (!contact) return;
    await deleteContact(contact.id);
    setShowDelete(false);
    router.back();
  }, [contact]);

  // Alias handlers
  const openAliasForm = useCallback(() => setShowAliasForm(true), []);
  const closeAliasForm = useCallback(() => {
    setShowAliasForm(false);
    setAliasBank("");
    setAliasAccount("");
    setAliasLabel("");
  }, []);

  const addAlias = useCallback(async () => {
    if (!id || !aliasBank.trim() || !aliasAccount.trim()) return;
    await createAlias(id, aliasBank.trim(), aliasAccount.trim(), aliasLabel.trim() || undefined);
    closeAliasForm();
    loadAll();
  }, [id, aliasBank, aliasAccount, aliasLabel, closeAliasForm, loadAll]);

  const removeAlias = useCallback(
    async (aliasId: string) => {
      await deleteAlias(aliasId);
      loadAll();
    },
    [loadAll]
  );

  // Address handlers
  const openAddrForm = useCallback(() => setShowAddrForm(true), []);
  const closeAddrForm = useCallback(() => {
    setShowAddrForm(false);
    setAddrValue("");
    setAddrLabel("");
  }, []);

  const addAddress = useCallback(async () => {
    if (!id || !addrValue.trim()) return;
    if (!addrValue.trim().startsWith("sp1")) {
      Alert.alert("Invalid Address", "Silent payment addresses must start with 'sp1'");
      return;
    }
    await createAddress(id, addrValue.trim(), addrLabel.trim() || undefined);
    closeAddrForm();
    loadAll();
  }, [id, addrValue, addrLabel, closeAddrForm, loadAll]);

  const removeAddress = useCallback(
    async (addrId: string) => {
      await deleteAddress(addrId);
      loadAll();
    },
    [loadAll]
  );

  // Note handlers
  const openNoteForm = useCallback(() => setShowNoteForm(true), []);
  const closeNoteForm = useCallback(() => {
    setShowNoteForm(false);
    setNoteValue("");
  }, []);

  const addNote = useCallback(async () => {
    if (!id || !noteValue.trim()) return;
    await createTrustNote(id, noteValue.trim());
    closeNoteForm();
    loadAll();
  }, [id, noteValue, closeNoteForm, loadAll]);

  const removeNote = useCallback(
    async (noteId: string) => {
      await deleteTrustNote(noteId);
      loadAll();
    },
    [loadAll]
  );

  const initials = contact ? getContactInitials(contact.name) : "";

  return {
    contact,
    initials,
    aliases,
    addresses,
    notes,
    trades,

    // Name editing
    editingName,
    nameValue,
    setNameValue,
    startEditName,
    cancelEditName,
    saveName,

    // Delete
    showDelete,
    confirmDelete,
    cancelDelete,
    handleDelete,

    // Alias form
    showAliasForm,
    aliasBank,
    setAliasBank,
    aliasAccount,
    setAliasAccount,
    aliasLabel,
    setAliasLabel,
    openAliasForm,
    closeAliasForm,
    addAlias,
    removeAlias,

    // Address form
    showAddrForm,
    addrValue,
    setAddrValue,
    addrLabel,
    setAddrLabel,
    openAddrForm,
    closeAddrForm,
    addAddress,
    removeAddress,

    // Note form
    showNoteForm,
    noteValue,
    setNoteValue,
    openNoteForm,
    closeNoteForm,
    addNote,
    removeNote,
  } as const;
}
