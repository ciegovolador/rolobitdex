import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  newTrade: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  newTrade__sectionLabel: {
    color: colors.textSecondary,
    ...typography.xs,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
    marginLeft: spacing.xs,
  },
  newTrade__typeRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  newTrade__typeBtn: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  newTrade__typeBtn_active: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  newTrade__typeText: {
    color: colors.textSecondary,
    fontWeight: "700",
    ...typography.md,
  },
  newTrade__typeText_active: {
    color: "#fff",
  },
  newTrade__contactList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  newTrade__contactChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceLight,
  },
  newTrade__contactChip_active: {
    backgroundColor: colors.primary,
  },
  newTrade__contactText: {
    color: colors.textSecondary,
    ...typography.sm,
  },
  newTrade__contactText_active: {
    color: "#fff",
    fontWeight: "600",
  },
  newTrade__emptyText: {
    color: colors.textMuted,
    ...typography.sm,
  },
});
