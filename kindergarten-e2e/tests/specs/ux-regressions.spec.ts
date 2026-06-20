import { test, expect } from '@playwright/test';

/**
 * UX regression tests — captures specific issues found during UX audit.
 *
 * Issues covered:
 *   1. Nav active state on /teachers/:id and /teacher-groups/:dept highlights "Giới Thiệu"
 *   2. Comment form: required attribute present on name and content fields
 *   3. News empty state text "Không tìm thấy bài viết nào." renders when search has no results
 *   4. Invalid album ID shows friendly error state, not a blank/crashed page
 *   5. Invalid news slug redirects to /news (not a blank page)
 *   6. Invalid teacher ID redirects to /about
 *   7. Album detail breadcrumb shows "..." for unknown album IDs
 *   8. Nav active state correct on nested library routes (/library/album/:id)
 */

/**
 * Helper: returns true when a nav link has the active CSS state applied.
 * Active links get non-prefixed "text-peach-500 bg-peach-50" appended to their
 * class list. Inactive links only have the hover variants "hover:text-peach-500
 * hover:bg-peach-50". We detect activity by checking for the non-hover form.
 */
function hasActiveClass(classes: string | null): boolean {
  if (!classes) return false;
  // Split on whitespace and look for the bare (non-prefixed) tokens
  const tokens = classes.split(/\s+/);
  return tokens.includes('text-peach-500') && tokens.includes('bg-peach-50');
}

test.describe('Navigation active state', () => {
  test('"Giới Thiệu" nav link is highlighted on /teachers/:id', async ({ page }) => {
    await page.goto('/teachers/staff-1');
    await page.waitForLoadState('networkidle');

    const aboutLink = page.locator('header').getByRole('link', { name: 'Giới Thiệu' });
    const activeClass = await aboutLink.getAttribute('class');
    expect(hasActiveClass(activeClass)).toBe(true);
  });

  test('"Giới Thiệu" nav link is highlighted on /teacher-groups/:dept', async ({ page }) => {
    await page.goto('/teacher-groups/ban-giam-hieu');
    await page.waitForLoadState('networkidle');

    const aboutLink = page.locator('header').getByRole('link', { name: 'Giới Thiệu' });
    const activeClass = await aboutLink.getAttribute('class');
    expect(hasActiveClass(activeClass)).toBe(true);
  });

  test('"Thư Viện" nav link is active on /library/album/:id (correct parent-route highlighting)', async ({ page }) => {
    await page.goto('/library/album/album-1');
    await page.waitForLoadState('networkidle');

    const libraryLink = page.locator('header').getByRole('link', { name: 'Thư Viện' });
    const activeClass = await libraryLink.getAttribute('class');
    expect(hasActiveClass(activeClass)).toBe(true);
  });

  test('"Tin Tức" nav link is active on /news/:slug', async ({ page }) => {
    await page.goto('/news/khai-giang-nam-hoc-moi-2025-2026');
    await page.waitForLoadState('networkidle');

    const newsLink = page.locator('header').getByRole('link', { name: 'Tin Tức' });
    const activeClass = await newsLink.getAttribute('class');
    expect(hasActiveClass(activeClass)).toBe(true);
  });
});

test.describe('Comment form validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/news/khai-giang-nam-hoc-moi-2025-2026');
    await page.waitForLoadState('networkidle');
  });

  test('comment form submit button is present and clickable', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: 'Gửi bình luận' });
    await expect(submitBtn).toBeVisible();
  });

  test('comment name field has native required attribute', async ({ page }) => {
    const nameField = page.getByPlaceholder('Họ và tên *');
    const isRequired = await nameField.getAttribute('required');
    expect(isRequired).not.toBeNull();
  });

  test('submitting empty comment form does not navigate away', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: 'Gửi bình luận' });
    await submitBtn.click();
    // Regardless of validation behavior, user should stay on the same page
    await expect(page).toHaveURL(/\/news\/khai-giang-nam-hoc-moi-2025-2026/);
  });

  test('comment form accepts name and content input', async ({ page }) => {
    const nameField = page.getByPlaceholder('Họ và tên *');
    const contentField = page.getByPlaceholder('Nội dung bình luận *');

    await nameField.fill('Test Parent');
    await contentField.fill('Bình luận thử nghiệm.');

    await expect(nameField).toHaveValue('Test Parent');
    await expect(contentField).toHaveValue('Bình luận thử nghiệm.');
  });
});

