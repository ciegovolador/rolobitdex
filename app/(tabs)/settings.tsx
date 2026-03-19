import { View, ScrollView, StyleSheet } from "react-native";
import { SettingsView } from "../../src/views/settings/SettingsView";
import { useSettings } from "../../src/controllers/useSettings";
import { colors } from "../../src/constants/theme";

export default function SettingsScreen() {
  const {
    biometricEnabled,
    biometricAvailable,
    toggleBiometric,
    showExport,
    toggleExport,
    passphrase,
    setPassphrase,
    exporting,
    handleExport,
  } = useSettings();

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <SettingsView
          biometricEnabled={biometricEnabled}
          biometricAvailable={biometricAvailable}
          onToggleBiometric={toggleBiometric}
          showExport={showExport}
          onToggleExport={toggleExport}
          passphrase={passphrase}
          onPassphraseChange={setPassphrase}
          exporting={exporting}
          onExport={handleExport}
        />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 0, alignSelf: "center", width: "100%", maxWidth: 800 },
});
