import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { spacing } from "../../constants/theme";
import { styles } from "./ContactHeaderView.styles";

type ContactHeaderViewProps = {
  initials: string;
  name: string;
  editingName: boolean;
  nameValue: string;
  onNameChange: (v: string) => void;
  onStartEdit: () => void;
  onSaveName: () => void;
  onCancelEdit: () => void;
};

export function ContactHeaderView({
  initials,
  name,
  editingName,
  nameValue,
  onNameChange,
  onStartEdit,
  onSaveName,
  onCancelEdit,
}: ContactHeaderViewProps) {
  return (
    <View style={styles.contactHeader}>
      <View style={styles.contactHeader__avatar}>
        <Text style={styles.contactHeader__avatarText}>{initials}</Text>
      </View>
      {editingName ? (
        <View style={{ flex: 1 }}>
          <Input value={nameValue} onChangeText={onNameChange} autoFocus />
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Button title="Save" onPress={onSaveName} style={{ flex: 1 }} />
            <Button title="Cancel" variant="secondary" onPress={onCancelEdit} style={{ flex: 1 }} />
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={onStartEdit}
          accessibilityRole="button"
          accessibilityLabel={`${name}, tap to edit name`}
          testID="contact-detail-name"
        >
          <Text style={styles.contactHeader__name}>{name}</Text>
          <Text style={styles.contactHeader__hint}>Tap to edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
