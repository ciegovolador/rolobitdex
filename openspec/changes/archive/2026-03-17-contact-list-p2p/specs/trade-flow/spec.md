## ADDED Requirements

### Requirement: Create a trade offer
The system SHALL allow users to create a trade offer specifying: type (buy/sell BTC), amount in sats, fiat currency, fiat amount, and target contact.

#### Scenario: Create a sell offer
- **WHEN** user creates a sell offer for 100,000 sats at 500 MXN to contact "Alice"
- **THEN** the trade is created with status "pending" and visible in the trade list

#### Scenario: Create offer without required fields
- **WHEN** user attempts to create an offer without specifying amount
- **THEN** the system SHALL display a validation error

### Requirement: Accept a trade offer
The system SHALL allow the trade creator to mark an offer as "accepted" (indicating the counterparty agreed out-of-band).

#### Scenario: Accept a pending trade
- **WHEN** user marks a pending trade with Alice as "accepted"
- **THEN** the trade status changes to "accepted"

### Requirement: Confirm fiat payment
The system SHALL allow the buyer to mark fiat payment as sent, and the seller to confirm fiat payment received.

#### Scenario: Buyer marks payment sent
- **WHEN** the buyer marks fiat payment as sent on an accepted trade
- **THEN** the trade status changes to "fiat_sent"

#### Scenario: Seller confirms payment received
- **WHEN** the seller confirms fiat payment received
- **THEN** the trade status changes to "fiat_received"

### Requirement: Complete trade
The system SHALL allow the seller to mark BTC as released, completing the trade.

#### Scenario: Release BTC and complete
- **WHEN** the seller marks BTC as released on a "fiat_received" trade
- **THEN** the trade status changes to "completed" with a completion timestamp

### Requirement: Cancel a trade
The system SHALL allow either party to cancel a trade that is not yet completed.

#### Scenario: Cancel a pending trade
- **WHEN** user cancels a trade in "pending" status
- **THEN** the trade status changes to "cancelled"

#### Scenario: Cannot cancel completed trade
- **WHEN** user attempts to cancel a "completed" trade
- **THEN** the system SHALL prevent cancellation and display an error

### Requirement: View trade history per contact
The system SHALL display a chronological list of all trades with a given contact, including status, amounts, and timestamps.

#### Scenario: View trade history
- **WHEN** user opens Alice's contact profile and navigates to trade history
- **THEN** all trades with Alice are shown in reverse chronological order

### Requirement: Trade status lifecycle
The system SHALL enforce the trade status lifecycle: pending → accepted → fiat_sent → fiat_received → completed. Trades MAY be cancelled from any status except "completed".

#### Scenario: Invalid status transition
- **WHEN** user attempts to mark fiat as received on a "pending" trade
- **THEN** the system SHALL reject the transition and display an error
