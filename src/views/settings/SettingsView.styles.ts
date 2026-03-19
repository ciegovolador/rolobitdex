import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  settingsView: {
    padding: spacing.md,
    alignSelf: "center",
    width: "100%",
    maxWidth: 800,
  },
  settingsView__sectionTitle: {
    color: colors.textSecondary,
    ...typography.xs,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  settingsView__sectionTitle_spaced: {
    marginTop: spacing.lg,
  },
  settingsView__row: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsView__iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  settingsView__content: { flex: 1 },
  settingsView__label: {
    color: colors.text,
    ...typography.md,
    fontWeight: "600",
  },
  settingsView__hint: {
    color: colors.textMuted,
    ...typography.xs,
    marginTop: 2,
  },
  settingsView__version: {
    color: colors.textMuted,
    ...typography.xs,
    textAlign: "center",
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
});
