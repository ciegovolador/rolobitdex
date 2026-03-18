import { test, expect } from '@playwright/test';
import { resetAppState, waitForAppReady } from '../helpers/cleanup';
import { testContacts } from '../helpers/seed';

test.describe('Contact Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await resetAppState(page);
    await page.reload();
    await waitForAppReady(page);
  });

  test('shows empty state when no contacts exist', async ({ page }) => {
    await expect(page.getByText('No contacts yet')).toBeVisible();
    await expect(page.getByText('Tap + to add your first contact')).toBeVisible();
  });

  test('creates a new contact via form', async ({ page }) => {
    // Navigate directly to the new contact form
    await page.goto('/contact/new');
    await page.waitForSelector('input[placeholder="Contact name"]', { timeout: 5_000 });

    // Fill in the contact name
    await page.getByPlaceholder('Contact name').fill(testContacts.alice.name);

    // Click Save
    await page.getByText('Save').click();

    // Should navigate to contact detail page
    await expect(page.getByText(testContacts.alice.name).first()).toBeVisible({ timeout: 5_000 });
  });

  test('contact appears in the contacts list after creation', async ({ page }) => {
    // Create a contact via direct navigation
    await page.goto('/contact/new');
    await page.waitForSelector('input[placeholder="Contact name"]', { timeout: 5_000 });
    await page.getByPlaceholder('Contact name').fill(testContacts.alice.name);
    await page.getByText('Save').click();
    await page.waitForTimeout(1_000);

    // Navigate back to contacts list
    await page.goto('/');
    await waitForAppReady(page);

    // Verify the contact appears
    await expect(page.getByText(testContacts.alice.name).first()).toBeVisible({ timeout: 5_000 });
  });

  test('searches for a contact', async ({ page }) => {
    // Create first contact
    await page.goto('/contact/new');
    await page.waitForSelector('input[placeholder="Contact name"]', { timeout: 5_000 });
    await page.getByPlaceholder('Contact name').fill(testContacts.alice.name);
    await page.getByText('Save').click();

    // Wait for navigation to contact detail, then go back to list
    await page.waitForTimeout(1_000);
    await page.goto('/');
    await waitForAppReady(page);

    // Create second contact from the contacts list page
    await page.goto('/contact/new');
    await page.waitForSelector('input[placeholder="Contact name"]', { timeout: 5_000 });
    await page.getByPlaceholder('Contact name').fill(testContacts.bob.name);
    await page.getByText('Save').click();

    // Wait and go to contacts list
    await page.waitForTimeout(1_000);
    await page.goto('/');
    await waitForAppReady(page);

    // Both contacts should be visible before search
    await expect(page.getByText(testContacts.alice.name).first()).toBeVisible({ timeout: 5_000 });
    await expect(page.getByText(testContacts.bob.name).first()).toBeVisible({ timeout: 5_000 });

    // Search for Alice
    await page.getByPlaceholder('Search contacts...').fill('Alice');
    await page.waitForTimeout(1_000);

    // Alice should be visible, Bob should not
    await expect(page.getByText(testContacts.alice.name).first()).toBeVisible();
    await expect(page.getByText(testContacts.bob.name)).not.toBeVisible();
  });

  test('shows "No contacts found" for empty search', async ({ page }) => {
    await page.getByPlaceholder('Search contacts...').fill('Nonexistent Person');
    await page.waitForTimeout(500);
    await expect(page.getByText('No contacts found')).toBeVisible();
  });
});
