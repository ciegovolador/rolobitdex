import { useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { AnimatedScreen } from "../../src/components/AnimatedScreen";
import { ContactListView } from "../../src/views/contacts/ContactListView";
import { FAB } from "../../src/views/shared/FAB";
import { useContacts } from "../../src/controllers/useContacts";
import { breakpoints } from "../../src/constants/theme";

export default function ContactsScreen() {
  const { width } = useWindowDimensions();
  const numColumns = width >= breakpoints.tablet ? 2 : 1;
  const { contacts, query, search } = useContacts();

  return (
    <AnimatedScreen>
      <ContactListView
        contacts={contacts}
        query={query}
        onSearch={search}
        onSelect={(id) => router.push(`/contact/${id}`)}
        numColumns={numColumns}
      />
      <FAB
        onPress={() => router.push("/contact/new")}
        label="Add new contact"
        testID="contacts-fab"
      />
    </AnimatedScreen>
  );
}
