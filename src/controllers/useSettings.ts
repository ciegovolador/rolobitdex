import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import {
  checkBiometric,
  toggleBiometric as toggleBiometricModel,
  performExport,
} from "../models/settings";

export function useSettings() {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [exporting, setExporting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      checkBiometric().then(({ available, enabled }) => {
        setBiometricAvailable(available);
        setBiometricEnabled(enabled);
      });
    }, [])
  );

  const toggleBiometric = useCallback(
    async (value: boolean) => {
      try {
        const success = await toggleBiometricModel(value, biometricAvailable);
        if (success) setBiometricEnabled(value);
      } catch {
        Alert.alert(
          "Not Available",
          "Biometric authentication is not available on this device."
        );
      }
    },
    [biometricAvailable]
  );

  const toggleExport = useCallback(() => {
    setShowExport((prev) => !prev);
  }, []);

  const handleExport = useCallback(async () => {
    if (!passphrase.trim()) {
      Alert.alert("Error", "Passphrase is required");
      return;
    }
    setExporting(true);
    try {
      await performExport(passphrase);
      setShowExport(false);
      setPassphrase("");
      Alert.alert("Success", "Backup exported");
    } catch {
      Alert.alert("Error", "Failed to export backup");
    } finally {
      setExporting(false);
    }
  }, [passphrase]);

  return {
    biometricEnabled,
    biometricAvailable,
    toggleBiometric,
    showExport,
    toggleExport,
    passphrase,
    setPassphrase,
    exporting,
    handleExport,
  } as const;
}
