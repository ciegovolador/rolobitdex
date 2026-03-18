import { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "../../src/components/Input";
import { AnimatedScreen } from "../../src/components/AnimatedScreen";
import { AnimatedListItem } from "../../src/components/AnimatedListItem";
import { colors, spacing, fontSize, borderRadius, elevation, typography } from "../../src/constants/theme";
import { breakpoints } from "../../src/constants/theme";
import { getAllContacts, searchContacts, Contact } from "../../src/db/contacts";

export default function ContactsScreen() {
  const { width } = useWindowDimensions();
  const numColumns = width >= breakpoints.tablet ? 2 : 1;
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

  function renderContact({ item, index }: { item: Contact; index: number }) {
    const initials = item.name.slice(0, 2).toUpperCase();
    return (
      <AnimatedListItem index={index}>
        <TouchableOpacity
          style={styles.contactRow}
          onPress={() => router.push(`/contact/${item.id}`)}
          activeOpacity={0.7}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactSub}>Tap to view details</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </AnimatedListItem>
    );
  }

  return (
    <AnimatedScreen>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search contacts..."
          value={query}
          onChangeText={setQuery}
        />
      </View>
      {contacts.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="people-outline" size={56} color={colors.textMuted} />
          <Text style={styles.emptyText}>
            {query ? "No contacts found" : "No contacts yet"}
          </Text>
          {!query && (
            <Text style={styles.emptyHint}>Tap + to add your first contact</Text>
          )}
        </View>
      ) : (
        <FlatList
          key={numColumns}
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderContact}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
          columnWrapperStyle={numColumns > 1 ? { gap: spacing.sm } : undefined}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/contact/new")}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignSelf: "center", width: "100%", maxWidth: 800 },
  searchContainer: { paddingHorizontal: spacing.md, paddingTop: spacing.md },
  list: { padding: spacing.md },
  contactRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: fontSize.md },
  contactInfo: { flex: 1 },
  contactName: { color: colors.text, ...typography.lg },
  contactSub: { color: colors.textMuted, ...typography.xs, marginTop: 2 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: colors.textSecondary, ...typography.lg, marginTop: spacing.md },
  emptyHint: { color: colors.textMuted, ...typography.sm, marginTop: spacing.xs },
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
    boxShadow: elevation[3],
  } as any,
});
