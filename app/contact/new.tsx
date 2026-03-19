import { Stack } from "expo-router";
import { NewContactView } from "../../src/views/contacts/NewContactView";
import { useNewContact } from "../../src/controllers/useNewContact";
import { colors } from "../../src/constants/theme";

export default function NewContactScreen() {
  const { name, setName, save, loading } = useNewContact();

  return (
    <>
      <Stack.Screen options={{ title: "New Contact", headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
      <NewContactView name={name} onNameChange={setName} onSave={save} loading={loading} />
    </>
  );
}
