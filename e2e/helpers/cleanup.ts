/**
 * Cleanup utilities for E2E tests.
 * Resets app state between test runs.
 */

import type { Page } from '@playwright/test';

/**
 * Clear all app data by navigating to settings and resetting,
 * or by clearing browser storage directly.
 */
export async function resetAppState(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  // Delete IndexedDB databases used by expo-sqlite on web
  await page.evaluate(async () => {
    const dbs = await indexedDB.databases();
    for (const db of dbs) {
      if (db.name) indexedDB.deleteDatabase(db.name);
    }
  });
}

/**
 * Wait for the app to be fully loaded and ready for interaction.
 * Works for both mobile (bottom tabs) and desktop (sidebar) layouts.
 */
export async function waitForAppReady(page: Page): Promise<void> {
  // Wait for the search input which is present on the contacts screen in all layouts
  await page.locator('input[placeholder="Search contacts..."]').waitFor({
    state: 'visible',
    timeout: 15_000,
  });
}

/**
 * Navigate to a tab by clicking the tab text.
 * Works for both mobile (bottom tabs) and desktop (sidebar).
 */
export async function navigateToTab(page: Page, tabName: string): Promise<void> {
  // On both mobile and desktop, the tab text is clickable
  await page.getByText(tabName, { exact: true }).first().click();
  // Small wait for navigation to settle
  await page.waitForTimeout(500);
}
