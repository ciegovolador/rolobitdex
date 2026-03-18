import { getDatabase, generateId } from "./database";

export type TradeStatus = "pending" | "accepted" | "fiat_sent" | "fiat_received" | "completed" | "cancelled";

export type Trade = {
  id: string;
  contact_id: string;
  type: "buy" | "sell";
  sats_amount: number;
  fiat_currency: string;
  fiat_amount: number;
  status: TradeStatus;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};

const VALID_TRANSITIONS: Record<TradeStatus, TradeStatus[]> = {
  pending: ["accepted", "cancelled"],
  accepted: ["fiat_sent", "cancelled"],
  fiat_sent: ["fiat_received", "cancelled"],
  fiat_received: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

/** Checks if a trade status transition is valid per the lifecycle state machine. */
export function canTransition(from: TradeStatus, to: TradeStatus): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

/** Returns all trades, optionally filtered by status, in reverse chronological order. */
export async function getAllTrades(statusFilter?: TradeStatus): Promise<Trade[]> {
  const db = await getDatabase();
  if (statusFilter) {
    return db.getAllAsync<Trade>(
      "SELECT * FROM trades WHERE status = ? ORDER BY created_at DESC",
      [statusFilter]
    );
  }
  return db.getAllAsync<Trade>("SELECT * FROM trades ORDER BY created_at DESC");
}

export async function getTradesByContact(contactId: string): Promise<Trade[]> {
  const db = await getDatabase();
  return db.getAllAsync<Trade>(
    "SELECT * FROM trades WHERE contact_id = ? ORDER BY created_at DESC",
    [contactId]
  );
}

export async function getTrade(id: string): Promise<Trade | null> {
  const db = await getDatabase();
  return db.getFirstAsync<Trade>("SELECT * FROM trades WHERE id = ?", [id]);
}

/** Creates a new trade with status 'pending' and returns its generated ID. */
export async function createTrade(
  contactId: string,
  type: "buy" | "sell",
  satsAmount: number,
  fiatCurrency: string,
  fiatAmount: number
): Promise<string> {
  const db = await getDatabase();
  const id = generateId();
  await db.runAsync(
    "INSERT INTO trades (id, contact_id, type, sats_amount, fiat_currency, fiat_amount) VALUES (?, ?, ?, ?, ?, ?)",
    [id, contactId, type, satsAmount, fiatCurrency, fiatAmount]
  );
  return id;
}

/** Advances trade to a new status. Throws if the transition is invalid. */
export async function updateTradeStatus(id: string, newStatus: TradeStatus): Promise<void> {
  const db = await getDatabase();
  const trade = await getTrade(id);
  if (!trade) throw new Error("Trade not found");
  if (!canTransition(trade.status, newStatus)) {
    throw new Error(`Cannot transition from ${trade.status} to ${newStatus}`);
  }
  const completedAt = newStatus === "completed" ? "datetime('now')" : "completed_at";
  await db.runAsync(
    `UPDATE trades SET status = ?, updated_at = datetime('now'), completed_at = ${completedAt} WHERE id = ?`,
    [newStatus, id]
  );
}

export async function cancelTrade(id: string): Promise<void> {
  return updateTradeStatus(id, "cancelled");
}
