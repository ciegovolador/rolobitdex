import { useState, useCallback } from "react";
import { View, Text, Switch, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { Input } from "../../src/components/Input";
import { colors, spacing, fontSize } from "../../src/constants/theme";
import { exportEncryptedBackup } from "../../src/lib/backup";

const BIOMETRIC_KEY = "biometric_enabled";

export default function SettingsScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [exporting, setExporting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      checkBiometric();
    }, [])
  );

  async function checkBiometric() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setBiometricAvailable(compatible && enrolled);
    const saved = await SecureStore.getItemAsync(BIOMETRIC_KEY);
    setBiometricEnabled(saved === "true");
  }

  async function toggleBiometric(value: boolean) {
    if (value && !biometricAvailable) {
      Alert.alert("Not Available", "Biometric authentication is not available on this device.");
      return;
    }
    if (value) {
      const result = await LocalAuthentication.authenticateAsync({ promptMessage: "Enable biometric lock" });
      if (!result.success) return;
    }
    await SecureStore.setItemAsync(BIOMETRIC_KEY, value ? "true" : "false");
    setBiometricEnabled(value);
  }

  async function handleExport() {
    if (!passphrase.trim()) {
      Alert.alert("Error", "Passphrase is required");
      return;
    }
    setExporting(true);
    try {
      await exportEncryptedBackup(passphrase.trim());
      setShowExport(false);
      setPassphrase("");
      Alert.alert("Success", "Backup exported");
    } catch (e) {
      Alert.alert("Error", "Failed to export backup");
    } finally {
      setExporting(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ padding: spacing.md }}>
        <Text style={styles.sectionTitle}>Security</Text>
        <Card>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Biometric Lock</Text>
              <Text style={styles.settingHint}>
                {biometricAvailable ? "Require biometric to open app" : "Not available on this device"}
              </Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={toggleBiometric}
              disabled={!biometricAvailable}
              trackColor={{ true: colors.primary, false: colors.surfaceLight }}
              thumbColor="#fff"
            />
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Backup</Text>
        <Card>
          <Button title="Export Encrypted Backup" onPress={() => setShowExport(!showExport)} variant="secondary" />
          {showExport && (
            <View style={{ marginTop: spacing.md }}>
              <Input
                label="Passphrase"
                placeholder="Enter a strong passphrase"
                value={passphrase}
                onChangeText={setPassphrase}
                secureTextEntry
              />
              <Button title="Export" onPress={handleExport} loading={exporting} disabled={!passphrase.trim()} />
            </View>
          )}
        </Card>

        <Text style={styles.version}>Rolobitdex v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  sectionTitle: { color: colors.text, fontSize: fontSize.lg, fontWeight: "700", marginBottom: spacing.sm },
  settingRow: { flexDirection: "row", alignItems: "center" },
  settingLabel: { color: colors.text, fontSize: fontSize.md, fontWeight: "600" },
  settingHint: { color: colors.textMuted, fontSize: fontSize.sm },
  version: { color: colors.textMuted, fontSize: fontSize.sm, textAlign: "center", marginTop: spacing.xl },
});
