import { ScrollView, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { NewTradeView } from "../../src/views/trades/NewTradeView";
import { useNewTrade } from "../../src/controllers/useNewTrade";
import { colors } from "../../src/constants/theme";

export default function NewTradeScreen() {
  const { contactId } = useLocalSearchParams<{ contactId?: string }>();
  const c = useNewTrade(contactId);

  return (
    <ScrollView style={s.container}>
      <Stack.Screen options={{ title: "New Trade", headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
      <NewTradeView
        contacts={c.contacts}
        selectedContact={c.selectedContact}
        onSelectContact={c.setSelectedContact}
        type={c.type}
        onTypeChange={c.setType}
        sats={c.sats}
        onSatsChange={c.setSats}
        fiatCurrency={c.fiatCurrency}
        onFiatCurrencyChange={c.setFiatCurrency}
        fiatAmount={c.fiatAmount}
        onFiatAmountChange={c.setFiatAmount}
        onCreate={c.create}
        loading={c.loading}
      />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});
