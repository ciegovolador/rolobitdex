import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./SectionHeader.styles";

type SectionHeaderProps = {
  title: string;
  onAdd: () => void;
  addLabel?: string;
};

export function SectionHeader({ title, onAdd, addLabel = "+ Add" }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeader__title}>{title}</Text>
      <TouchableOpacity onPress={onAdd} accessibilityRole="button" accessibilityLabel={`${addLabel} ${title}`}>
        <Text style={styles.sectionHeader__action}>{addLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
