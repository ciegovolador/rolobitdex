import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  aliasSection__card: { marginBottom: spacing.sm },
  aliasSection__row: { flexDirection: "row", alignItems: "center" },
  aliasSection__title: { color: colors.text, ...typography.md, fontWeight: "600" },
  aliasSection__sub: { color: colors.textSecondary, ...typography.sm },
  aliasSection__label: { color: colors.primary, ...typography.xs, marginTop: 2 },
  aliasSection__empty: {
    color: colors.textMuted,
    ...typography.xs,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
});
