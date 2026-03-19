import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: spacing.lg, marginBottom: spacing.sm },
  sectionHeader__title: {
    color: colors.textSecondary,
    ...typography.xs,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionHeader__action: { color: colors.primary, ...typography.sm, fontWeight: "600" },
});
