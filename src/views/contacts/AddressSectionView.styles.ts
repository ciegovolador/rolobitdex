import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  addressSection__card: { marginBottom: spacing.sm },
  addressSection__row: { flexDirection: "row", alignItems: "center" },
  addressSection__sub: { color: colors.textSecondary, ...typography.sm },
  addressSection__label: { color: colors.primary, ...typography.xs, marginTop: 2 },
  addressSection__empty: {
    color: colors.textMuted,
    ...typography.xs,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
});
