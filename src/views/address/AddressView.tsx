import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { colors, spacing } from "../../constants/theme";
import { styles } from "./AddressView.styles";

type AddressViewProps = {
  address: string;
  copied: boolean;
  onCopy: () => void;
  onShare: () => void;
};

export function AddressView({ address, copied, onCopy, onShare }: AddressViewProps) {
  return (
    <View style={styles.addressView}>
      <Text style={styles.addressView__title}>My Silent Payment Address</Text>
      <Text style={styles.addressView__subtitle}>Share this address to receive Bitcoin payments</Text>

      <Card style={styles.addressView__qrCard} level={2}>
        <View style={styles.addressView__qrContainer} accessibilityLabel="QR code for your Silent Payment address" testID="address-qr-code">
          <QRCode value={address} size={200} backgroundColor="white" color="black" />
        </View>
      </Card>

      <TouchableOpacity
        onPress={onCopy}
        style={styles.addressView__addressBox}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Silent Payment address: ${address}. Tap to copy`}
        testID="address-copy-box"
      >
        <Text style={styles.addressView__addressText} numberOfLines={3} ellipsizeMode="middle">
          {address}
        </Text>
        <Ionicons
          name={copied ? "checkmark-circle" : "copy-outline"}
          size={20}
          color={copied ? colors.success : colors.primary}
        />
      </TouchableOpacity>
      {copied && <Text style={styles.addressView__copiedText}>Copied to clipboard!</Text>}

      <View style={styles.addressView__actions}>
        <Button title="Copy Address" onPress={onCopy} variant="secondary" style={{ flex: 1 }} testID="address-copy-btn" />
        <View style={{ width: spacing.sm }} />
        <Button title="Share" onPress={onShare} style={{ flex: 1 }} testID="address-share-btn" />
      </View>
    </View>
  );
}
