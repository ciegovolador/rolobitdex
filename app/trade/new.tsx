import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Input } from "../../src/components/Input";
import { Button } from "../../src/components/Button";
import { colors, spacing, fontSize, borderRadius } from "../../src/constants/theme";
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
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.md }}>
      <Stack.Screen options={{ title: "New Trade", headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />

      {/* Type selector */}
      <Text style={styles.label}>Type</Text>
      <View style={styles.typeRow}>
        {(["buy", "sell"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.typeBtn, type === t && styles.typeBtnActive]}
            onPress={() => setType(t)}
          >
            <Text style={[styles.typeText, type === t && styles.typeTextActive]}>
              {t.toUpperCase()} BTC
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contact selector */}
      <Text style={styles.label}>Contact</Text>
      <View style={styles.contactList}>
        {contacts.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[styles.contactChip, selectedContact === c.id && styles.contactChipActive]}
            onPress={() => setSelectedContact(c.id)}
          >
            <Text style={[styles.contactText, selectedContact === c.id && styles.contactTextActive]}>
              {c.name}
            </Text>
          </TouchableOpacity>
        ))}
        {contacts.length === 0 && (
          <Text style={styles.emptyText}>No contacts. Add a contact first.</Text>
        )}
      </View>

      <Input label="Sats Amount" value={sats} onChangeText={setSats} placeholder="100000" keyboardType="numeric" />
      <Input label="Fiat Currency" value={fiatCurrency} onChangeText={setFiatCurrency} placeholder="MXN" />
      <Input label="Fiat Amount" value={fiatAmount} onChangeText={setFiatAmount} placeholder="500" keyboardType="numeric" />

      <Button
        title="Create Trade"
        onPress={handleCreate}
        loading={loading}
        disabled={!selectedContact || !sats || !fiatAmount}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  label: { color: colors.textSecondary, fontSize: fontSize.sm, marginBottom: spacing.xs, marginTop: spacing.sm },
  typeRow: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.md },
  typeBtn: { flex: 1, padding: spacing.sm + 2, borderRadius: borderRadius.sm, backgroundColor: colors.surface, alignItems: "center" },
  typeBtnActive: { backgroundColor: colors.primary },
  typeText: { color: colors.textSecondary, fontWeight: "600" },
  typeTextActive: { color: "#fff" },
  contactList: { flexDirection: "row", flexWrap: "wrap", gap: spacing.xs, marginBottom: spacing.md },
  contactChip: { paddingHorizontal: spacing.sm + 2, paddingVertical: spacing.xs + 2, borderRadius: borderRadius.sm, backgroundColor: colors.surface },
  contactChipActive: { backgroundColor: colors.primary },
  contactText: { color: colors.textSecondary, fontSize: fontSize.sm },
  contactTextActive: { color: "#fff" },
  emptyText: { color: colors.textMuted, fontSize: fontSize.sm },
});
