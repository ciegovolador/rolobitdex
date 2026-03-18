import { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "../../src/components/Input";
import { colors, spacing, fontSize, borderRadius } from "../../src/constants/theme";
import { getAllContacts, searchContacts, Contact } from "../../src/db/contacts";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [query, setQuery] = useState("");

  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [query])
  );

  async function loadContacts() {
    const results = query.trim() ? await searchContacts(query.trim()) : await getAllContacts();
    setContacts(results);
  }

  function renderContact({ item }: { item: Contact }) {
    const initials = item.name.slice(0, 2).toUpperCase();
    return (
      <TouchableOpacity
        style={styles.contactRow}
        onPress={() => router.push(`/contact/${item.id}`)}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.contactName}>{item.name}</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search contacts..."
        value={query}
        onChangeText={setQuery}
        style={{ marginHorizontal: spacing.md, marginTop: spacing.md }}
      />
      {contacts.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="people-outline" size={48} color={colors.textMuted} />
          <Text style={styles.emptyText}>
            {query ? "No contacts found" : "No contacts yet"}
          </Text>
          {!query && (
            <Text style={styles.emptyHint}>Tap + to add your first contact</Text>
          )}
        </View>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderContact}
          contentContainerStyle={{ padding: spacing.md }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/contact/new")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: fontSize.md },
  contactName: { flex: 1, color: colors.text, fontSize: fontSize.lg },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: colors.textSecondary, fontSize: fontSize.lg, marginTop: spacing.md },
  emptyHint: { color: colors.textMuted, fontSize: fontSize.md, marginTop: spacing.xs },
  fab: {
    position: "absolute",
    bottom: spacing.lg,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
  },
});
