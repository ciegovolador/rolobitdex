import { initMockDb, mockRows } from "../test/setup";
import { getTradeDescription, getTradeStatusLabel, advanceTradeIdempotent } from "./trade";
import { createContact } from "../db/contacts";
import { createTrade } from "../db/trades";
import type { Trade, TradeStatus } from "../db/trades";

beforeEach(() => {
  initMockDb();
  mockRows.contacts = [];
  mockRows.trades = [];
});

describe("getTradeDescription", () => {
  test("formats buy trade description", () => {
    const trade = {
      id: "t1", contact_id: "c1", type: "buy" as const,
      sats_amount: 100000, fiat_currency: "MXN", fiat_amount: 500,
      status: "pending" as TradeStatus, created_at: "2024-01-01",
      updated_at: "2024-01-01", completed_at: null,
    };
    const desc = getTradeDescription(trade, "Alice");
    expect(desc).toContain("BUY");
    expect(desc).toContain("100,000");
    expect(desc).toContain("500");
    expect(desc).toContain("MXN");
    expect(desc).toContain("Alice");
  });

  test("formats sell trade description", () => {
    const trade = {
      id: "t2", contact_id: "c1", type: "sell" as const,
      sats_amount: 50000, fiat_currency: "USD", fiat_amount: 25,
      status: "completed" as TradeStatus, created_at: "2024-01-01",
      updated_at: "2024-01-01", completed_at: "2024-01-02",
    };
    const desc = getTradeDescription(trade, "Bob");
    expect(desc).toContain("SELL");
    expect(desc).toContain("Bob");
  });
});

describe("getTradeStatusLabel", () => {
  test("simple status returns as-is", () => {
    expect(getTradeStatusLabel("pending")).toBe("pending");
  });

  test("replaces underscore with space", () => {
    expect(getTradeStatusLabel("fiat_sent")).toBe("fiat sent");
  });

  test("fiat_received becomes readable", () => {
    expect(getTradeStatusLabel("fiat_received")).toBe("fiat received");
  });

  test("completed returns as-is", () => {
    expect(getTradeStatusLabel("completed")).toBe("completed");
  });

  test("cancelled returns as-is", () => {
    expect(getTradeStatusLabel("cancelled")).toBe("cancelled");
  });
});

describe("advanceTradeIdempotent", () => {
  test("advances valid transition", async () => {
    const contactId = await createContact("Alice");
    const tradeId = await createTrade(contactId, "buy", 100000, "MXN", 500);
    await advanceTradeIdempotent(tradeId, "accepted");
    const trade = mockRows.trades.find((t: any) => t.id === tradeId);
    expect(trade!.status).toBe("accepted");
  });

  test("no-op when already at target status (idempotent)", async () => {
    const contactId = await createContact("Alice");
    const tradeId = await createTrade(contactId, "buy", 100000, "MXN", 500);
    await advanceTradeIdempotent(tradeId, "accepted");
    // Call again — should not throw
    await advanceTradeIdempotent(tradeId, "accepted");
    const trade = mockRows.trades.find((t: any) => t.id === tradeId);
    expect(trade!.status).toBe("accepted");
  });

  test("throws on invalid transition", async () => {
    const contactId = await createContact("Alice");
    const tradeId = await createTrade(contactId, "buy", 100000, "MXN", 500);
    await expect(advanceTradeIdempotent(tradeId, "completed")).rejects.toThrow(
      "Cannot transition"
    );
  });

  test("throws for non-existent trade", async () => {
    await expect(advanceTradeIdempotent("nonexistent", "accepted")).rejects.toThrow(
      "Trade not found"
    );
  });
});
