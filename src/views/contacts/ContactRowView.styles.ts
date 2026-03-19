import { StyleSheet } from "react-native";
import { colors, spacing, fontSize, borderRadius, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  contactRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactRow__avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  contactRow__avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: fontSize.md,
  },
  contactRow__info: { flex: 1 },
  contactRow__name: { color: colors.text, ...typography.lg },
  contactRow__sub: { color: colors.textMuted, ...typography.xs, marginTop: 2 },
});
