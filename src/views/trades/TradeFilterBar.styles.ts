import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  tradeFilter: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: spacing.sm,
    gap: spacing.xs,
  },
  tradeFilter__chip: {
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tradeFilter__text: {
    color: colors.textSecondary,
    ...typography.xs,
    textTransform: "capitalize",
  },
  tradeFilter__text_active: {
    color: "#fff",
    fontWeight: "600",
  },
});
