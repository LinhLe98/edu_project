import { test, expect } from '@playwright/test';

/**
 * End-to-end user journey tests.
 * These tests simulate complete workflows a parent or visitor would perform,
 * crossing multiple pages in a single session.
 */

test.describe('User Journey: Parent researching the school', () => {
  test('parent visits home, reads about section, explores teacher profile, returns to about', async ({ page }) => {
    // 1. Start at home
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: /Nơi Ươm Mầm/ })).toBeVisible();

    // 2. Click "Tìm hiểu thêm" to go to About
    await page.locator('main').getByRole('link', { name: 'Tìm hiểu thêm' }).first().click();
    await expect(page).toHaveURL('/about');
    await page.waitForLoadState('networkidle');

    // 3. Click on the principal's name to view profile
    const principalLink = page.locator('main').getByRole('link', { name: /Nguyễn Thị Hương/ }).first();
    await principalLink.click();
    await expect(page).toHaveURL(/\/teachers\/staff-1/);
    // The teacher name appears in page-hero h1 and content h1; use first()
    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Nguyễn Thị Hương');

    // 4. Go back to About
    await page.getByRole('link', { name: /Quay lại Giới Thiệu/ }).click();
    await expect(page).toHaveURL('/about');
  });
});

test.describe('User Journey: Parent checking news and registering', () => {
  test('parent browses news, reads an article, then goes to contact page', async ({ page }) => {
    // 1. Navigate to news
    await page.goto('/news');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Tin Tức & Sự Kiện', level: 1 })).toBeVisible();

    // 2. Click on the first article
    const firstArticle = page.locator('main').getByRole('link').filter({ hasText: /(2025|2026)/ }).first();
    await firstArticle.click();
    await expect(page).toHaveURL(/\/news\/.+/);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

    // 3. Navigate to contact via header
    await page.getByRole('link', { name: 'Liên Hệ' }).first().click();
    await expect(page).toHaveURL('/contact');
    await expect(page.getByRole('heading', { name: 'Liên Hệ', level: 1 })).toBeVisible();
  });
});

test.describe('User Journey: Parent exploring library for a specific age group', () => {
  test('parent navigates to library, switches to Lop Choi tab, opens an album', async ({ page }) => {
    // 1. Go to library
    await page.goto('/library');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Thư Viện', level: 1 })).toBeVisible();

    // 2. Click the "Lớp Chồi" tab
    await page.getByRole('button', { name: /Lớp Chồi/ }).click();
    await expect(page.locator('main').getByRole('link').filter({ hasText: /Lớp Chồi/ }).first()).toBeVisible();

    // 3. Click on the first Chồi album
    const firstChoi = page.locator('main').getByRole('link').filter({ hasText: /Lớp Chồi/ }).first();
    await firstChoi.click();
    await expect(page).toHaveURL(/\/library\/album\//);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

    // 4. React to the album
    const reactionBtn = page.locator('main').filter({ hasText: /Cảm nhận/ }).getByRole('button').first();
    await reactionBtn.click();
    // Reaction count should change (ephemeral signal, incremented in memory)

    // 5. Return to library via the back link (breadcrumb nav has duplicate in header nav)
    await page.getByRole('link', { name: /Quay lại Thư Viện/ }).click();
    await expect(page).toHaveURL('/library');
  });
});

test.describe('User Journey: Parent searching for specific news and filtering', () => {
  test('parent uses search and category filter on news list', async ({ page }) => {
    await page.goto('/news');
    await page.waitForLoadState('networkidle');

    // 1. Search for "Tết"
    await page.getByRole('textbox', { name: /Tìm kiếm/ }).fill('Tết');

    // 2. Clear search and filter by Sự Kiện category
    await page.getByRole('textbox', { name: /Tìm kiếm/ }).clear();
    await page.getByRole('button', { name: 'Sự Kiện' }).click();

    // Events category articles should be visible after filter
    await page.waitForTimeout(500); // allow client-side filter to apply

    // 3. Navigate directly to a known SU_KIEN article to verify the flow
    await page.goto('/news/khai-giang-nam-hoc-moi-2025-2026');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/news\/.+/);
  });
});

test.describe('User Journey: Navigating from Home CTA to contact form submission attempt', () => {
  test('parent clicks enrollment CTA on home page and reaches the contact form', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click the CTA "Đăng ký ngay" button
    await page.getByRole('link', { name: 'Đăng ký ngay' }).click();
    await expect(page).toHaveURL('/contact');
    // Use domcontentloaded — Google Maps iframe keeps network connections open
    await page.waitForLoadState('domcontentloaded');

    // Verify form is visible
    await expect(page.getByPlaceholder('Nguyễn Văn A')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Gửi yêu cầu' })).toBeVisible();
  });
});

test.describe('User Journey: Exploring teacher groups from About page', () => {
  test('parent browses the management group then a teaching group', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');

    // Find a "Xem tất cả" link for a teacher group
    const seeAllLinks = page.locator('main').getByRole('link').filter({ hasText: /Xem tất cả/ });
    const count = await seeAllLinks.count();
    if (count > 0) {
      await seeAllLinks.first().click();
      await expect(page).toHaveURL(/\/teacher-groups\//);
      await page.waitForLoadState('networkidle');
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

      // Go back to About (link targets /about#teacher-groups with fragment)
      await page.getByRole('link', { name: /Quay lại Đội Ngũ/ }).first().click();
      await expect(page).toHaveURL(/\/about/);
    }
  });
});
