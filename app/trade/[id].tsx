import { useState, useCallback } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { useLocalSearchParams, useFocusEffect, Stack } from "expo-router";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { colors, spacing, fontSize, borderRadius, typography, statusColors, animation } from "../../src/constants/theme";
import { getTrade, updateTradeStatus, Trade, TradeStatus, canTransition } from "../../src/db/trades";
import { getContact } from "../../src/db/contacts";

const STATUS_STEPS: TradeStatus[] = ["pending", "accepted", "fiat_sent", "fiat_received", "completed"];

const NEXT_ACTION: Partial<Record<TradeStatus, { label: string; next: TradeStatus }>> = {
  pending: { label: "Mark as Accepted", next: "accepted" },
  accepted: { label: "Mark Fiat Sent", next: "fiat_sent" },
  fiat_sent: { label: "Confirm Fiat Received", next: "fiat_received" },
  fiat_received: { label: "Release BTC (Complete)", next: "completed" },
};

export default function TradeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [trade, setTrade] = useState<Trade | null>(null);
  const [contactName, setContactName] = useState("");

  useFocusEffect(
    useCallback(() => {
      loadTrade();
    }, [id])
  );

  async function loadTrade() {
    if (!id) return;
    const t = await getTrade(id);
    setTrade(t);
    if (t) {
      const c = await getContact(t.contact_id);
      setContactName(c?.name ?? "Unknown");
    }
  }

  async function handleAdvance(newStatus: TradeStatus) {
    if (!trade) return;
    try {
      await updateTradeStatus(trade.id, newStatus);
      loadTrade();
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  }

  async function handleCancel() {
    if (!trade) return;
    try {
      await updateTradeStatus(trade.id, "cancelled");
      loadTrade();
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  }

  if (!trade) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Trade", headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const action = NEXT_ACTION[trade.status];
  const currentIdx = STATUS_STEPS.indexOf(trade.status);
  const tradeStatusColor = statusColors[trade.status] || colors.textMuted;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Trade - ${trade.type.toUpperCase()}`, headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
      <View style={styles.content}>
        <Card level={2}>
          <View style={styles.cardHeader}>
            <View style={[styles.typeBadge, { backgroundColor: trade.type === "buy" ? colors.success + "20" : colors.primary + "20" }]}>
              <Text style={[styles.typeLabel, { color: trade.type === "buy" ? colors.success : colors.primary }]}>
                {trade.type.toUpperCase()} BTC
              </Text>
            </View>
            <View style={[styles.statusChip, { backgroundColor: tradeStatusColor + "20" }]}>
              <Text style={[styles.statusChipText, { color: tradeStatusColor }]}>
                {trade.status.replace("_", " ").toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.amount}>{trade.sats_amount.toLocaleString()} sats</Text>
          <Text style={styles.fiat}>{trade.fiat_amount} {trade.fiat_currency}</Text>
          <View style={styles.divider} />
          <Text style={styles.contact}>with {contactName}</Text>
        </Card>

        {/* Progress steps */}
        <View style={styles.steps}>
          {STATUS_STEPS.map((step, i) => {
            const isCancelled = trade.status === "cancelled";
            const done = !isCancelled && i <= currentIdx;
            const isCurrent = !isCancelled && i === currentIdx;
            const dotColor = done ? statusColors[step] || colors.primary : colors.surfaceLight;
            return (
              <View key={step} style={styles.step}>
                <Animated.View
                  entering={isCurrent ? ZoomIn.duration(animation.normal) : FadeIn.duration(animation.fast)}
                  style={[styles.dot, { backgroundColor: dotColor }, isCurrent && styles.dotCurrent]}
                />
                {i < STATUS_STEPS.length - 1 && (
                  <View style={[styles.connector, done && i < currentIdx && { backgroundColor: statusColors[step] || colors.primary }]} />
                )}
                <Text style={[styles.stepLabel, done && { color: colors.text }]}>
                  {step.replace("_", "\n")}
                </Text>
              </View>
            );
          })}
        </View>

        {trade.completed_at && (
          <Text style={styles.timestamp}>Completed: {new Date(trade.completed_at).toLocaleString()}</Text>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          {action && (
            <Button
              title={action.label}
              onPress={() => handleAdvance(action.next)}
            />
          )}
          {canTransition(trade.status, "cancelled") && (
            <Button
              title="Cancel Trade"
              variant="danger"
              onPress={handleCancel}
              style={{ marginTop: spacing.sm }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  loadingText: { color: colors.textSecondary, textAlign: "center", marginTop: 40 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md },
  typeBadge: { paddingHorizontal: spacing.sm + 2, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
  typeLabel: { ...typography.xs, fontWeight: "700" },
  statusChip: { paddingHorizontal: spacing.sm + 2, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
  statusChipText: { ...typography.xs, fontWeight: "700" },
  amount: { color: colors.text, fontSize: 28, fontWeight: "700" },
  fiat: { color: colors.textSecondary, ...typography.lg },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
  contact: { color: colors.textSecondary, ...typography.md },
  steps: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.lg, paddingHorizontal: spacing.xs },
  step: { alignItems: "center", flex: 1 },
  dot: { width: 14, height: 14, borderRadius: 7, marginBottom: spacing.xs },
  dotCurrent: { borderWidth: 2, borderColor: colors.text },
  connector: { position: "absolute", top: 6, left: "60%", right: "-40%", height: 2, backgroundColor: colors.surfaceLight },
  stepLabel: { color: colors.textMuted, ...typography.xs, textTransform: "capitalize", textAlign: "center" },
  timestamp: { color: colors.textMuted, ...typography.xs, marginTop: spacing.md, textAlign: "center" },
  actions: { marginTop: spacing.xl },
});
