import { test, expect } from '@playwright/test';
import { resetAppState, waitForAppReady, navigateToTab } from '../helpers/cleanup';
import { testContacts, testTrades } from '../helpers/seed';

test.describe('Trade Lifecycle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await resetAppState(page);
    await page.reload();
    await waitForAppReady(page);

    // Create a contact first (trades require a counterparty)
    await page.goto('/contact/new');
    await page.waitForSelector('input[placeholder="Contact name"]', { timeout: 5_000 });
    await page.getByPlaceholder('Contact name').fill(testContacts.alice.name);
    await page.getByText('Save').click();
    await page.waitForTimeout(1_000);
  });

  test('creates a buy trade', async ({ page }) => {
    await page.goto('/trade/new');
    await page.waitForSelector('text=Trade Type', { timeout: 5_000 });

    // BUY should be default, click to ensure
    await page.getByText('BUY BTC').click();

    // Select counterparty
    await page.getByText(testContacts.alice.name).click();

    // Fill trade details
    await page.getByPlaceholder('100000').fill(testTrades.buyBitcoin.satsAmount);
    await page.getByPlaceholder('500').fill(testTrades.buyBitcoin.fiatAmount);

    // Create the trade
    await page.getByText('Create Trade').click();

    // Should navigate to trade detail showing Pending status (badge or stepper)
    await expect(page.getByText('Pending').first()).toBeVisible({ timeout: 5_000 });
  });

  test('creates a sell trade', async ({ page }) => {
    await page.goto('/trade/new');
    await page.waitForSelector('text=Trade Type', { timeout: 5_000 });

    // Select SELL type
    await page.getByText('SELL BTC').click();

    // Select counterparty
    await page.getByText(testContacts.alice.name).click();

    // Fill trade details
    await page.getByPlaceholder('100000').fill(testTrades.sellBitcoin.satsAmount);
    await page.getByPlaceholder('500').fill(testTrades.sellBitcoin.fiatAmount);

    // Create the trade
    await page.getByText('Create Trade').click();

    // Should navigate to trade detail
    await expect(page.getByText('Pending').first()).toBeVisible({ timeout: 5_000 });
  });

  test('trade appears in trades list', async ({ page }) => {
    // Create a trade
    await page.goto('/trade/new');
    await page.waitForSelector('text=Trade Type', { timeout: 5_000 });
    await page.getByText('BUY BTC').click();
    await page.getByText(testContacts.alice.name).click();
    await page.getByPlaceholder('100000').fill(testTrades.buyBitcoin.satsAmount);
    await page.getByPlaceholder('500').fill(testTrades.buyBitcoin.fiatAmount);
    await page.getByText('Create Trade').click();
    await page.waitForTimeout(1_000);

    // Navigate to trades list
    await page.goto('/');
    await waitForAppReady(page);
    await navigateToTab(page, 'Trades');

    // Verify trade appears in list (text contains "Alice Nakamoto")
    await expect(page.getByText(/Alice Nakamoto/).first()).toBeVisible({ timeout: 5_000 });
  });
});
