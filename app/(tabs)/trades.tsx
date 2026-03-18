import { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedScreen } from "../../src/components/AnimatedScreen";
import { AnimatedListItem } from "../../src/components/AnimatedListItem";
import { colors, spacing, fontSize, borderRadius, elevation, typography, statusColors, breakpoints } from "../../src/constants/theme";
import { getAllTrades, Trade, TradeStatus } from "../../src/db/trades";
import { getContact } from "../../src/db/contacts";

type TradeWithContact = Trade & { contact_name: string };

const STATUS_FILTERS: (TradeStatus | "all")[] = ["all", "pending", "accepted", "fiat_sent", "fiat_received", "completed", "cancelled"];

export default function TradesScreen() {
  const { width } = useWindowDimensions();
  const numColumns = width >= breakpoints.tablet ? 2 : 1;
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

  return (
    <AnimatedScreen>
      <View style={styles.filters}>
        {STATUS_FILTERS.map((f) => {
          const isActive = filter === f;
          const chipColor = f !== "all" ? statusColors[f] : undefined;
          return (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterChip,
                isActive && { backgroundColor: chipColor || colors.primary },
              ]}
              onPress={() => setFilter(f)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {f === "all" ? "All" : f.replace("_", " ")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {trades.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="swap-horizontal-outline" size={56} color={colors.textMuted} />
          <Text style={styles.emptyText}>No trades</Text>
        </View>
      ) : (
        <FlatList
          key={numColumns}
          data={trades}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
          columnWrapperStyle={numColumns > 1 ? { gap: spacing.sm } : undefined}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          renderItem={({ item, index }) => (
            <AnimatedListItem index={index}>
            <TouchableOpacity
              style={styles.tradeRow}
              onPress={() => router.push(`/trade/${item.id}`)}
              activeOpacity={0.7}
            >
              <View style={[styles.statusDot, { backgroundColor: statusColors[item.status] || colors.textMuted }]} />
              <View style={styles.tradeInfo}>
                <Text style={styles.tradeTitle}>
                  {item.type.toUpperCase()} {item.sats_amount.toLocaleString()} sats
                </Text>
                <Text style={styles.tradeSub}>
                  {item.fiat_amount} {item.fiat_currency} with {item.contact_name}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: statusColors[item.status] + "20" }]}>
                <Text style={[styles.statusText, { color: statusColors[item.status] }]}>
                  {item.status.replace("_", " ")}
                </Text>
              </View>
            </TouchableOpacity>
            </AnimatedListItem>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/trade/new")}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignSelf: "center", width: "100%", maxWidth: 800 },
  filters: { flexDirection: "row", flexWrap: "wrap", padding: spacing.sm, gap: spacing.xs },
  filterChip: {
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterText: { color: colors.textSecondary, ...typography.xs, textTransform: "capitalize" },
  filterTextActive: { color: "#fff", fontWeight: "600" },
  list: { padding: spacing.md },
  tradeRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.md,
  },
  tradeInfo: { flex: 1 },
  tradeTitle: { color: colors.text, ...typography.md, fontWeight: "600" },
  tradeSub: { color: colors.textSecondary, ...typography.xs, marginTop: 2 },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: { ...typography.xs, fontWeight: "600", textTransform: "capitalize" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: colors.textSecondary, ...typography.lg, marginTop: spacing.md },
  fab: {
    position: "absolute", bottom: spacing.lg, right: spacing.lg,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.primary, alignItems: "center", justifyContent: "center",
    boxShadow: elevation[3],
  } as any,
});
