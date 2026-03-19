import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme";
import { getContactInitials } from "../../models/contact";
import type { Contact } from "../../models/contact";
import { styles } from "./ContactRowView.styles";

type ContactRowViewProps = {
  contact: Contact;
  onPress: () => void;
};

export function ContactRowView({ contact, onPress }: ContactRowViewProps) {
  const initials = getContactInitials(contact.name);

  return (
    <TouchableOpacity
      style={styles.contactRow}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${contact.name}, tap to view details`}
      testID={`contacts-row-${contact.id}`}
    >
      <View style={styles.contactRow__avatar}>
        <Text style={styles.contactRow__avatarText}>{initials}</Text>
      </View>
      <View style={styles.contactRow__info}>
        <Text style={styles.contactRow__name}>{contact.name}</Text>
        <Text style={styles.contactRow__sub}>Tap to view details</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </TouchableOpacity>
  );
}
