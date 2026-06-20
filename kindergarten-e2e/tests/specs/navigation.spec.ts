import { test, expect } from '@playwright/test';
import { HeaderPage } from '../pages/header.page';

/**
 * Navigation tests — verifies that every top-level nav link routes to the correct URL
 * and that the shared header and footer are present on all pages.
 */
test.describe('Global Navigation', () => {
  test('home page loads and displays the school name in the header', async ({ page }) => {
    await page.goto('/');
    const header = new HeaderPage(page);
    await expect(header.logo).toBeVisible();
    await expect(header.logo).toContainText('Ánh Dương');
  });

  test('all primary nav links are visible on the home page', async ({ page }) => {
    await page.goto('/');
    const header = new HeaderPage(page);

    await expect(header.navHome).toBeVisible();
    await expect(header.navAbout).toBeVisible();
    await expect(header.navActivities).toBeVisible();
    await expect(header.navLibrary).toBeVisible();
    await expect(header.navNews).toBeVisible();
    await expect(header.navContact).toBeVisible();
    await expect(header.navRegister).toBeVisible();
  });

  test('clicking "Giới Thiệu" navigates to /about', async ({ page }) => {
    await page.goto('/');
    const header = new HeaderPage(page);
    await header.clickAbout();
    await expect(page).toHaveURL('/about');
  });

  test('clicking "Hoạt Động" navigates to /activities', async ({ page }) => {
    await page.goto('/');
    const header = new HeaderPage(page);
    await header.clickActivities();
    await expect(page).toHaveURL('/activities');
  });

  test('clicking "Thư Viện" navigates to /library', async ({ page }) => {
    await page.goto('/');
    const header = new HeaderPage(page);
    await header.clickLibrary();
    await expect(page).toHaveURL('/library');
  });

  test('clicking "Tin Tức" navigates to /news', async ({ page }) => {
    await page.goto('/');
    const header = new HeaderPage(page);
    await header.clickNews();
    await expect(page).toHaveURL('/news');
  });

  test('clicking "Liên Hệ" navigates to /contact', async ({ page }) => {
    await page.goto('/');
    const header = new HeaderPage(page);
    await header.clickContact();
    await expect(page).toHaveURL('/contact');
  });

  test('clicking "Đăng Ký" navigates to /contact (registration redirects to contact)', async ({ page }) => {
    await page.goto('/');
    const header = new HeaderPage(page);
    await header.clickRegister();
    await expect(page).toHaveURL('/contact');
  });

  test('clicking the logo navigates back to home from an inner page', async ({ page }) => {
    await page.goto('/about');
    const header = new HeaderPage(page);
    await header.logo.click();
    await expect(page).toHaveURL('/');
  });

  test('unknown route redirects to home page', async ({ page }) => {
    await page.goto('/some-nonexistent-page-xyz');
    await expect(page).toHaveURL('/');
  });

  test('footer is present on every page and contains copyright notice', async ({ page }) => {
    const routes = ['/', '/about', '/activities', '/library', '/news', '/contact'];
    for (const route of routes) {
      await page.goto(route);
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      await expect(footer).toContainText('Trường Mầm Non Ánh Dương');
    }
  });

  test('footer navigation links are present', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'Trang Chủ' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Giới Thiệu' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Hoạt Động' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Thư Viện' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Tin Tức' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Liên Hệ' })).toBeVisible();
  });
});
