import { View, Text, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { colors, spacing } from "../../constants/theme";
import { styles } from "./SettingsView.styles";

type SettingsViewProps = {
  biometricEnabled: boolean;
  biometricAvailable: boolean;
  onToggleBiometric: (value: boolean) => void;
  showExport: boolean;
  onToggleExport: () => void;
  passphrase: string;
  onPassphraseChange: (v: string) => void;
  exporting: boolean;
  onExport: () => void;
};

export function SettingsView({
  biometricEnabled,
  biometricAvailable,
  onToggleBiometric,
  showExport,
  onToggleExport,
  passphrase,
  onPassphraseChange,
  exporting,
  onExport,
}: SettingsViewProps) {
  return (
    <>
      <Text style={styles.settingsView__sectionTitle}>Security</Text>
      <Card>
        <View style={styles.settingsView__row}>
          <View style={styles.settingsView__iconCircle}>
            <Ionicons name="finger-print" size={20} color={colors.primary} />
          </View>
          <View style={styles.settingsView__content}>
            <Text style={styles.settingsView__label}>Biometric Lock</Text>
            <Text style={styles.settingsView__hint}>
              {biometricAvailable ? "Require biometric to open app" : "Not available on this device"}
            </Text>
          </View>
          <Switch
            value={biometricEnabled}
            onValueChange={onToggleBiometric}
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

      <Text style={[styles.settingsView__sectionTitle, styles.settingsView__sectionTitle_spaced]}>Data</Text>
      <Card>
        <View style={styles.settingsView__row}>
          <View style={styles.settingsView__iconCircle}>
            <Ionicons name="cloud-download-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.settingsView__content}>
            <Text style={styles.settingsView__label}>Encrypted Backup</Text>
            <Text style={styles.settingsView__hint}>Export all data with passphrase encryption</Text>
          </View>
        </View>
        <View style={{ marginTop: spacing.md }}>
          <Button
            title={showExport ? "Cancel" : "Export Backup"}
            onPress={onToggleExport}
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
              onChangeText={onPassphraseChange}
              secureTextEntry
              testID="settings-passphrase-input"
            />
            <Button title="Export" onPress={onExport} loading={exporting} disabled={!passphrase.trim()} testID="settings-export-confirm-btn" />
          </View>
        )}
      </Card>

      <Text style={styles.settingsView__version}>Rolobitdex v1.0.0</Text>
    </>
  );
}
