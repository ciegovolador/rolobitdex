import { StyleSheet } from "react-native";
import { colors, spacing, fontSize, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  contactHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  contactHeader__avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  contactHeader__avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: fontSize.xl,
  },
  contactHeader__name: {
    color: colors.text,
    ...typography.xl,
    fontSize: fontSize.xxl,
  },
  contactHeader__hint: {
    color: colors.textMuted,
    ...typography.xs,
    marginTop: 2,
  },
});
