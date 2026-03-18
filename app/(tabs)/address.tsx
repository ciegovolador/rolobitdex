import { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Share, Platform } from "react-native";
import { useFocusEffect } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { colors, spacing, fontSize } from "../../src/constants/theme";
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

        <Card style={styles.qrCard}>
          <View style={styles.qrContainer}>
            <QRCode value={address} size={200} backgroundColor="white" color="black" />
          </View>
        </Card>

        <TouchableOpacity onPress={handleCopy} style={styles.addressBox}>
          <Text style={styles.address} numberOfLines={3} ellipsizeMode="middle">
            {address}
          </Text>
          <Ionicons
            name={copied ? "checkmark-circle" : "copy-outline"}
            size={20}
            color={copied ? colors.success : colors.primary}
          />
        </TouchableOpacity>
        {copied && <Text style={styles.copiedText}>Copied!</Text>}

        <View style={styles.actions}>
          <Button title="Copy" onPress={handleCopy} variant="secondary" style={{ flex: 1 }} />
          <View style={{ width: spacing.sm }} />
          <Button title="Share" onPress={handleShare} style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.md, alignItems: "center", justifyContent: "center" },
  loadingText: { color: colors.textSecondary, textAlign: "center", marginTop: 40 },
  title: { color: colors.text, fontSize: fontSize.xl, fontWeight: "700", marginBottom: spacing.lg },
  qrCard: { alignItems: "center", padding: spacing.lg, marginBottom: spacing.lg },
  qrContainer: { padding: spacing.md, backgroundColor: "white", borderRadius: 8 },
  addressBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    width: "100%",
    maxWidth: 400,
  },
  address: { flex: 1, color: colors.textSecondary, fontSize: fontSize.sm, marginRight: spacing.sm, fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace" },
  copiedText: { color: colors.success, fontSize: fontSize.sm, marginTop: spacing.xs },
  actions: { flexDirection: "row", marginTop: spacing.lg, width: "100%", maxWidth: 400 },
});
