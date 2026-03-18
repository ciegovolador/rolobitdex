import { useState, useCallback } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useFocusEffect, Stack } from "expo-router";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { colors, spacing, fontSize, borderRadius } from "../../src/constants/theme";
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

  const statusColor = (s: TradeStatus) => {
    if (s === "completed") return colors.success;
    if (s === "cancelled") return colors.error;
    if (s === "pending") return colors.textMuted;
    return colors.warning;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Trade - ${trade.type.toUpperCase()}`, headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
      <View style={{ padding: spacing.md }}>
        <Card>
          <Text style={styles.typeLabel}>{trade.type.toUpperCase()} BTC</Text>
          <Text style={styles.amount}>{trade.sats_amount.toLocaleString()} sats</Text>
          <Text style={styles.fiat}>{trade.fiat_amount} {trade.fiat_currency}</Text>
          <Text style={styles.contact}>with {contactName}</Text>
          <Text style={[styles.statusBadge, { color: statusColor(trade.status) }]}>
            {trade.status.replace("_", " ").toUpperCase()}
          </Text>
        </Card>

        {/* Progress steps */}
        <View style={styles.steps}>
          {STATUS_STEPS.map((step, i) => {
            const done = trade.status === "cancelled" ? false : i <= currentIdx;
            return (
              <View key={step} style={styles.step}>
                <View style={[styles.dot, done && styles.dotDone]} />
                <Text style={[styles.stepLabel, done && styles.stepLabelDone]}>
                  {step.replace("_", " ")}
                </Text>
              </View>
            );
          })}
        </View>

        {trade.completed_at && (
          <Text style={styles.timestamp}>Completed: {new Date(trade.completed_at).toLocaleString()}</Text>
        )}

        {/* Actions */}
        {action && (
          <Button
            title={action.label}
            onPress={() => handleAdvance(action.next)}
            style={{ marginTop: spacing.lg }}
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingText: { color: colors.textSecondary, textAlign: "center", marginTop: 40 },
  typeLabel: { color: colors.primary, fontSize: fontSize.md, fontWeight: "700" },
  amount: { color: colors.text, fontSize: fontSize.xxl, fontWeight: "700", marginTop: spacing.xs },
  fiat: { color: colors.textSecondary, fontSize: fontSize.lg },
  contact: { color: colors.textSecondary, fontSize: fontSize.md, marginTop: spacing.xs },
  statusBadge: { fontSize: fontSize.md, fontWeight: "700", marginTop: spacing.md },
  steps: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.lg },
  step: { alignItems: "center", flex: 1 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.surfaceLight, marginBottom: spacing.xs },
  dotDone: { backgroundColor: colors.primary },
  stepLabel: { color: colors.textMuted, fontSize: 10, textTransform: "capitalize", textAlign: "center" },
  stepLabelDone: { color: colors.text },
  timestamp: { color: colors.textMuted, fontSize: fontSize.sm, marginTop: spacing.md, textAlign: "center" },
});
