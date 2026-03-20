import { Modal as RNModal, View, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { useTheme } from "../design";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  style?: ViewStyle;
  transparent?: boolean;
  animationType?: "none" | "slide" | "fade";
  testID?: string;
};

/**
 * Modal component wrapper for consistent modal styling and behavior
 * Wraps React Native Modal with theme-aware styling
 */
export function Modal({
  visible,
  onClose,
  children,
  style,
  transparent = true,
  animationType = "fade",
  testID,
}: ModalProps) {
  const { tokens } = useTheme();
  const { spacing, borderRadius, colors } = tokens;

  return (
    <RNModal visible={visible} transparent={transparent} animationType={animationType} testID={testID}>
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
          style={[
            {
              backgroundColor: colors.surface,
              borderRadius: borderRadius.lg,
              maxWidth: 500,
              width: "100%",
            },
            style,
          ]}
        >
          {children}
        </View>
      </View>
    </RNModal>
  );
}
