import { Modal, View, Text } from "react-native";
import { Button } from "./Button";
import { useTheme } from "../design";

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "primary" | "danger";
  testID?: string;
};

export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  variant = "primary",
  testID,
}: ConfirmModalProps) {
  const { tokens } = useTheme();
  const { colors, spacing, fontSize, borderRadius } = tokens;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "center",
          alignItems: "center",
          padding: spacing.lg,
        }}
      >
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            width: "100%",
            maxWidth: 400,
          }}
          accessibilityRole={variant === "danger" ? "alert" : undefined}
          accessibilityLabel={`${title}. ${message}`}
          testID={testID}
        >
          <Text style={{ color: colors.text, fontSize: fontSize.xl, fontWeight: "700", marginBottom: spacing.sm }}>
            {title}
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: fontSize.md, marginBottom: spacing.lg }}>
            {message}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Button title="Cancel" variant="secondary" onPress={onCancel} style={{ flex: 1 }} />
            <View style={{ width: spacing.sm }} />
            <Button title={confirmLabel} variant={variant} onPress={onConfirm} style={{ flex: 1 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
