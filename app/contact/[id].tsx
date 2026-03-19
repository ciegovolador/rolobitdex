import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { ContactDetailView } from "../../src/views/contacts/ContactDetailView";
import { useContactDetail } from "../../src/controllers/useContactDetail";
import { colors, spacing } from "../../src/constants/theme";

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const controller = useContactDetail(id);

  if (!controller.contact) {
    return (
      <View style={s.container}>
        <Stack.Screen options={{ title: "Contact", headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
        <Text style={s.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}>
      <Stack.Screen options={{ title: controller.contact.name, headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
      <ContactDetailView
        controller={controller}
        contactId={id!}
        onSelectTrade={(tradeId) => router.push(`/trade/${tradeId}`)}
        onNewTrade={() => router.push(`/trade/new?contactId=${id}`)}
      />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loading: { color: colors.textSecondary, textAlign: "center", marginTop: 40 },
});
