import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import {
  getAllTrades,
  type Trade,
  type TradeStatus,
  type TradeWithContact,
} from "../models/trade";
import { getContact } from "../models/contact";

export const STATUS_FILTERS: (TradeStatus | "all")[] = [
  "all",
  "pending",
  "accepted",
  "fiat_sent",
  "fiat_received",
  "completed",
  "cancelled",
];

export function useTrades() {
  const [trades, setTrades] = useState<TradeWithContact[]>([]);
  const [filter, setFilter] = useState<TradeStatus | "all">("all");

  const loadTrades = useCallback(async () => {
    const raw = await getAllTrades(filter === "all" ? undefined : filter);
    const withNames = await Promise.all(
      raw.map(async (t) => {
        const c = await getContact(t.contact_id);
        return { ...t, contact_name: c?.name ?? "Unknown" };
      })
    );
    setTrades(withNames);
  }, [filter]);

  useFocusEffect(
    useCallback(() => {
      loadTrades();
    }, [loadTrades])
  );

  return { trades, filter, setFilter } as const;
}
