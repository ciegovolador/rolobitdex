import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme";
import { styles } from "./EmptyState.styles";

type EmptyStateProps = {
  icon: keyof typeof Ionicons.glyphMap;
  message: string;
  hint?: string;
  testID?: string;
};

export function EmptyState({ icon, message, hint, testID }: EmptyStateProps) {
  return (
    <View style={styles.emptyState} accessibilityLabel={hint ? `${message}. ${hint}` : message} testID={testID}>
      <Ionicons name={icon} size={56} color={colors.textMuted} />
      <Text style={styles.emptyState__text}>{message}</Text>
      {hint && <Text style={styles.emptyState__hint}>{hint}</Text>}
    </View>
  );
}
