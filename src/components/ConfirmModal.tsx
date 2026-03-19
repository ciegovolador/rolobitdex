import { Modal, View, Text, StyleSheet } from "react-native";
import { Button } from "./Button";
import { colors, spacing, fontSize, borderRadius } from "../constants/theme";

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
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View
          style={styles.modal}
          accessibilityRole={variant === "danger" ? "alert" : undefined}
          accessibilityLabel={`${title}. ${message}`}
          testID={testID}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <Button title="Cancel" variant="secondary" onPress={onCancel} style={{ flex: 1 }} />
            <View style={{ width: spacing.sm }} />
            <Button title={confirmLabel} variant={variant} onPress={onConfirm} style={{ flex: 1 }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  modal: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    width: "100%",
    maxWidth: 400,
  },
  title: { color: colors.text, fontSize: fontSize.xl, fontWeight: "700", marginBottom: spacing.sm },
  message: { color: colors.textSecondary, fontSize: fontSize.md, marginBottom: spacing.lg },
  actions: { flexDirection: "row" },
});
