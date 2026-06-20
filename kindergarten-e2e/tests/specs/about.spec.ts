import { test, expect } from '@playwright/test';
import { AboutPage } from '../pages/about.page';

/**
 * About page (/about) tests.
 * Covers: page hero, school introduction/history, management board,
 * teacher group sections, facilities gallery, and navigation to detail pages.
 */
test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
  });

  test('displays the page heading "Giới Thiệu"', async ({ page }) => {
    // The about page renders an inner page banner with the section heading
    await expect(page.locator('main').getByText('Giới Thiệu').first()).toBeVisible();
  });

  test('school history section mentions founding year 2010', async ({ page }) => {
    await expect(page.locator('main').getByText(/2010/)).toBeVisible();
  });

  test('management section (Ban Giam Hieu) is visible', async ({ page }) => {
    await expect(page.locator('main').getByText(/Ban Giám Hiệu/)).toBeVisible();
  });

  test('management section shows principal name (Hiệu Trưởng)', async ({ page }) => {
    await expect(page.locator('main').getByText(/Hiệu Trưởng/).first()).toBeVisible();
  });

  test('teacher groups section is present', async ({ page }) => {
    await expect(page.locator('main').getByText(/Đội Ngũ Giáo Viên/)).toBeVisible();
  });

  test('teacher name links lead to /teachers/:id detail pages', async ({ page }) => {
    // At least one teacher link should point to a /teachers/ route
    const teacherLink = page.locator('main').getByRole('link').filter({ hasText: /Nguyễn Thị Hương|Trần Thị Mai|Lê Thị Thu/ }).first();
    await expect(teacherLink).toHaveAttribute('href', /\/teachers\//);
  });

  test('"Xem tất cả" links lead to /teacher-groups/:dept pages', async ({ page }) => {
    const seeAllLinks = page.locator('main').getByRole('link').filter({ hasText: /Xem tất cả/ });
    const count = await seeAllLinks.count();
    // There should be at least one "see all" link for a teacher group
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(seeAllLinks.nth(i)).toHaveAttribute('href', /\/teacher-groups\//);
    }
  });

  test('facilities section is present', async ({ page }) => {
    await expect(page.locator('main').getByText(/Cơ Sở Vật Chất/)).toBeVisible();
  });

  test('facilities section contains images', async ({ page }) => {
    // The facilities section contains a photo gallery grid
    const facilityImages = page.locator('main').filter({ hasText: /Cơ Sở Vật Chất/ }).locator('img');
    const count = await facilityImages.count();
    expect(count).toBeGreaterThan(0);
  });

  test('navigating to a teacher detail page from About and coming back works', async ({ page }) => {
    const teacherLink = page.locator('main').getByRole('link', { name: /Nguyễn Thị Hương/ }).first();
    await teacherLink.click();
    await expect(page).toHaveURL(/\/teachers\//);

    await page.getByRole('link', { name: /Quay lại Giới Thiệu/ }).click();
    await expect(page).toHaveURL('/about');
  });
});
