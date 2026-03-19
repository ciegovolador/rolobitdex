import { StyleSheet, Platform } from "react-native";
import { colors, spacing, fontSize, borderRadius, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  addressView: {
    flex: 1,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  addressView__title: {
    color: colors.text,
    ...typography.xl,
    marginBottom: spacing.xs,
  },
  addressView__subtitle: {
    color: colors.textMuted,
    ...typography.sm,
    marginBottom: spacing.lg,
  },
  addressView__qrCard: {
    alignItems: "center",
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  addressView__qrContainer: {
    padding: spacing.md,
    backgroundColor: "white",
    borderRadius: borderRadius.md,
  },
  addressView__addressBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
    maxWidth: 400,
  },
  addressView__addressText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginRight: spacing.sm,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  addressView__copiedText: {
    color: colors.success,
    ...typography.sm,
    marginTop: spacing.xs,
  },
  addressView__actions: {
    flexDirection: "row",
    marginTop: spacing.lg,
    width: "100%",
    maxWidth: 400,
  },
});
