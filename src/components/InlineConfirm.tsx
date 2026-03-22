import { useRef, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "./Button";
import { useTheme } from "../design";

type InlineConfirmProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "primary" | "danger";
  testID?: string;
  triggerRef?: React.RefObject<any>;
};

export function InlineConfirm({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  variant = "primary",
  testID,
  triggerRef,
}: InlineConfirmProps) {
  const { tokens } = useTheme();
  const { colors, spacing, borderRadius } = tokens;
  const cancelRef = useRef<View>(null);

  const borderColor = variant === "danger" ? colors.error : colors.primary;

  useEffect(() => {
    if (visible && cancelRef.current) {
      // Auto-focus Cancel button for keyboard/switch control users
      (cancelRef.current as any).focus?.();
    }
  }, [visible]);

  function handleCancel() {
    onCancel();
    triggerRef?.current?.focus?.();
  }

  function handleConfirm() {
    onConfirm();
    triggerRef?.current?.focus?.();
  }

  if (!visible) return null;

  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      accessibilityLabel={`${title}. ${message}`}
      testID={testID}
      style={{
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        borderWidth: 2,
        borderColor,
        padding: spacing.lg,
        marginTop: spacing.md,
      }}
    >
      <Text
        accessibilityRole="header"
        style={{
          color: colors.text,
          fontSize: tokens.fontSize.xl,
          fontWeight: "700",
          marginBottom: spacing.sm,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: tokens.fontSize.md,
          marginBottom: spacing.lg,
        }}
      >
        {message}
      </Text>
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <View ref={cancelRef} style={{ flex: 1 }}>
          <Button
            title="Cancel"
            variant="secondary"
            onPress={handleCancel}
            style={{ minHeight: 44, minWidth: 44 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title={confirmLabel}
            variant={variant}
            onPress={handleConfirm}
            style={{ minHeight: 44, minWidth: 44 }}
          />
        </View>
      </View>
    </View>
  );
}
