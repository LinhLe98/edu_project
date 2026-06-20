import { test, expect } from '@playwright/test';

/**
 * Footer component tests.
 * The footer is shared across all pages and contains:
 * - School logo + tagline
 * - "Khám phá" navigation links
 * - Contact info (address, phone, email)
 * - Copyright notice
 */
test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('footer is visible on the home page', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });

  test('footer contains the school name', async ({ page }) => {
    await expect(page.locator('footer')).toContainText('Ánh Dương');
  });

  test('footer tagline is present', async ({ page }) => {
    await expect(page.locator('footer').getByText(/Nơi ươm mầm tương lai/)).toBeVisible();
  });

  test('footer navigation links are functional', async ({ page }) => {
    const footerNav = page.locator('footer');

    const links = [
      { name: 'Trang Chủ', url: '/' },
      { name: 'Giới Thiệu', url: '/about' },
      { name: 'Hoạt Động', url: '/activities' },
      { name: 'Thư Viện', url: '/library' },
      { name: 'Tin Tức', url: '/news' },
      { name: 'Liên Hệ', url: '/contact' },
    ];

    for (const { name, url } of links) {
      await expect(footerNav.getByRole('link', { name })).toHaveAttribute('href', url);
    }
  });

  test('footer contact section shows address', async ({ page }) => {
    await expect(page.locator('footer').getByText(/Nguyễn Văn Cừ|Quận 5|TP.HCM/i)).toBeVisible();
  });

  test('footer contact section shows phone number', async ({ page }) => {
    await expect(page.locator('footer').getByText(/028 3855 1234/)).toBeVisible();
  });

  test('footer contact section shows email', async ({ page }) => {
    await expect(page.locator('footer').getByText(/contact@mannonanhduong/)).toBeVisible();
  });

  test('footer copyright text is present', async ({ page }) => {
    await expect(page.locator('footer').getByText(/© 2025 Trường Mầm Non Ánh Dương/)).toBeVisible();
  });
});
