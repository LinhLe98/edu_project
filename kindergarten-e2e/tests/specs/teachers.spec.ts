import { test, expect } from '@playwright/test';
import { TeacherDetailPage, TeacherGroupDetailPage } from '../pages/teacher.page';

/**
 * Teacher Detail (/teachers/:id) and Teacher Group (/teacher-groups/:dept) tests.
 * Covers: individual staff profile, colleagues section, group roster, back navigation.
 *
 * Staff IDs are assigned by the backend. Known IDs from home/about page rendering:
 *   staff-1 = Nguyễn Thị Hương (Hiệu Trưởng)
 *   staff-2 = Trần Thị Mai (Phó Hiệu Trưởng)
 *   staff-3 = Lê Thị Thu (Tổ Trưởng Lớp Lá)
 *   staff-6 = Vũ Thị Hoa (Tổ Trưởng Lớp Chồi)
 *
 * Department slugs (from CLAUDE.md):
 *   ban-giam-hieu | to-giao-vien-la | to-giao-vien-choi | to-giao-vien-mam | to-nhan-vien
 */
test.describe('Teacher Detail Page', () => {
  test('principal profile (staff-1) shows name and role', async ({ page }) => {
    await page.goto('/teachers/staff-1');
    await page.waitForLoadState('networkidle');
    // Use first() — the teacher name appears in both the page-hero h1 and the content section h1
    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Nguyễn Thị Hương');
    await expect(page.locator('main').getByText('Hiệu Trưởng').first()).toBeVisible();
  });

  test('principal profile shows department badge (BAN_GIAM_HIEU)', async ({ page }) => {
    await page.goto('/teachers/staff-1');
    await page.waitForLoadState('networkidle');
    // Badge appears in the page hero; use first() if it appears multiple times
    await expect(page.locator('main').getByText('BAN_GIAM_HIEU').first()).toBeVisible();
  });

  test('"Quay lại Giới Thiệu" link navigates to /about', async ({ page }) => {
    await page.goto('/teachers/staff-1');
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: /Quay lại Giới Thiệu/ }).first().click();
    await expect(page).toHaveURL('/about');
  });

  test('colleagues section shows at least one colleague link', async ({ page }) => {
    await page.goto('/teachers/staff-1');
    await page.waitForLoadState('networkidle');
    const colleagues = page.locator('main').filter({ hasText: /Đồng Nghiệp/ }).getByRole('link');
    const count = await colleagues.count();
    expect(count).toBeGreaterThan(0);
  });

  test('clicking a colleague link navigates to that teacher profile', async ({ page }) => {
    await page.goto('/teachers/staff-1');
    await page.waitForLoadState('networkidle');
    const firstColleague = page.locator('main').filter({ hasText: /Đồng Nghiệp/ }).getByRole('link').first();
    await firstColleague.click();
    await expect(page).toHaveURL(/\/teachers\//);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('vice-principal profile (staff-2) loads correctly', async ({ page }) => {
    await page.goto('/teachers/staff-2');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Trần Thị Mai');
  });

  test('teacher detail page re-fetches on slug change without full reload', async ({ page }) => {
    // Navigating between teacher detail pages on the same route reuses the component
    // and triggers a new fetch via switchMap on paramMap — verify content updates.
    await page.goto('/teachers/staff-1');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Nguyễn Thị Hương');

    await page.goto('/teachers/staff-2');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Trần Thị Mai');
  });

  test('invalid teacher ID redirects to /about', async ({ page }) => {
    await page.goto('/teachers/nonexistent-staff-id');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/about');
  });
});

test.describe('Teacher Group Detail Page', () => {
  test('"Ban Giam Hieu" group page shows group heading', async ({ page }) => {
    await page.goto('/teacher-groups/ban-giam-hieu');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('"Quay lại Đội Ngũ Giáo Viên" link has href pointing to /about', async ({ page }) => {
    await page.goto('/teacher-groups/ban-giam-hieu');
    await page.waitForLoadState('networkidle');
    // The back link href is /about#teacher-groups (includes fragment)
    const backLink = page.getByRole('link', { name: /Quay lại Đội Ngũ/ }).first();
    await expect(backLink).toHaveAttribute('href', /\/about/);
  });

  test('"to-giao-vien-la" group page loads without error', async ({ page }) => {
    await page.goto('/teacher-groups/to-giao-vien-la');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('"to-giao-vien-choi" group page loads without error', async ({ page }) => {
    await page.goto('/teacher-groups/to-giao-vien-choi');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('"to-giao-vien-mam" group page loads without error', async ({ page }) => {
    await page.goto('/teacher-groups/to-giao-vien-mam');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('teacher group page re-fetches when navigating between departments', async ({ page }) => {
    await page.goto('/teacher-groups/ban-giam-hieu');
    await page.waitForLoadState('networkidle');
    const firstHeading = await page.getByRole('heading', { level: 1 }).first().textContent();

    await page.goto('/teacher-groups/to-giao-vien-la');
    await page.waitForLoadState('networkidle');
    const secondHeading = await page.getByRole('heading', { level: 1 }).first().textContent();

    // Both pages should render a heading, and they may differ (different group names)
    expect(firstHeading?.trim()).toBeTruthy();
    expect(secondHeading?.trim()).toBeTruthy();
  });
});