test.describe('Error states and empty states', () => {
  test('invalid album ID shows friendly "Không tìm thấy album này." message', async ({ page }) => {
    await page.goto('/library/album/nonexistent-album-id');
    await page.waitForLoadState('networkidle');

    // Should NOT redirect — stays on the album URL with error state
    await expect(page).toHaveURL(/\/library\/album\/nonexistent-album-id/);
    await expect(page.locator('main').getByText('Không tìm thấy album này.')).toBeVisible();
  });

  test('invalid album ID error state has "Quay lại Thư Viện" recovery link', async ({ page }) => {
    await page.goto('/library/album/nonexistent-album-id');
    await page.waitForLoadState('networkidle');

    // The back element is a <button> or <a> — match both
    const backEl = page.locator('main').getByText(/Quay lại Thư Viện/);
    await expect(backEl).toBeVisible();
    await backEl.click();
    await expect(page).toHaveURL('/library');
  });

  test('invalid album ID breadcrumb shows fallback "..." instead of album name', async ({ page }) => {
    // Documents current behavior: unknown album shows "..." in breadcrumb trail.
    // Ideally it might show "Album not found" but "..." is acceptable over a crash.
    await page.goto('/library/album/nonexistent-album-id');
    await page.waitForLoadState('networkidle');

    const breadcrumb = page.locator('main nav');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText('...');
  });

  test('invalid news slug redirects to /news list page', async ({ page }) => {
    await page.goto('/news/slug-that-does-not-exist');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/news');
    // Landing page should be the news listing
    await expect(page.getByRole('heading', { name: 'Tin Tức & Sự Kiện', level: 1 })).toBeVisible();
  });

  test('invalid activity slug redirects to /activities page', async ({ page }) => {
    await page.goto('/activities/slug-that-does-not-exist');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/activities');
    await expect(page.getByRole('heading', { name: 'Hoạt Động Giáo Dục', level: 1 })).toBeVisible();
  });

  test('invalid teacher ID redirects to /about page', async ({ page }) => {
    await page.goto('/teachers/nonexistent-teacher-id');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/about');
  });

  test('news search empty state shows "Không tìm thấy bài viết nào." message', async ({ page }) => {
    await page.goto('/news');
    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder('Tìm kiếm bài viết...').fill('xyzzy-no-match-12345');
    // Allow client-side filter to apply
    await page.waitForTimeout(300);

    await expect(page.locator('main').getByText('Không tìm thấy bài viết nào.')).toBeVisible();
  });

  test('clearing news search after empty state restores article list', async ({ page }) => {
    await page.goto('/news');
    await page.waitForLoadState('networkidle');

    const searchInput = page.getByPlaceholder('Tìm kiếm bài viết...');
    await searchInput.fill('xyzzy-no-match-12345');
    await page.waitForTimeout(300);
    await expect(page.locator('main').getByText('Không tìm thấy bài viết nào.')).toBeVisible();

    // Clear the search
    await searchInput.clear();
    await page.waitForTimeout(300);

    // Articles should reappear
    const firstArticle = page.locator('main').getByRole('link').filter({ hasText: /(2025|2026)/ }).first();
    await expect(firstArticle).toBeVisible();
  });
});

test.describe('Console errors on page load', () => {
  test('home page loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('about page loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('activities page loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/activities');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('contact page loads without Angular errors (Google Maps 400 may still appear in CI)', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Google Maps embed may return 400 in headless/CI environments (API key origin restriction).
    // Angular errors (NG prefix) should be zero after the NgFor fix.
    const angularErrors = errors.filter(e => /\bNG\d{4}\b/.test(e));
    expect(angularErrors).toHaveLength(0);
  });

  test('news list page loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/news');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('library page loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/library');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });
});
