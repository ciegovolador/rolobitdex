import { useState } from "react";
import { TextInput, View, Text, StyleSheet, TextInputProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { useTheme } from "../design";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  testID?: string;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export function Input({ label, error, style, onFocus, onBlur, testID, ...props }: InputProps) {
  const { tokens } = useTheme();
  const { colors, spacing, fontSize, borderRadius, animation } = tokens;
  const focus = useSharedValue(0);

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      focus.value,
      [0, 1],
      [error ? colors.error : colors.border, colors.primary]
    ),
  }));

  function handleFocus(e: any) {
    focus.value = withTiming(1, { duration: animation.fast });
    onFocus?.(e);
  }

  function handleBlur(e: any) {
    focus.value = withTiming(0, { duration: animation.fast });
    onBlur?.(e);
  }

  return (
    <View style={{ marginBottom: spacing.md }}>
      {label && (
        <Text style={{ color: colors.textSecondary, fontSize: fontSize.sm, marginBottom: spacing.xs }}>
          {label}
        </Text>
      )}
      <AnimatedView
        style={[
          {
            backgroundColor: colors.surface,
            borderWidth: 1.5,
            borderColor: colors.border,
            borderRadius: borderRadius.md,
          },
          borderStyle,
        ]}
      >
        <TextInput
          style={[
            {
              color: colors.text,
              paddingVertical: spacing.sm + 2,
              paddingHorizontal: spacing.md,
              fontSize: fontSize.md,
            },
            style,
          ]}
          placeholderTextColor={colors.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={label || props.placeholder}
          accessibilityHint={!label && props.placeholder ? `Enter ${props.placeholder.toLowerCase()}` : undefined}
          testID={testID}
          {...props}
        />
      </AnimatedView>
      {error && (
        <Text style={{ color: colors.error, fontSize: fontSize.sm, marginTop: spacing.xs }}>
          {error}
        </Text>
      )}
    </View>
  );
}
