import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router, Stack } from "expo-router";
import { Button } from "../src/components/Button";
import { colors, spacing, fontSize } from "../src/constants/theme";
import { isValidSilentPaymentAddress } from "../src/lib/silentPayments";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Scan QR", headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
        <View style={styles.center}>
          <Text style={styles.text}>Camera permission is required to scan QR codes.</Text>
          <Button title="Grant Permission" onPress={requestPermission} style={{ marginTop: spacing.md }} />
        </View>
      </View>
    );
  }

  function handleBarCodeScanned({ data }: { data: string }) {
    if (scanned) return;
    setScanned(true);

    if (isValidSilentPaymentAddress(data)) {
      // Navigate back with the scanned address
      router.back();
      // The calling screen should handle the result via params or state
      Alert.alert("Address Scanned", `Found: ${data.slice(0, 20)}...`, [
        { text: "OK" },
      ]);
    } else {
      Alert.alert("Invalid QR", "This QR code does not contain a valid silent payment address.", [
        { text: "Try Again", onPress: () => setScanned(false) },
        { text: "Cancel", onPress: () => router.back() },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Scan QR Code", headerStyle: { backgroundColor: colors.surface }, headerTintColor: "#fff" }} />
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <View style={styles.overlay}>
        <View style={styles.frame} />
        <Text style={styles.hint}>Point camera at a silent payment QR code</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.lg },
  text: { color: colors.textSecondary, fontSize: fontSize.md, textAlign: "center" },
  camera: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center" },
  frame: { width: 250, height: 250, borderWidth: 2, borderColor: colors.primary, borderRadius: 12 },
  hint: { color: "#fff", fontSize: fontSize.md, marginTop: spacing.md, textShadow: "1px 1px 3px #000" },
});
