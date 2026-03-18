import { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useFocusEffect, router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { Input } from "../../src/components/Input";
import { ConfirmModal } from "../../src/components/ConfirmModal";
import { colors, spacing, fontSize, borderRadius } from "../../src/constants/theme";
import {
  getContact, updateContact, deleteContact,
  getAliases, createAlias, deleteAlias,
  getAddresses, createAddress, deleteAddress,
  getTrustNotes, createTrustNote, updateTrustNote, deleteTrustNote,
  Contact, BankingAlias, SilentPaymentAddress, TrustNote,
} from "../../src/db/contacts";
import { getTradesByContact, Trade } from "../../src/db/trades";

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
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

  useFocusEffect(
    useCallback(() => {
      loadAll();
    }, [id])
  );

  async function loadAll() {
    if (!id) return;
    const [c, a, addr, n, t] = await Promise.all([
      getContact(id), getAliases(id), getAddresses(id), getTrustNotes(id), getTradesByContact(id),
    ]);
    setContact(c);
    setAliases(a);
    setAddresses(addr);
    setNotes(n);
    setTrades(t);
    if (c) setNameValue(c.name);
  }

  async function handleSaveName() {
    if (!contact || !nameValue.trim()) return;
    await updateContact(contact.id, nameValue.trim());
    setEditingName(false);
    loadAll();
  }

  async function handleDelete() {
    if (!contact) return;
    await deleteContact(contact.id);
    setShowDelete(false);
    router.back();
  }

  async function handleAddAlias() {
    if (!id || !aliasBank.trim() || !aliasAccount.trim()) return;
    await createAlias(id, aliasBank.trim(), aliasAccount.trim(), aliasLabel.trim() || undefined);
    setShowAliasForm(false);
    setAliasBank("");
    setAliasAccount("");
    setAliasLabel("");
    loadAll();
  }

  async function handleDeleteAlias(aliasId: string) {
    await deleteAlias(aliasId);
    loadAll();
  }

  async function handleAddAddress() {
    if (!id || !addrValue.trim()) return;
    // Basic silent payment address validation (starts with "sp1")
    if (!addrValue.trim().startsWith("sp1")) {
      Alert.alert("Invalid Address", "Silent payment addresses must start with 'sp1'");
      return;
    }
    await createAddress(id, addrValue.trim(), addrLabel.trim() || undefined);
    setShowAddrForm(false);
    setAddrValue("");
    setAddrLabel("");
    loadAll();
  }

  async function handleDeleteAddress(addrId: string) {
    await deleteAddress(addrId);
    loadAll();
  }

  async function handleAddNote() {
    if (!id || !noteValue.trim()) return;
    await createTrustNote(id, noteValue.trim());
    setShowNoteForm(false);
    setNoteValue("");
    loadAll();
  }

  async function handleDeleteNote(noteId: string) {
    await deleteTrustNote(noteId);
    loadAll();
  }

  if (!contact) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Contact", headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const initials = contact.name.slice(0, 2).toUpperCase();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}>
      <Stack.Screen options={{ title: contact.name, headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />

      {/* Contact header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        {editingName ? (
          <View style={{ flex: 1 }}>
            <Input value={nameValue} onChangeText={setNameValue} autoFocus />
            <View style={{ flexDirection: "row", gap: spacing.sm }}>
              <Button title="Save" onPress={handleSaveName} style={{ flex: 1 }} />
              <Button title="Cancel" variant="secondary" onPress={() => setEditingName(false)} style={{ flex: 1 }} />
            </View>
          </View>
        ) : (
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setEditingName(true)}>
            <Text style={styles.name}>{contact.name}</Text>
            <Text style={styles.hint}>Tap to edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Banking Aliases */}
      <SectionHeader title="Banking Aliases" onAdd={() => setShowAliasForm(true)} />
      {aliases.map((a) => (
        <Card key={a.id} style={styles.itemCard}>
          <View style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{a.bank_name}</Text>
              <Text style={styles.itemSub}>{a.account_identifier}</Text>
              {a.label && <Text style={styles.itemLabel}>{a.label}</Text>}
            </View>
            <TouchableOpacity onPress={() => handleDeleteAlias(a.id)}>
              <Ionicons name="trash-outline" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        </Card>
      ))}
      {showAliasForm && (
        <Card style={styles.formCard}>
          <Input label="Bank Name" value={aliasBank} onChangeText={setAliasBank} placeholder="e.g. BBVA" />
          <Input label="Account" value={aliasAccount} onChangeText={setAliasAccount} placeholder="e.g. CLABE" />
          <Input label="Label (optional)" value={aliasLabel} onChangeText={setAliasLabel} placeholder="e.g. personal" />
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Button title="Add" onPress={handleAddAlias} disabled={!aliasBank.trim() || !aliasAccount.trim()} style={{ flex: 1 }} />
            <Button title="Cancel" variant="secondary" onPress={() => setShowAliasForm(false)} style={{ flex: 1 }} />
          </View>
        </Card>
      )}
      {aliases.length === 0 && !showAliasForm && (
        <Text style={styles.emptySection}>No banking aliases</Text>
      )}

      {/* Silent Payment Addresses */}
      <SectionHeader title="Silent Payment Addresses" onAdd={() => setShowAddrForm(true)} />
      {addresses.map((a) => (
        <Card key={a.id} style={styles.itemCard}>
          <View style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemSub} numberOfLines={1} ellipsizeMode="middle">{a.address}</Text>
              {a.label && <Text style={styles.itemLabel}>{a.label}</Text>}
            </View>
            <TouchableOpacity onPress={() => handleDeleteAddress(a.id)}>
              <Ionicons name="trash-outline" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        </Card>
      ))}
      {showAddrForm && (
        <Card style={styles.formCard}>
          <Input label="Silent Payment Address" value={addrValue} onChangeText={setAddrValue} placeholder="sp1..." />
          <Input label="Label (optional)" value={addrLabel} onChangeText={setAddrLabel} placeholder="e.g. main" />
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Button title="Add" onPress={handleAddAddress} disabled={!addrValue.trim()} style={{ flex: 1 }} />
            <Button title="Cancel" variant="secondary" onPress={() => setShowAddrForm(false)} style={{ flex: 1 }} />
          </View>
        </Card>
      )}
      {addresses.length === 0 && !showAddrForm && (
        <Text style={styles.emptySection}>No silent payment addresses</Text>
      )}

      {/* Trust Notes */}
      <SectionHeader title="Trust Notes" onAdd={() => setShowNoteForm(true)} />
      {notes.map((n) => (
        <Card key={n.id} style={styles.itemCard}>
          <View style={styles.itemRow}>
            <Text style={[styles.itemSub, { flex: 1 }]}>{n.note}</Text>
            <TouchableOpacity onPress={() => handleDeleteNote(n.id)}>
              <Ionicons name="trash-outline" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        </Card>
      ))}
      {showNoteForm && (
        <Card style={styles.formCard}>
          <Input label="Note" value={noteValue} onChangeText={setNoteValue} placeholder="e.g. Reliable, always pays fast" multiline />
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Button title="Add" onPress={handleAddNote} disabled={!noteValue.trim()} style={{ flex: 1 }} />
            <Button title="Cancel" variant="secondary" onPress={() => setShowNoteForm(false)} style={{ flex: 1 }} />
          </View>
        </Card>
      )}
      {notes.length === 0 && !showNoteForm && (
        <Text style={styles.emptySection}>No trust notes</Text>
      )}

      {/* Trade History */}
      <SectionHeader
        title={`Trade History (${trades.length})`}
        onAdd={() => router.push(`/trade/new?contactId=${id}`)}
        addLabel="New Trade"
      />
      {trades.slice(0, 5).map((t) => (
        <TouchableOpacity key={t.id} onPress={() => router.push(`/trade/${t.id}`)}>
          <Card style={styles.itemCard}>
            <View style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>
                  {t.type.toUpperCase()} {t.sats_amount.toLocaleString()} sats
                </Text>
                <Text style={styles.itemSub}>
                  {t.fiat_amount} {t.fiat_currency} - {t.status}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </View>
          </Card>
        </TouchableOpacity>
      ))}
      {trades.length === 0 && (
        <Text style={styles.emptySection}>No trades yet</Text>
      )}

      {/* Delete Contact */}
      <Button
        title="Delete Contact"
        variant="danger"
        onPress={() => setShowDelete(true)}
        style={{ marginTop: spacing.xl }}
      />

      <ConfirmModal
        visible={showDelete}
        title="Delete Contact"
        message={`Delete "${contact.name}" and all associated data? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </ScrollView>
  );
}

function SectionHeader({ title, onAdd, addLabel }: { title: string; onAdd: () => void; addLabel?: string }) {
  return (
    <View style={sectionStyles.header}>
      <Text style={sectionStyles.title}>{title}</Text>
      <TouchableOpacity onPress={onAdd}>
        <Text style={sectionStyles.addBtn}>{addLabel || "+ Add"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: spacing.lg, marginBottom: spacing.sm },
  title: { color: colors.text, fontSize: fontSize.lg, fontWeight: "700" },
  addBtn: { color: colors.primary, fontSize: fontSize.md, fontWeight: "600" },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingText: { color: colors.textSecondary, textAlign: "center", marginTop: 40 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: spacing.md },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginRight: spacing.md,
  },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: fontSize.xl },
  name: { color: colors.text, fontSize: fontSize.xxl, fontWeight: "700" },
  hint: { color: colors.textMuted, fontSize: fontSize.sm },
  itemCard: { marginBottom: spacing.xs },
  itemRow: { flexDirection: "row", alignItems: "center" },
  itemTitle: { color: colors.text, fontSize: fontSize.md, fontWeight: "600" },
  itemSub: { color: colors.textSecondary, fontSize: fontSize.sm },
  itemLabel: { color: colors.primary, fontSize: fontSize.sm, marginTop: 2 },
  formCard: { marginBottom: spacing.sm },
  emptySection: { color: colors.textMuted, fontSize: fontSize.sm, marginBottom: spacing.sm },
});
