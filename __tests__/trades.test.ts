import { initMockDb, mockRows } from "./setup";
import { canTransition, createTrade, getAllTrades, getTrade, updateTradeStatus, getTradesByContact, cancelTrade } from "../src/db/trades";
import { createContact } from "../src/db/contacts";

beforeEach(() => {
  initMockDb();
  mockRows.contacts = [];
  mockRows.trades = [];
});

describe("canTransition (state machine)", () => {
  test("pending -> accepted is valid", () => {
    expect(canTransition("pending", "accepted")).toBe(true);
  });

  test("pending -> cancelled is valid", () => {
    expect(canTransition("pending", "cancelled")).toBe(true);
  });

  test("pending -> fiat_sent is invalid", () => {
    expect(canTransition("pending", "fiat_sent")).toBe(false);
  });

  test("pending -> completed is invalid", () => {
    expect(canTransition("pending", "completed")).toBe(false);
  });

  test("accepted -> fiat_sent is valid", () => {
    expect(canTransition("accepted", "fiat_sent")).toBe(true);
  });

  test("fiat_sent -> fiat_received is valid", () => {
    expect(canTransition("fiat_sent", "fiat_received")).toBe(true);
  });

  test("fiat_received -> completed is valid", () => {
    expect(canTransition("fiat_received", "completed")).toBe(true);
  });

  test("completed -> anything is invalid", () => {
    expect(canTransition("completed", "cancelled")).toBe(false);
    expect(canTransition("completed", "pending")).toBe(false);
  });

  test("cancelled -> anything is invalid", () => {
    expect(canTransition("cancelled", "pending")).toBe(false);
    expect(canTransition("cancelled", "accepted")).toBe(false);
  });

  test("full happy path", () => {
    expect(canTransition("pending", "accepted")).toBe(true);
    expect(canTransition("accepted", "fiat_sent")).toBe(true);
    expect(canTransition("fiat_sent", "fiat_received")).toBe(true);
    expect(canTransition("fiat_received", "completed")).toBe(true);
  });
});

describe("Trade CRUD", () => {
  test("createTrade returns an ID", async () => {
    const contactId = await createContact("Alice");
    const tradeId = await createTrade(contactId, "buy", 100000, "MXN", 500);
    expect(tradeId).toBeTruthy();
  });

  test("getTrade returns created trade", async () => {
    const contactId = await createContact("Alice");
    const tradeId = await createTrade(contactId, "sell", 50000, "USD", 25);
    const trade = await getTrade(tradeId);
    expect(trade).toBeTruthy();
    expect(trade!.type).toBe("sell");
    expect(trade!.sats_amount).toBe(50000);
  });

  test("getAllTrades returns all trades", async () => {
    const contactId = await createContact("Alice");
    await createTrade(contactId, "buy", 100000, "MXN", 500);
    await createTrade(contactId, "sell", 50000, "MXN", 250);
    const all = await getAllTrades();
    expect(all.length).toBe(2);
  });

  test("getTradesByContact filters by contact", async () => {
    const alice = await createContact("Alice");
    const bob = await createContact("Bob");
    await createTrade(alice, "buy", 100000, "MXN", 500);
    await createTrade(bob, "sell", 50000, "MXN", 250);
    const aliceTrades = await getTradesByContact(alice);
    expect(aliceTrades.length).toBe(1);
    expect(aliceTrades[0].contact_id).toBe(alice);
  });
});

describe("Trade status transitions", () => {
  test("updateTradeStatus advances valid transition", async () => {
    const contactId = await createContact("Alice");
    const tradeId = await createTrade(contactId, "buy", 100000, "MXN", 500);
    await updateTradeStatus(tradeId, "accepted");
    const trade = await getTrade(tradeId);
    expect(trade!.status).toBe("accepted");
  });

  test("updateTradeStatus throws on invalid transition", async () => {
    const contactId = await createContact("Alice");
    const tradeId = await createTrade(contactId, "buy", 100000, "MXN", 500);
    await expect(updateTradeStatus(tradeId, "completed")).rejects.toThrow(
      "Cannot transition from pending to completed"
    );
  });

  test("updateTradeStatus throws for non-existent trade", async () => {
    await expect(updateTradeStatus("nonexistent", "accepted")).rejects.toThrow(
      "Trade not found"
    );
  });

  test("cancel from pending works", async () => {
    const contactId = await createContact("Alice");
    const tradeId = await createTrade(contactId, "buy", 100000, "MXN", 500);
    await updateTradeStatus(tradeId, "cancelled");
    const trade = await getTrade(tradeId);
    expect(trade!.status).toBe("cancelled");
  });

  test("cancelTrade helper works", async () => {
    const contactId = await createContact("Alice");
    const tradeId = await createTrade(contactId, "buy", 100000, "MXN", 500);
    await cancelTrade(tradeId);
    const trade = await getTrade(tradeId);
    expect(trade!.status).toBe("cancelled");
  });

  test("full lifecycle: pending -> accepted -> fiat_sent -> fiat_received -> completed", async () => {
    const contactId = await createContact("Alice");
    const tradeId = await createTrade(contactId, "sell", 200000, "USD", 100);
    await updateTradeStatus(tradeId, "accepted");
    await updateTradeStatus(tradeId, "fiat_sent");
    await updateTradeStatus(tradeId, "fiat_received");
    await updateTradeStatus(tradeId, "completed");
    const trade = await getTrade(tradeId);
    expect(trade!.status).toBe("completed");
  });

  test("cannot cancel completed trade", async () => {
    const contactId = await createContact("Alice");
    const tradeId = await createTrade(contactId, "buy", 100000, "MXN", 500);
    await updateTradeStatus(tradeId, "accepted");
    await updateTradeStatus(tradeId, "fiat_sent");
    await updateTradeStatus(tradeId, "fiat_received");
    await updateTradeStatus(tradeId, "completed");
    await expect(cancelTrade(tradeId)).rejects.toThrow("Cannot transition");
  });

  test("getAllTrades with status filter", async () => {
    const contactId = await createContact("Alice");
    await createTrade(contactId, "buy", 100000, "MXN", 500);
    const tradeId2 = await createTrade(contactId, "sell", 50000, "MXN", 250);
    await updateTradeStatus(tradeId2, "accepted");
    const pending = await getAllTrades("pending");
    expect(pending.length).toBe(1);
    const accepted = await getAllTrades("accepted");
    expect(accepted.length).toBe(1);
  });

  test("getTrade returns null for non-existent id", async () => {
    const trade = await getTrade("nonexistent");
    expect(trade).toBeNull();
  });
});
