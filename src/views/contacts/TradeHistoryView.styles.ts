import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  tradeHistory__card: { marginBottom: spacing.sm },
  tradeHistory__row: { flexDirection: "row", alignItems: "center" },
  tradeHistory__title: { color: colors.text, ...typography.md, fontWeight: "600" },
  tradeHistory__sub: { color: colors.textSecondary, ...typography.sm },
  tradeHistory__empty: {
    color: colors.textMuted,
    ...typography.xs,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
});
