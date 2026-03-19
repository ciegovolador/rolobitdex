import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../constants/theme";

export const styles = StyleSheet.create({
  tradeProgress: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  tradeProgress__step: {
    alignItems: "center",
    flex: 1,
  },
  tradeProgress__dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginBottom: spacing.xs,
  },
  tradeProgress__dot_current: {
    borderWidth: 2,
    borderColor: colors.text,
  },
  tradeProgress__connector: {
    position: "absolute",
    top: 6,
    left: "60%",
    right: "-40%",
    height: 2,
    backgroundColor: colors.surfaceLight,
  },
  tradeProgress__label: {
    color: colors.textMuted,
    ...typography.xs,
    textTransform: "capitalize",
    textAlign: "center",
  },
  tradeProgress__label_done: {
    color: colors.text,
  },
});
