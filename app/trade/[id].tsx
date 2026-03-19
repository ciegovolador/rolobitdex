import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { TradeDetailView } from "../../src/views/trades/TradeDetailView";
import { useTradeDetail } from "../../src/controllers/useTradeDetail";
import { colors } from "../../src/constants/theme";

export default function TradeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trade, contactName, action, currentIdx, canCancel, advance, cancel } = useTradeDetail(id);

  if (!trade) {
    return (
      <View style={s.container}>
        <Stack.Screen options={{ title: "Trade", headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
        <Text style={s.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: `Trade - ${trade.type.toUpperCase()}`, headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
      <TradeDetailView
        trade={trade}
        contactName={contactName}
        action={action}
        currentIdx={currentIdx}
        canCancel={canCancel}
        onAdvance={advance}
        onCancel={cancel}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loading: { color: colors.textSecondary, textAlign: "center", marginTop: 40 },
});
