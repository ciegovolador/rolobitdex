import { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, fontSize, borderRadius } from "../../src/constants/theme";
import { getAllTrades, Trade, TradeStatus } from "../../src/db/trades";
import { getContact } from "../../src/db/contacts";

type TradeWithContact = Trade & { contact_name: string };

const STATUS_FILTERS: (TradeStatus | "all")[] = ["all", "pending", "accepted", "fiat_sent", "fiat_received", "completed", "cancelled"];

export default function TradesScreen() {
  const [trades, setTrades] = useState<TradeWithContact[]>([]);
  const [filter, setFilter] = useState<TradeStatus | "all">("all");

  useFocusEffect(
    useCallback(() => {
      loadTrades();
    }, [filter])
  );

  async function loadTrades() {
    const raw = await getAllTrades(filter === "all" ? undefined : filter);
    const withNames = await Promise.all(
      raw.map(async (t) => {
        const c = await getContact(t.contact_id);
        return { ...t, contact_name: c?.name ?? "Unknown" };
      })
    );
    setTrades(withNames);
  }

  const statusColor = (s: TradeStatus) => {
    if (s === "completed") return colors.success;
    if (s === "cancelled") return colors.error;
    if (s === "pending") return colors.textMuted;
    return colors.warning;
  };

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {STATUS_FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === "all" ? "All" : f.replace("_", " ")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {trades.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="swap-horizontal-outline" size={48} color={colors.textMuted} />
          <Text style={styles.emptyText}>No trades</Text>
        </View>
      ) : (
        <FlatList
          data={trades}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.md }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tradeRow}
              onPress={() => router.push(`/trade/${item.id}`)}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.tradeTitle}>
                  {item.type.toUpperCase()} {item.sats_amount.toLocaleString()} sats
                </Text>
                <Text style={styles.tradeSub}>
                  {item.fiat_amount} {item.fiat_currency} with {item.contact_name}
                </Text>
              </View>
              <Text style={[styles.status, { color: statusColor(item.status) }]}>
                {item.status.replace("_", " ")}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/trade/new")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  filters: { flexDirection: "row", flexWrap: "wrap", padding: spacing.sm, gap: spacing.xs },
  filterChip: { paddingHorizontal: spacing.sm + 2, paddingVertical: spacing.xs + 2, borderRadius: borderRadius.sm, backgroundColor: colors.surface },
  filterActive: { backgroundColor: colors.primary },
  filterText: { color: colors.textSecondary, fontSize: fontSize.sm, textTransform: "capitalize" },
  filterTextActive: { color: "#fff" },
  tradeRow: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.sm },
  tradeTitle: { color: colors.text, fontSize: fontSize.md, fontWeight: "600" },
  tradeSub: { color: colors.textSecondary, fontSize: fontSize.sm },
  status: { fontSize: fontSize.sm, fontWeight: "600", textTransform: "capitalize" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: colors.textSecondary, fontSize: fontSize.lg, marginTop: spacing.md },
  fab: {
    position: "absolute", bottom: spacing.lg, right: spacing.lg,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.primary, alignItems: "center", justifyContent: "center",
    elevation: 4, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
  },
});
