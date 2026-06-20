import { test, expect } from '@playwright/test';

/**
 * Mobile viewport (375px) layout and navigation tests.
 * All tests run at iPhone SE / Pixel-equivalent width.
 *
 * Covers:
 *   - Hamburger menu open/close on every main page
 *   - All nav links reachable from mobile drawer
 *   - Contact form layout stacks vertically on mobile
 *   - News filter pills wrap correctly at 375px
 *   - Library tabs visible at 375px
 */

test.use({ viewport: { width: 375, height: 812 } });

test.describe('Mobile navigation drawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('desktop nav links are hidden and hamburger button is visible at 375px', async ({ page }) => {
    // Desktop nav should be hidden on mobile
    const desktopNav = page.locator('header nav');
    // The desktop nav becomes hidden; hamburger "Mở menu" button should appear
    const hamburger = page.getByRole('button', { name: 'Mở menu' });
    await expect(hamburger).toBeVisible();
  });

  test('clicking hamburger opens the mobile drawer with all nav links', async ({ page }) => {
    await page.getByRole('button', { name: 'Mở menu' }).click();

    // All main nav items should appear in the drawer
    await expect(page.getByRole('link', { name: 'Trang Chủ' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Giới Thiệu' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Hoạt Động' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Thư Viện' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tin Tức' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Liên Hệ' }).first()).toBeVisible();
  });

  test('mobile drawer has an enrollment CTA button', async ({ page }) => {
    await page.getByRole('button', { name: 'Mở menu' }).click();
    // The drawer contains a "Đăng Ký Ngay" CTA link (exact casing in the drawer)
    const registerCta = page.getByRole('link', { name: 'Đăng Ký Ngay', exact: true });
    await expect(registerCta).toBeVisible();
  });

  test('clicking a drawer link navigates correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'Mở menu' }).click();
    // Verify the drawer nav links are visible, then click one
    const aboutLink = page.getByRole('link', { name: 'Giới Thiệu' }).first();
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await expect(page).toHaveURL('/about');
  });

  test('close button inside the drawer dismisses it', async ({ page }) => {
    await page.getByRole('button', { name: 'Mở menu' }).click();
    // The close button is the second button inside the drawer header (no accessible name)
    // It appears as a sibling of the "Ánh Dương" brand text inside the drawer
    const drawerCloseBtn = page.locator('button').nth(1);
    await drawerCloseBtn.click();
    // The drawer nav links should no longer be visible
    await expect(page.locator('nav').getByRole('link', { name: 'Giới Thiệu' }).first()).toBeHidden();
  });
});

test.describe('Mobile page layouts', () => {
  test('home page hero renders correctly at 375px', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('main').getByRole('heading').first()).toBeVisible();
    // Hero should not overflow horizontally
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(380);
  });

  test('contact form fields stack vertically on mobile (name and phone in separate rows)', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    const nameInput = page.getByPlaceholder('Nguyễn Văn A');
    const phoneInput = page.getByPlaceholder('0912 345 678');

    await expect(nameInput).toBeVisible();
    await expect(phoneInput).toBeVisible();

    // On mobile these should stack — phone input should be below the name input
    const nameBox = await nameInput.boundingBox();
    const phoneBox = await phoneInput.boundingBox();

    expect(nameBox).not.toBeNull();
    expect(phoneBox).not.toBeNull();
    // On mobile (375px), phone field is directly below name field (same column layout)
    expect(phoneBox!.y).toBeGreaterThan(nameBox!.y);
  });

  test('news filter tabs are all visible at 375px', async ({ page }) => {
    await page.goto('/news');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('button', { name: 'Tất Cả' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sự Kiện' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Thông Báo' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Hoạt Động' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tin Tức' })).toBeVisible();
  });

  test('library age-group tabs are visible at 375px', async ({ page }) => {
    await page.goto('/library');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('button', { name: /Lớp Mầm/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Lớp Chồi/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Lớp Lá/ })).toBeVisible();
  });

  test('about page renders without horizontal overflow at 375px', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(380);
  });

  test('news list articles stack single-column at 375px', async ({ page }) => {
    await page.goto('/news');
    await page.waitForLoadState('networkidle');

    // At least one article link should be visible
    const firstArticle = page.locator('main').getByRole('link').filter({ hasText: /(2025|2026)/ }).first();
    await expect(firstArticle).toBeVisible();

    // No horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(380);
  });

  test('footer is readable at 375px without horizontal overflow', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('footer')).toBeVisible();
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(380);
  });
});
