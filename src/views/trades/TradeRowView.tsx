import { View, Text, TouchableOpacity } from "react-native";
import { colors, statusColors } from "../../constants/theme";
import type { TradeWithContact } from "../../models/trade";
import { styles } from "./TradeRowView.styles";

type TradeRowViewProps = {
  trade: TradeWithContact;
  onPress: () => void;
};

export function TradeRowView({ trade, onPress }: TradeRowViewProps) {
  const dotColor = statusColors[trade.status] || colors.textMuted;

  return (
    <TouchableOpacity
      style={styles.tradeRow}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${trade.type.toUpperCase()} ${trade.sats_amount.toLocaleString()} sats, ${trade.fiat_amount} ${trade.fiat_currency} with ${trade.contact_name}, ${trade.status.replace("_", " ")}`}
      testID={`trades-row-${trade.id}`}
    >
      <View style={[styles.tradeRow__dot, { backgroundColor: dotColor }]} />
      <View style={styles.tradeRow__info}>
        <Text style={styles.tradeRow__title}>
          {trade.type.toUpperCase()} {trade.sats_amount.toLocaleString()} sats
        </Text>
        <Text style={styles.tradeRow__sub}>
          {trade.fiat_amount} {trade.fiat_currency} with {trade.contact_name}
        </Text>
      </View>
      <View style={[styles.tradeRow__badge, { backgroundColor: dotColor + "20" }]}>
        <Text style={[styles.tradeRow__badgeText, { color: dotColor }]}>
          {trade.status.replace("_", " ")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
