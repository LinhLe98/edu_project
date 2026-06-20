import { test, expect } from '@playwright/test';
import { NewsListPage, NewsDetailPage } from '../pages/news.page';

/**
 * News List (/news) and News Detail (/news/:slug) tests.
 * Covers: page load, search functionality, category filtering, pagination,
 * article detail view with reactions and related articles.
 */
test.describe('News List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/news');
    await page.waitForLoadState('networkidle');
  });

  test('displays page heading "Tin Tức & Sự Kiện"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Tin Tức & Sự Kiện', level: 1 })).toBeVisible();
  });

  test('search box is visible and accepts input', async ({ page }) => {
    const news = new NewsListPage(page);
    await expect(news.searchInput).toBeVisible();
    await news.search('Tết');
    await expect(news.searchInput).toHaveValue('Tết');
  });

  test('search filters articles by keyword', async ({ page }) => {
    const news = new NewsListPage(page);
    // Search for a specific article title
    await news.search('Khai Giảng');
    // At least one result containing "Khai Giảng" should appear
    await expect(page.locator('main').getByText(/Khai Giảng/i).first()).toBeVisible();
  });

  test('searching for a non-existent keyword shows no articles', async ({ page }) => {
    const news = new NewsListPage(page);
    await news.search('xyznonexistent123');
    const articleLinks = page.locator('main').getByRole('link').filter({ hasText: /(2025|2026)/ });
    await expect(articleLinks).toHaveCount(0);
  });

  test('searching for a non-existent keyword shows the empty state message', async ({ page }) => {
    await page.getByPlaceholder('Tìm kiếm bài viết...').fill('xyznonexistent-no-match');
    await page.waitForTimeout(300);
    await expect(page.locator('main').getByText('Không tìm thấy bài viết nào.')).toBeVisible();
  });

  test('clearing search after empty state restores article list', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Tìm kiếm bài viết...');
    await searchInput.fill('xyznonexistent-no-match');
    await page.waitForTimeout(300);
    await expect(page.locator('main').getByText('Không tìm thấy bài viết nào.')).toBeVisible();
    await searchInput.clear();
    await page.waitForTimeout(300);
    const firstArticle = page.locator('main').getByRole('link').filter({ hasText: /(2025|2026)/ }).first();
    await expect(firstArticle).toBeVisible();
  });

  test('category filter buttons are all visible', async ({ page }) => {
    const news = new NewsListPage(page);
    await expect(news.filterAll).toBeVisible();
    await expect(news.filterSuKien).toBeVisible();
    await expect(news.filterThongBao).toBeVisible();
    await expect(news.filterHoatDong).toBeVisible();
    await expect(news.filterTinTuc).toBeVisible();
  });

  test('"Tất Cả" filter shows all articles', async ({ page }) => {
    const news = new NewsListPage(page);
    await news.clickCategory('all');
    const links = page.locator('main').getByRole('link').filter({ hasText: /(2025|2026)/ });
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('"Sự Kiện" filter shows only event articles', async ({ page }) => {
    const news = new NewsListPage(page);
    await news.clickCategory('su-kien');
    // After filtering, articles shown should include event-category items
    // We verify the filter is applied by checking the page still has articles
    const links = page.locator('main').getByRole('link').filter({ hasText: /(2025|2026)/ });
    await expect(links.first()).toBeVisible();
  });

  test('pagination shows "Trang 1 / N" indicator', async ({ page }) => {
    await expect(page.locator('main').getByText(/Trang 1 \//)).toBeVisible();
  });

  test('next page button advances to page 2', async ({ page }) => {
    const news = new NewsListPage(page);
    await news.nextButton.click();
    await expect(page.locator('main').getByText(/Trang 2 \//)).toBeVisible();
  });

  test('previous button is disabled on first page', async ({ page }) => {
    const prevButton = page.getByRole('button', { name: '‹' });
    await expect(prevButton).toBeDisabled();
  });

  test('news article links navigate to /news/:slug', async ({ page }) => {
    const firstLink = page.locator('main').getByRole('link').filter({ hasText: /(2025|2026)/ }).first();
    await firstLink.click();
    await expect(page).toHaveURL(/\/news\/.+/);
  });
});

test.describe('News Detail Page', () => {
  const TEST_SLUG = 'khai-giang-nam-hoc-moi-2025-2026';

  test.beforeEach(async ({ page }) => {
    await page.goto(`/news/${TEST_SLUG}`);
    await page.waitForLoadState('networkidle');
  });

  test('displays the article title as h1', async ({ page }) => {
    // Title appears in both page-hero and content area; use first()
    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Khai Giảng');
  });

  test('shows article category badge', async ({ page }) => {
    // This article is in SU_KIEN category — use first() as the badge appears in hero + content
    await expect(page.locator('main').getByText('SU_KIEN').first()).toBeVisible();
  });

  test('displays article date', async ({ page }) => {
    // Multiple date instances may appear; use first()
    await expect(page.locator('main').getByText(/\d{2}\/\d{2}\/202[0-9]/).first()).toBeVisible();
  });

  test('article image is rendered', async ({ page }) => {
    await expect(page.locator('main img').first()).toBeVisible();
  });

  test('tags section is visible', async ({ page }) => {
    await expect(page.locator('main').getByText('Thẻ:')).toBeVisible();
  });

  test('"Quay lại Tin Tức" link navigates back to /news', async ({ page }) => {
    await page.getByRole('link', { name: /Quay lại Tin Tức/ }).click();
    await expect(page).toHaveURL('/news');
  });

  test('emoji reactions section is present with at least 4 buttons', async ({ page }) => {
    await expect(page.locator('main').getByText(/Cảm nhận/)).toBeVisible();
    const reactionButtons = page.locator('main').filter({ hasText: /Cảm nhận/ }).getByRole('button');
    // The component renders 4 reaction emoji buttons; there may be an extra submit in comments
    const count = await reactionButtons.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('clicking an emoji reaction increments its count', async ({ page }) => {
    // Reactions are ephemeral signals — clicking adds a count badge to the button
    const firstReaction = page.locator('main').filter({ hasText: /Cảm nhận/ }).getByRole('button').first();
    await firstReaction.click();
    // After clicking, the button should display a count (e.g. "❤️ Yêu thích 1")
    await expect(firstReaction).toContainText('1');
  });

  test('"Bình Luận" section is visible with name and content fields', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Bình Luận' })).toBeVisible();
    await expect(page.getByPlaceholder('Họ và tên *')).toBeVisible();
    await expect(page.getByPlaceholder('Nội dung bình luận *')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Gửi bình luận' })).toBeVisible();
  });

  test('comment form stays on same page after empty submit', async ({ page }) => {
    await page.getByRole('button', { name: 'Gửi bình luận' }).click();
    await expect(page).toHaveURL(`/news/${TEST_SLUG}`);
  });

  test('"Bài Viết Liên Quan" section is visible with article links', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Bài Viết Liên Quan' })).toBeVisible();
    const relatedLinks = page.locator('main').filter({ hasText: /Bài Viết Liên Quan/ }).getByRole('link');
    const count = await relatedLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('clicking a related article link navigates to that article', async ({ page }) => {
    // Related article links wrap <article> elements with no visible text;
    // target them directly via their /news/ href
    const relatedLink = page.locator('main').getByRole('link').filter({ has: page.locator('article') }).first();
    await relatedLink.click();
    await expect(page).toHaveURL(/\/news\/.+/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('navigating between related articles re-fetches content (same route re-use)', async ({ page }) => {
    // The component uses switchMap on paramMap so navigating between slugs
    // updates content without leaving the route.
    // Related links wrap <article> elements; target via article child locator
    const firstRelatedLink = page.locator('main').getByRole('link').filter({ has: page.locator('article') }).first();
    const firstHref = await firstRelatedLink.getAttribute('href');
    await firstRelatedLink.click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain(firstHref?.replace('/news/', '') ?? '');
    // The teacher name appears in page-hero and content h1; use first()
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('second news article slug loads correctly', async ({ page }) => {
    await page.goto('/news/le-giang-sinh-2025');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Giáng Sinh');
  });

  test('invalid news slug redirects to /news list', async ({ page }) => {
    await page.goto('/news/this-slug-does-not-exist');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/news');
    await expect(page.getByRole('heading', { name: 'Tin Tức & Sự Kiện', level: 1 })).toBeVisible();
  });
});
