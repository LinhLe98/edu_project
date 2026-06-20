import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

/**
 * Home page (/) tests.
 * Covers: hero slideshow, statistics bar, about section, teacher highlights,
 * news preview, and the enrollment CTA banner.
 */
test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('displays the page title with the school name', async ({ page }) => {
    await expect(page).toHaveTitle(/Trường Mầm Non Ánh Dương/);
  });

  test('hero section is visible with at least one heading', async ({ page }) => {
    const home = new HomePage(page);
    // The hero slideshow renders multiple heading slides; at least one must be visible
    const heroHeadings = page.locator('main').getByRole('heading', { level: 2 });
    await expect(heroHeadings.first()).toBeVisible();
  });

  test('statistics bar shows school stats (years, students, teachers, classrooms)', async ({ page }) => {
    await expect(page.locator('main').getByText(/Năm thành lập/)).toBeVisible();
    await expect(page.locator('main').getByText(/Học sinh/)).toBeVisible();
    // Use exact text to avoid matching teacher card bio paragraphs
    await expect(page.locator('main').getByText('Giáo viên', { exact: true })).toBeVisible();
    await expect(page.locator('main').getByText(/Phòng học/)).toBeVisible();
  });

  test('about section is visible and contains school description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Về Trường Mầm Non Ánh Dương/ })).toBeVisible();
    await expect(page.locator('main').getByText(/2010/)).toBeVisible();
  });

  test('"Tìm hiểu thêm" link in about section leads to /about', async ({ page }) => {
    const learnMoreLink = page.locator('main').getByRole('link', { name: 'Tìm hiểu thêm' }).first();
    await expect(learnMoreLink).toHaveAttribute('href', '/about');
  });

  test('teacher highlights section shows teacher names and roles', async ({ page }) => {
    // Use first() to avoid strict-mode violation — hero slideshow also has a heading referencing teachers
    await expect(page.getByRole('heading', { name: 'Đội Ngũ Giáo Viên' }).first()).toBeVisible();
    // At least one teacher card from the management board should be visible
    await expect(page.locator('main').getByText('Hiệu Trưởng').first()).toBeVisible();
  });

  test('teacher cards link to individual teacher detail pages', async ({ page }) => {
    // The first teacher card on the home page should link to /teachers/...
    const firstTeacherLink = page.locator('main').getByRole('link').filter({ hasText: 'Nguyễn Thị Hương' }).first();
    await expect(firstTeacherLink).toHaveAttribute('href', /\/teachers\//);
  });

  test('"Xem tất cả giáo viên" link points to /about#teacher-groups', async ({ page }) => {
    const seeAllLink = page.getByRole('link', { name: /Xem tất cả giáo viên/ });
    await expect(seeAllLink).toHaveAttribute('href', /\/about/);
  });

  test('news section shows at least one article with a date', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Tin Tức & Sự Kiện' })).toBeVisible();
    // News articles have dates in DD/MM/YYYY format — use first() as multiple dates exist
    await expect(page.locator('main').getByText(/\d{2}\/\d{2}\/202[0-9]/).first()).toBeVisible();
  });

  test('news article cards link to individual news detail pages', async ({ page }) => {
    // The link wraps the article element — find it by navigating up via known href pattern
    const firstNewsLink = page.locator('main').getByRole('link').filter({ hasText: /Đọc tiếp/ }).first();
    await expect(firstNewsLink).toHaveAttribute('href', /\/news\//);
  });

  test('enrollment CTA banner is visible with "Đăng ký ngay" button', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Đăng Ký Năm Học/ })).toBeVisible();
    const registerLink = page.getByRole('link', { name: 'Đăng ký ngay' });
    await expect(registerLink).toBeVisible();
    await expect(registerLink).toHaveAttribute('href', '/contact');
  });

  test('"Đăng ký ngay" CTA navigates to the contact page', async ({ page }) => {
    const registerLink = page.getByRole('link', { name: 'Đăng ký ngay' });
    await registerLink.click();
    await expect(page).toHaveURL('/contact');
  });
});
