import { StyleSheet } from "react-native";
import { colors, spacing, elevation } from "../../constants/theme";

export const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: spacing.lg,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: elevation[3],
  } as any,
});
