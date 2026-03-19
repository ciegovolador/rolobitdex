import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./FAB.styles";

type FABProps = {
  onPress: () => void;
  label: string;
  testID?: string;
};

export function FAB({ onPress, label, testID }: FABProps) {
  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={label}
      testID={testID}
    >
      <Ionicons name="add" size={28} color="#fff" />
    </TouchableOpacity>
  );
}
