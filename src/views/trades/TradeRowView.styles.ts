import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  tradeRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tradeRow__dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.md,
  },
  tradeRow__info: { flex: 1 },
  tradeRow__title: { color: colors.text, ...typography.md, fontWeight: "600" },
  tradeRow__sub: { color: colors.textSecondary, ...typography.xs, marginTop: 2 },
  tradeRow__badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  tradeRow__badgeText: {
    ...typography.xs,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
