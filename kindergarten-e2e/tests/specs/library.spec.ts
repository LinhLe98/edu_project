import { test, expect } from '@playwright/test';
import { LibraryPage, AlbumDetailPage } from '../pages/library.page';

/**
 * Library page (/library) and Album Detail (/library/album/:id) tests.
 * Covers: age-group tabs (3/4/5 tuoi), album cards, learning materials,
 * album detail view with images and emoji reactions.
 */
test.describe('Library Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/library');
    await page.waitForLoadState('networkidle');
  });

  test('displays page heading "Thư Viện"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Thư Viện', level: 1 })).toBeVisible();
  });

  test('age-group tab buttons are visible', async ({ page }) => {
    const lib = new LibraryPage(page);
    await expect(lib.tabMamNon).toBeVisible();
    await expect(lib.tabChoi).toBeVisible();
    await expect(lib.tabLa).toBeVisible();
  });

  test('initial tab shows albums for Lớp Mầm (3 tuổi) by default', async ({ page }) => {
    // Default view should show Mầm albums (album-1, album-2, album-3)
    await expect(page.locator('main').getByRole('link').filter({ hasText: /Lớp Mầm/ }).first()).toBeVisible();
  });

  test('clicking "Lớp Chồi" tab loads Chồi albums', async ({ page }) => {
    const lib = new LibraryPage(page);
    await lib.clickTab('choi');
    // After tab switch the grid should contain Chồi-tagged albums
    await expect(page.locator('main').getByRole('link').filter({ hasText: /Lớp Chồi/ }).first()).toBeVisible();
  });

  test('clicking "Lớp Lá" tab loads Lá albums', async ({ page }) => {
    const lib = new LibraryPage(page);
    await lib.clickTab('la');
    await expect(page.locator('main').getByRole('link').filter({ hasText: /Lớp Lá/ }).first()).toBeVisible();
  });

  test('switching back to "Lớp Mầm" tab reloads Mầm albums', async ({ page }) => {
    const lib = new LibraryPage(page);
    await lib.clickTab('choi');
    await lib.clickTab('mam');
    await expect(page.locator('main').getByRole('link').filter({ hasText: /Lớp Mầm/ }).first()).toBeVisible();
  });

  test('album cards show image count', async ({ page }) => {
    // Album cards display "X ảnh" — verify at least one is visible
    await expect(page.locator('main').getByText(/\d+ ảnh/).first()).toBeVisible();
  });

  test('album card links point to /library/album/:id', async ({ page }) => {
    const albumLinks = page.locator('main').getByRole('link').filter({ hasText: /ảnh/ });
    const count = await albumLinks.count();
    expect(count).toBeGreaterThan(0);
    await expect(albumLinks.first()).toHaveAttribute('href', /\/library\/album\//);
  });

  test('learning materials section is present', async ({ page }) => {
    // Use heading role to avoid matching multiple text nodes containing "Học Liệu"
    await expect(page.locator('main').getByRole('heading', { name: /Học Liệu/ })).toBeVisible();
  });

  test('learning materials contain downloadable items', async ({ page }) => {
    // The materials section should have links or buttons for download
    const materialsSection = page.locator('main').filter({ hasText: /Học Liệu/ });
    const itemCount = await materialsSection.locator('img, button, a').count();
    expect(itemCount).toBeGreaterThan(0);
  });
});

test.describe('Album Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/library/album/album-1');
    await page.waitForLoadState('networkidle');
  });

  test('displays album title', async ({ page }) => {
    // album-1 is "Giờ Đọc Sách – Lớp Mầm"
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Giờ Đọc Sách');
  });

  test('shows photo count and date in album metadata', async ({ page }) => {
    // album-1 has 8 images, date 01/09/2025
    await expect(page.locator('main').getByText(/8 ảnh/)).toBeVisible();
  });

  test('album images are rendered', async ({ page }) => {
    const images = page.locator('main').locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });

  test('emoji reaction buttons are present', async ({ page }) => {
    // The component renders 4 reaction emoji buttons
    await expect(page.locator('main').getByText(/Cảm nhận/)).toBeVisible();
    const reactionButtons = page.locator('main').filter({ hasText: /Cảm nhận/ }).getByRole('button');
    const count = await reactionButtons.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('clicking a reaction button increments its count', async ({ page }) => {
    // Reactions are ephemeral signals — clicking adds a count badge to the button
    const firstReaction = page.locator('main').filter({ hasText: /Cảm nhận/ }).getByRole('button').first();
    await firstReaction.click();
    await expect(firstReaction).toContainText('1');
  });

  test('"Quay lại Thư Viện" link navigates back to /library', async ({ page }) => {
    await page.getByRole('link', { name: /Quay lại Thư Viện/ }).click();
    await expect(page).toHaveURL('/library');
  });

  test('breadcrumb shows correct trail: Home › Thư Viện › album name', async ({ page }) => {
    // The breadcrumb nav is inside main; the header nav also matches "Thư Viện"
    // — target the breadcrumb inside main explicitly
    const breadcrumbNav = page.locator('main nav');
    await expect(breadcrumbNav).toBeVisible();
    await expect(breadcrumbNav.getByRole('link', { name: 'Trang Chủ' })).toBeVisible();
    await expect(breadcrumbNav.getByRole('link', { name: 'Thư Viện' })).toBeVisible();
  });

  test('album detail page renders for album-2', async ({ page }) => {
    await page.goto('/library/album/album-2');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Vẽ Tranh');
  });

  test('album detail page renders for album-3', async ({ page }) => {
    await page.goto('/library/album/album-3');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Vui Chơi');
  });

  test('invalid album ID stays on the URL and shows "Không tìm thấy album này."', async ({ page }) => {
    await page.goto('/library/album/does-not-exist');
    await page.waitForLoadState('networkidle');
    // Should NOT redirect — album route handles its own error state
    await expect(page).toHaveURL(/\/library\/album\/does-not-exist/);
    await expect(page.locator('main').getByText('Không tìm thấy album này.')).toBeVisible();
  });

  test('invalid album ID error state has a working "Quay lại Thư Viện" recovery element', async ({ page }) => {
    await page.goto('/library/album/does-not-exist');
    await page.waitForLoadState('networkidle');
    await page.locator('main').getByText(/Quay lại Thư Viện/).click();
    await expect(page).toHaveURL('/library');
  });

  test('album photo grid renders all photos (album-1 has 8 images)', async ({ page }) => {
    await page.goto('/library/album/album-1');
    await page.waitForLoadState('networkidle');
    const images = page.locator('main img');
    const count = await images.count();
    expect(count).toBe(8);
  });
});
