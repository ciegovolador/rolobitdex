import { useState, useCallback } from "react";
import { Share } from "react-native";
import { useFocusEffect } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { getOrCreateAddress } from "../models/address";

export function useAddress() {
  const [address, setAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getOrCreateAddress().then(setAddress);
    }, [])
  );

  const handleCopy = useCallback(async () => {
    if (!address) return;
    await Clipboard.setStringAsync(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [address]);

  const handleShare = useCallback(async () => {
    if (!address) return;
    await Share.share({ message: address });
  }, [address]);

  return { address, copied, handleCopy, handleShare } as const;
}
