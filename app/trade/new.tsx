import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Input } from "../../src/components/Input";
import { Button } from "../../src/components/Button";
import { Card } from "../../src/components/Card";
import { colors, spacing, fontSize, borderRadius, typography } from "../../src/constants/theme";
import { getAllContacts, Contact } from "../../src/db/contacts";
import { createTrade } from "../../src/db/trades";

export default function NewTradeScreen() {
  const { contactId } = useLocalSearchParams<{ contactId?: string }>();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<string>(contactId ?? "");
  const [type, setType] = useState<"buy" | "sell">("buy");
  const [sats, setSats] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("MXN");
  const [fiatAmount, setFiatAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllContacts().then(setContacts);
  }, []);

  async function handleCreate() {
    if (!selectedContact || !sats || !fiatAmount) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    const satsNum = parseInt(sats, 10);
    const fiatNum = parseFloat(fiatAmount);
    if (isNaN(satsNum) || satsNum <= 0) {
      Alert.alert("Error", "Sats amount must be a positive number");
      return;
    }
    if (isNaN(fiatNum) || fiatNum <= 0) {
      Alert.alert("Error", "Fiat amount must be a positive number");
      return;
    }
    setLoading(true);
    try {
      const id = await createTrade(selectedContact, type, satsNum, fiatCurrency.trim(), fiatNum);
      router.replace(`/trade/${id}`);
    } catch (e) {
      Alert.alert("Error", "Failed to create trade");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Stack.Screen options={{ title: "New Trade", headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />

      {/* Type selector */}
      <Text style={styles.sectionLabel}>Trade Type</Text>
      <View style={styles.typeRow}>
        {(["buy", "sell"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.typeBtn, type === t && styles.typeBtnActive]}
            onPress={() => setType(t)}
            activeOpacity={0.7}
          >
            <Text style={[styles.typeText, type === t && styles.typeTextActive]}>
              {t === "buy" ? "BUY BTC" : "SELL BTC"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contact selector */}
      <Text style={styles.sectionLabel}>Counterparty</Text>
      <Card>
        <View style={styles.contactList}>
          {contacts.map((c) => {
            const isSelected = selectedContact === c.id;
            return (
              <TouchableOpacity
                key={c.id}
                style={[styles.contactChip, isSelected && styles.contactChipActive]}
                onPress={() => setSelectedContact(c.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.contactText, isSelected && styles.contactTextActive]}>
                  {c.name}
                </Text>
              </TouchableOpacity>
            );
          })}
          {contacts.length === 0 && (
            <Text style={styles.emptyText}>No contacts. Add a contact first.</Text>
          )}
        </View>
      </Card>

      {/* Trade details */}
      <Text style={styles.sectionLabel}>Trade Details</Text>
      <Input label="Sats Amount" value={sats} onChangeText={setSats} placeholder="100000" keyboardType="numeric" />
      <Input label="Fiat Currency" value={fiatCurrency} onChangeText={setFiatCurrency} placeholder="MXN" />
      <Input label="Fiat Amount" value={fiatAmount} onChangeText={setFiatAmount} placeholder="500" keyboardType="numeric" />

      <Button
        title="Create Trade"
        onPress={handleCreate}
        loading={loading}
        disabled={!selectedContact || !sats || !fiatAmount}
        style={{ marginTop: spacing.sm }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: spacing.md, paddingBottom: spacing.xl },
  sectionLabel: {
    color: colors.textSecondary,
    ...typography.xs,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
    marginLeft: spacing.xs,
  },
  typeRow: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.md },
  typeBtn: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  typeText: { color: colors.textSecondary, fontWeight: "700", ...typography.md },
  typeTextActive: { color: "#fff" },
  contactList: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  contactChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceLight,
  },
  contactChipActive: { backgroundColor: colors.primary },
  contactText: { color: colors.textSecondary, ...typography.sm },
  contactTextActive: { color: "#fff", fontWeight: "600" },
  emptyText: { color: colors.textMuted, ...typography.sm },
});
