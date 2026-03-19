import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../components/Card";
import { SectionHeader } from "../shared/SectionHeader";
import { colors } from "../../constants/theme";
import type { Trade } from "../../models/trade";
import { styles } from "./TradeHistoryView.styles";

type TradeHistoryViewProps = {
  trades: Trade[];
  contactId: string;
  onSelectTrade: (id: string) => void;
  onNewTrade: () => void;
};

export function TradeHistoryView({
  trades,
  contactId,
  onSelectTrade,
  onNewTrade,
}: TradeHistoryViewProps) {
  return (
    <>
      <SectionHeader
        title={`Trade History (${trades.length})`}
        onAdd={onNewTrade}
        addLabel="New Trade"
      />
      {trades.slice(0, 5).map((t) => (
        <TouchableOpacity
          key={t.id}
          onPress={() => onSelectTrade(t.id)}
          accessibilityRole="button"
          accessibilityLabel={`${t.type.toUpperCase()} ${t.sats_amount.toLocaleString()} sats, ${t.fiat_amount} ${t.fiat_currency}, ${t.status}`}
          testID={`contact-trade-${t.id}`}
        >
          <Card style={styles.tradeHistory__card}>
            <View style={styles.tradeHistory__row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.tradeHistory__title}>
                  {t.type.toUpperCase()} {t.sats_amount.toLocaleString()} sats
                </Text>
                <Text style={styles.tradeHistory__sub}>
                  {t.fiat_amount} {t.fiat_currency} - {t.status}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </View>
          </Card>
        </TouchableOpacity>
      ))}
      {trades.length === 0 && (
        <Text style={styles.tradeHistory__empty}>No trades yet</Text>
      )}
    </>
  );
}
