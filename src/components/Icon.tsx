import { View, ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../design";

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
  testID?: string;
};

/**
 * Icon component wrapper for consistent icon usage
 * Uses Ionicons by default, can be extended for other icon libraries
 */
export function Icon({ name, size = 24, color, style, testID }: IconProps) {
  const { tokens } = useTheme();
  const iconColor = color || tokens.colors.text;

  return (
    <View style={style} testID={testID}>
      <Ionicons name={name as any} size={size} color={iconColor} />
    </View>
  );
}
