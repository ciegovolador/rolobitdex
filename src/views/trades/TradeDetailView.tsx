import { View, Text } from "react-native";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { TradeProgressView } from "./TradeProgressView";
import { colors, spacing, statusColors } from "../../constants/theme";
import type { Trade, TradeStatus } from "../../models/trade";
import { styles } from "./TradeDetailView.styles";

type TradeDetailViewProps = {
  trade: Trade;
  contactName: string;
  action?: { label: string; next: TradeStatus };
  currentIdx: number;
  canCancel: boolean;
  onAdvance: (status: TradeStatus) => void;
  onCancel: () => void;
};

export function TradeDetailView({
  trade,
  contactName,
  action,
  currentIdx,
  canCancel,
  onAdvance,
  onCancel,
}: TradeDetailViewProps) {
  const tradeStatusColor = statusColors[trade.status] || colors.textMuted;

  return (
    <View style={styles.tradeDetail}>
      <Card level={2}>
        <View style={styles.tradeDetail__header}>
          <View style={[styles.tradeDetail__typeBadge, { backgroundColor: trade.type === "buy" ? colors.success + "20" : colors.primary + "20" }]}>
            <Text style={[styles.tradeDetail__typeLabel, { color: trade.type === "buy" ? colors.success : colors.primary }]}>
              {trade.type.toUpperCase()} BTC
            </Text>
          </View>
          <View
            style={[styles.tradeDetail__statusChip, { backgroundColor: tradeStatusColor + "20" }]}
            accessibilityLabel={`Status: ${trade.status.replace("_", " ")}`}
            testID="trade-detail-status-badge"
          >
            <Text style={[styles.tradeDetail__statusText, { color: tradeStatusColor }]}>
              {trade.status.replace("_", " ").toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={styles.tradeDetail__amount}>{trade.sats_amount.toLocaleString()} sats</Text>
        <Text style={styles.tradeDetail__fiat}>{trade.fiat_amount} {trade.fiat_currency}</Text>
        <View style={styles.tradeDetail__divider} />
        <Text style={styles.tradeDetail__contact}>with {contactName}</Text>
      </Card>

      <TradeProgressView status={trade.status} currentIdx={currentIdx} />

      {trade.completed_at && (
        <Text style={styles.tradeDetail__timestamp}>
          Completed: {new Date(trade.completed_at).toLocaleString()}
        </Text>
      )}

      <View style={styles.tradeDetail__actions}>
        {action && (
          <Button
            title={action.label}
            onPress={() => onAdvance(action.next)}
            testID="trade-detail-advance-btn"
          />
        )}
        {canCancel && (
          <Button
            title="Cancel Trade"
            variant="danger"
            onPress={onCancel}
            style={{ marginTop: spacing.sm }}
            testID="trade-detail-cancel-btn"
          />
        )}
      </View>
    </View>
  );
}
