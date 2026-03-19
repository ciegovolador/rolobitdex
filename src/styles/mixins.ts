import { ViewStyle } from "react-native";
import { colors, spacing, borderRadius } from "../constants/theme";

export const rowLayout = (gap = spacing.md): ViewStyle => ({
  flexDirection: "row",
  alignItems: "center",
  gap,
});

export const cardBase = (): ViewStyle => ({
  backgroundColor: colors.surface,
  borderRadius: borderRadius.lg,
  padding: spacing.md,
  borderWidth: 1,
  borderColor: colors.border,
});

export const formGroup = (): ViewStyle => ({
  marginBottom: spacing.md,
});
