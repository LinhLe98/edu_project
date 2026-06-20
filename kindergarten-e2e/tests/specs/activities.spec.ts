import { test, expect } from '@playwright/test';
import { ActivitiesPage } from '../pages/activities.page';

/**
 * Activities page (/activities) tests.
 * Covers: page hero, educational programs listing, activity album previews,
 * and navigation to library.
 */
test.describe('Activities Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/activities');
    await page.waitForLoadState('networkidle');
  });

  test('displays the page heading "Hoạt Động Giáo Dục"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Hoạt Động Giáo Dục', level: 1 })).toBeVisible();
  });

  test('educational programs section is visible', async ({ page }) => {
    // Use heading role to avoid matching program card description paragraphs
    await expect(page.getByRole('heading', { name: 'Chương Trình Giáo Dục' })).toBeVisible();
  });

  test('program section contains at least one program card', async ({ page }) => {
    // Program cards contain program images from the backend
    const programImages = page.locator('main').filter({ hasText: /Chương Trình Giáo Dục/ }).locator('img');
    const count = await programImages.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('album photos section is visible', async ({ page }) => {
    await expect(page.locator('main').getByText('Album Ảnh Hoạt Động')).toBeVisible();
  });

  test('activity album links lead to /library/album/:id', async ({ page }) => {
    const albumLinks = page.locator('main').getByRole('link').filter({ hasText: /Lớp/ });
    const count = await albumLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(albumLinks.nth(i)).toHaveAttribute('href', /\/library\/album\//);
    }
  });

  test('"Xem thư viện đầy đủ" link leads to /library', async ({ page }) => {
    const libraryLink = page.getByRole('link', { name: /Xem thư viện đầy đủ/ });
    await expect(libraryLink).toBeVisible();
    await expect(libraryLink).toHaveAttribute('href', '/library');
  });

  test('"Xem thư viện đầy đủ" link navigates to the library page', async ({ page }) => {
    await page.getByRole('link', { name: /Xem thư viện đầy đủ/ }).click();
    await expect(page).toHaveURL('/library');
  });

  test('clicking an album link navigates to album detail', async ({ page }) => {
    const firstAlbumLink = page.locator('main').getByRole('link').filter({ hasText: /Lớp Mầm|Lớp Chồi|Lớp Lá/ }).first();
    await firstAlbumLink.click();
    await expect(page).toHaveURL(/\/library\/album\//);
  });
});
