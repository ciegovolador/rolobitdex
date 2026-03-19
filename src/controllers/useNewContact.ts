import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { createContactIdempotent } from "../models/contact";

export function useNewContact() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const save = useCallback(async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert("Error", "Name is required");
      return;
    }
    setLoading(true);
    try {
      const id = await createContactIdempotent(trimmed);
      router.replace(`/contact/${id}`);
    } catch {
      Alert.alert("Error", "Failed to create contact");
    } finally {
      setLoading(false);
    }
  }, [name]);

  return { name, setName, save, loading } as const;
}
