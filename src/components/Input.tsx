import { useState } from "react";
import { TextInput, View, Text, StyleSheet, TextInputProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { colors, spacing, fontSize, borderRadius, animation } from "../constants/theme";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  testID?: string;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export function Input({ label, error, style, onFocus, onBlur, testID, ...props }: InputProps) {
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
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <AnimatedView style={[styles.inputWrapper, borderStyle]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={label || props.placeholder}
          accessibilityHint={!label && props.placeholder ? `Enter ${props.placeholder.toLowerCase()}` : undefined}
          testID={testID}
          {...props}
        />
      </AnimatedView>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: { color: colors.textSecondary, fontSize: fontSize.sm, marginBottom: spacing.xs },
  inputWrapper: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
  },
  input: {
    color: colors.text,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.md,
  },
  error: { color: colors.error, fontSize: fontSize.sm, marginTop: spacing.xs },
});
