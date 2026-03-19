import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { getAllContacts, type Contact } from "../models/contact";
import { createTrade } from "../models/trade";

export function useNewTrade(initialContactId?: string) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<string>(
    initialContactId ?? ""
  );
  const [type, setType] = useState<"buy" | "sell">("buy");
  const [sats, setSats] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("MXN");
  const [fiatAmount, setFiatAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllContacts().then(setContacts);
  }, []);

  const create = useCallback(async () => {
    if (!selectedContact || !sats || !fiatAmount) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    const satsNum = parseInt(sats, 10);
    const fiatNum = parseFloat(fiatAmount);
    if (isNaN(satsNum) || satsNum <= 0) {
      Alert.alert("Error", "Sats amount must be a positive number");
      return;
    }
    if (isNaN(fiatNum) || fiatNum <= 0) {
      Alert.alert("Error", "Fiat amount must be a positive number");
      return;
    }
    setLoading(true);
    try {
      const id = await createTrade(
        selectedContact,
        type,
        satsNum,
        fiatCurrency.trim(),
        fiatNum
      );
      router.replace(`/trade/${id}`);
    } catch {
      Alert.alert("Error", "Failed to create trade");
    } finally {
      setLoading(false);
    }
  }, [selectedContact, type, sats, fiatCurrency, fiatAmount]);

  return {
    contacts,
    selectedContact,
    setSelectedContact,
    type,
    setType,
    sats,
    setSats,
    fiatCurrency,
    setFiatCurrency,
    fiatAmount,
    setFiatAmount,
    create,
    loading,
  } as const;
}
