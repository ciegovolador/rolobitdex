import { View, FlatList } from "react-native";
import { Input } from "../../components/Input";
import { EmptyState } from "../shared/EmptyState";
import { AnimatedListItem } from "../../components/AnimatedListItem";
import { ContactRowView } from "./ContactRowView";
import { spacing } from "../../constants/theme";
import type { Contact } from "../../models/contact";
import { styles } from "./ContactListView.styles";

type ContactListViewProps = {
  contacts: Contact[];
  query: string;
  onSearch: (q: string) => void;
  onSelect: (id: string) => void;
  numColumns: number;
};

export function ContactListView({
  contacts,
  query,
  onSearch,
  onSelect,
  numColumns,
}: ContactListViewProps) {
  return (
    <>
      <View style={styles.contactList__search}>
        <Input
          placeholder="Search contacts..."
          value={query}
          onChangeText={onSearch}
          testID="contacts-search-input"
        />
      </View>
      {contacts.length === 0 ? (
        <EmptyState
          icon="people-outline"
          message={query ? "No contacts found" : "No contacts yet"}
          hint={query ? undefined : "Tap + to add your first contact"}
          testID="contacts-empty-state"
        />
      ) : (
        <FlatList
          key={numColumns}
          data={contacts}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.contactList__list}
          columnWrapperStyle={numColumns > 1 ? { gap: spacing.sm } : undefined}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          renderItem={({ item, index }) => (
            <AnimatedListItem index={index}>
              <ContactRowView
                contact={item}
                onPress={() => onSelect(item.id)}
              />
            </AnimatedListItem>
          )}
        />
      )}
    </>
  );
}
