import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { router, Stack } from "expo-router";
import { Input } from "../../src/components/Input";
import { Button } from "../../src/components/Button";
import { colors, spacing } from "../../src/constants/theme";
import { createContact } from "../../src/db/contacts";

export default function NewContactScreen() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert("Error", "Name is required");
      return;
    }
    setLoading(true);
    try {
      const id = await createContact(trimmed);
      router.replace(`/contact/${id}`);
    } catch (e) {
      Alert.alert("Error", "Failed to create contact");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "New Contact", headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
      <Input label="Name" placeholder="Contact name" value={name} onChangeText={setName} autoFocus />
      <Button title="Save" onPress={handleSave} loading={loading} disabled={!name.trim()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.md },
});
