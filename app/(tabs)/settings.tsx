import { useState, useCallback } from "react";
import { View, Text, Switch, StyleSheet, Alert, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { Input } from "../../src/components/Input";
import { colors, spacing, fontSize, typography, borderRadius } from "../../src/constants/theme";
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
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricAvailable(compatible && enrolled);
      const saved = await SecureStore.getItemAsync(BIOMETRIC_KEY);
      setBiometricEnabled(saved === "true");
    } catch {
      // SecureStore / LocalAuthentication not available on web
      setBiometricAvailable(false);
    }
  }

  async function toggleBiometric(value: boolean) {
    if (value && !biometricAvailable) {
      Alert.alert("Not Available", "Biometric authentication is not available on this device.");
      return;
    }
    try {
      if (value) {
        const result = await LocalAuthentication.authenticateAsync({ promptMessage: "Enable biometric lock" });
        if (!result.success) return;
      }
      await SecureStore.setItemAsync(BIOMETRIC_KEY, value ? "true" : "false");
      setBiometricEnabled(value);
    } catch {
      Alert.alert("Not Available", "Biometric authentication is not supported on this platform.");
    }
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Security</Text>
        <Card>
          <View style={styles.settingRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="finger-print" size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
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
              accessibilityRole="switch"
              accessibilityState={{ checked: biometricEnabled, disabled: !biometricAvailable }}
              accessibilityLabel="Biometric Lock"
              testID="settings-biometric-switch"
            />
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Data</Text>
        <Card>
          <View style={styles.settingRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="cloud-download-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Encrypted Backup</Text>
              <Text style={styles.settingHint}>Export all data with passphrase encryption</Text>
            </View>
          </View>
          <View style={{ marginTop: spacing.md }}>
            <Button
              title={showExport ? "Cancel" : "Export Backup"}
              onPress={() => setShowExport(!showExport)}
              variant="secondary"
              testID="settings-export-btn"
            />
          </View>
          {showExport && (
            <View style={{ marginTop: spacing.md }}>
              <Input
                label="Passphrase"
                placeholder="Enter a strong passphrase"
                value={passphrase}
                onChangeText={setPassphrase}
                secureTextEntry
                testID="settings-passphrase-input"
              />
              <Button title="Export" onPress={handleExport} loading={exporting} disabled={!passphrase.trim()} testID="settings-export-confirm-btn" />
            </View>
          )}
        </Card>

        <Text style={styles.version}>Rolobitdex v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: spacing.md, alignSelf: "center", width: "100%", maxWidth: 800 },
  sectionTitle: {
    color: colors.textSecondary,
    ...typography.xs,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  settingRow: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  settingContent: { flex: 1 },
  settingLabel: { color: colors.text, ...typography.md, fontWeight: "600" },
  settingHint: { color: colors.textMuted, ...typography.xs, marginTop: 2 },
  version: { color: colors.textMuted, ...typography.xs, textAlign: "center", marginTop: spacing.xl, marginBottom: spacing.lg },
});
