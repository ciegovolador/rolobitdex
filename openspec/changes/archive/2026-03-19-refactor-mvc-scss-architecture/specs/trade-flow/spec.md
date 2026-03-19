## ADDED Requirements

### Requirement: Trade operations are accessed through model layer
All trade CRUD and status transitions SHALL be accessed through `src/models/trade.ts` which wraps `src/db/trades.ts` with idempotent status advancement.

#### Scenario: Controller advances trade status
- **WHEN** `useTradeDetail()` hook needs to advance a trade
- **THEN** it SHALL call `advanceTradeIdempotent()` from `src/models/trade.ts`

#### Scenario: Trade model provides description helper
- **WHEN** a view needs a readable trade summary (e.g., "BUY 100,000 sats, 50 MXN with Alice")
- **THEN** `getTradeDescription(trade, contactName)` from `src/models/trade.ts` SHALL return it

### Requirement: Trade filtering is in the controller layer
Trade status filtering logic SHALL be owned by `useTrades()` controller hook, not the view.

#### Scenario: useTrades manages filter state
- **WHEN** the trades screen renders
- **THEN** `useTrades()` SHALL return `{ trades, filter, setFilter, loading }` and handle data reloading when filter changes
