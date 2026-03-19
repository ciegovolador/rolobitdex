export type { Trade, TradeStatus } from "../db/trades";

export {
  getAllTrades,
  getTrade,
  getTradesByContact,
  createTrade,
  updateTradeStatus,
  cancelTrade,
  canTransition,
} from "../db/trades";

import { getTrade, updateTradeStatus, canTransition } from "../db/trades";
import type { Trade, TradeStatus } from "../db/trades";

export type TradeWithContact = Trade & { contact_name: string };

export function getTradeDescription(trade: Trade, contactName: string): string {
  return `${trade.type.toUpperCase()} ${trade.sats_amount.toLocaleString()} sats, ${trade.fiat_amount} ${trade.fiat_currency} with ${contactName}`;
}

export function getTradeStatusLabel(status: TradeStatus): string {
  return status.replace("_", " ");
}

export async function advanceTradeIdempotent(
  id: string,
  targetStatus: TradeStatus
): Promise<void> {
  const trade = await getTrade(id);
  if (!trade) throw new Error("Trade not found");
  if (trade.status === targetStatus) return;
  if (!canTransition(trade.status, targetStatus)) {
    throw new Error(
      `Cannot transition from ${trade.status} to ${targetStatus}`
    );
  }
  await updateTradeStatus(id, targetStatus);
}
