import { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Share, Platform } from "react-native";
import { useFocusEffect } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { colors, spacing, fontSize, borderRadius, typography } from "../../src/constants/theme";
import { getOrCreateAddress } from "../../src/lib/silentPayments";

export default function AddressScreen() {
  const [address, setAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getOrCreateAddress().then(setAddress);
    }, [])
  );

  async function handleCopy() {
    if (!address) return;
    await Clipboard.setStringAsync(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    if (!address) return;
    await Share.share({ message: address });
  }

  if (!address) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Generating address...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Silent Payment Address</Text>
        <Text style={styles.subtitle}>Share this address to receive Bitcoin payments</Text>

        <Card style={styles.qrCard} level={2}>
          <View style={styles.qrContainer} accessibilityLabel="QR code for your Silent Payment address" testID="address-qr-code">
            <QRCode value={address} size={200} backgroundColor="white" color="black" />
          </View>
        </Card>

        <TouchableOpacity onPress={handleCopy} style={styles.addressBox} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel={`Silent Payment address: ${address}. Tap to copy`} testID="address-copy-box">
          <Text style={styles.address} numberOfLines={3} ellipsizeMode="middle">
            {address}
          </Text>
          <Ionicons
            name={copied ? "checkmark-circle" : "copy-outline"}
            size={20}
            color={copied ? colors.success : colors.primary}
          />
        </TouchableOpacity>
        {copied && <Text style={styles.copiedText}>Copied to clipboard!</Text>}

        <View style={styles.actions}>
          <Button title="Copy Address" onPress={handleCopy} variant="secondary" style={{ flex: 1 }} testID="address-copy-btn" />
          <View style={{ width: spacing.sm }} />
          <Button title="Share" onPress={handleShare} style={{ flex: 1 }} testID="address-share-btn" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.lg, alignItems: "center", justifyContent: "center" },
  loadingText: { color: colors.textSecondary, textAlign: "center", marginTop: 40 },
  title: { color: colors.text, ...typography.xl, marginBottom: spacing.xs },
  subtitle: { color: colors.textMuted, ...typography.sm, marginBottom: spacing.lg },
  qrCard: { alignItems: "center", padding: spacing.lg, marginBottom: spacing.lg },
  qrContainer: { padding: spacing.md, backgroundColor: "white", borderRadius: borderRadius.md },
  addressBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
    maxWidth: 400,
  },
  address: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginRight: spacing.sm,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  copiedText: { color: colors.success, ...typography.sm, marginTop: spacing.xs },
  actions: { flexDirection: "row", marginTop: spacing.lg, width: "100%", maxWidth: 400 },
});
