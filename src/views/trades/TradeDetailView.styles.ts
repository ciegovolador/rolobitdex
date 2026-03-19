import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  tradeDetail: {
    padding: spacing.md,
  },
  tradeDetail__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  tradeDetail__typeBadge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  tradeDetail__typeLabel: {
    ...typography.xs,
    fontWeight: "700",
  },
  tradeDetail__statusChip: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  tradeDetail__statusText: {
    ...typography.xs,
    fontWeight: "700",
  },
  tradeDetail__amount: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "700",
  },
  tradeDetail__fiat: {
    color: colors.textSecondary,
    ...typography.lg,
  },
  tradeDetail__divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  tradeDetail__contact: {
    color: colors.textSecondary,
    ...typography.md,
  },
  tradeDetail__timestamp: {
    color: colors.textMuted,
    ...typography.xs,
    marginTop: spacing.md,
    textAlign: "center",
  },
  tradeDetail__actions: {
    marginTop: spacing.xl,
  },
});
