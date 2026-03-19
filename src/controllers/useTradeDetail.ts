import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import {
  getTrade,
  updateTradeStatus,
  canTransition,
  type Trade,
  type TradeStatus,
} from "../models/trade";
import { getContact } from "../models/contact";

export const STATUS_STEPS: TradeStatus[] = [
  "pending",
  "accepted",
  "fiat_sent",
  "fiat_received",
  "completed",
];

export const NEXT_ACTION: Partial<
  Record<TradeStatus, { label: string; next: TradeStatus }>
> = {
  pending: { label: "Mark as Accepted", next: "accepted" },
  accepted: { label: "Mark Fiat Sent", next: "fiat_sent" },
  fiat_sent: { label: "Confirm Fiat Received", next: "fiat_received" },
  fiat_received: { label: "Release BTC (Complete)", next: "completed" },
};

export function useTradeDetail(id: string | undefined) {
  const [trade, setTrade] = useState<Trade | null>(null);
  const [contactName, setContactName] = useState("");

  const loadTrade = useCallback(async () => {
    if (!id) return;
    const t = await getTrade(id);
    setTrade(t);
    if (t) {
      const c = await getContact(t.contact_id);
      setContactName(c?.name ?? "Unknown");
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      loadTrade();
    }, [loadTrade])
  );

  const advance = useCallback(
    async (newStatus: TradeStatus) => {
      if (!trade) return;
      try {
        await updateTradeStatus(trade.id, newStatus);
        loadTrade();
      } catch (e: any) {
        Alert.alert("Error", e.message);
      }
    },
    [trade, loadTrade]
  );

  const cancel = useCallback(async () => {
    if (!trade) return;
    try {
      await updateTradeStatus(trade.id, "cancelled");
      loadTrade();
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  }, [trade, loadTrade]);

  const action = trade ? NEXT_ACTION[trade.status] : undefined;
  const currentIdx = trade ? STATUS_STEPS.indexOf(trade.status) : -1;
  const canCancel = trade ? canTransition(trade.status, "cancelled") : false;

  return {
    trade,
    contactName,
    action,
    currentIdx,
    canCancel,
    advance,
    cancel,
  } as const;
}
