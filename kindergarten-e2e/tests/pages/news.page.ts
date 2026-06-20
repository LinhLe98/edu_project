import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the News List page (/news).
 * Features: search box, category filter buttons, paginated article cards.
 */
export class NewsListPage {
  readonly page: Page;

  readonly pageHeading: Locator;
  readonly searchInput: Locator;

  // Category filter buttons
  readonly filterAll: Locator;
  readonly filterSuKien: Locator;   // Events
  readonly filterThongBao: Locator; // Announcements
  readonly filterHoatDong: Locator; // Activities
  readonly filterTinTuc: Locator;   // News

  // Article list
  readonly articleLinks: Locator;

  // Pagination
  readonly paginationButtons: Locator;
  readonly prevButton: Locator;
  readonly nextButton: Locator;
  readonly pageInfo: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageHeading = page.getByRole('heading', { name: 'Tin Tức & Sự Kiện', level: 1 });
    this.searchInput = page.getByRole('textbox', { name: /Tìm kiếm/ });

    this.filterAll = page.getByRole('button', { name: 'Tất Cả' });
    this.filterSuKien = page.getByRole('button', { name: 'Sự Kiện' });
    this.filterThongBao = page.getByRole('button', { name: 'Thông Báo' });
    this.filterHoatDong = page.getByRole('button', { name: 'Hoạt Động' });
    this.filterTinTuc = page.getByRole('button', { name: 'Tin Tức' });

    this.articleLinks = page.locator('main').getByRole('link').filter({ hasText: /(2025|2026)/ });

    this.paginationButtons = page.locator('main').getByRole('button').filter({ hasText: /[0-9]|›|‹/ });
    this.prevButton = page.getByRole('button', { name: '‹' });
    this.nextButton = page.getByRole('button', { name: '›' });
    this.pageInfo = page.locator('main').locator('text=/Trang [0-9]/');
  }

  async goto() {
    await this.page.goto('/news');
    await this.page.waitForLoadState('networkidle');
  }

  async search(query: string) {
    await this.searchInput.clear();
    await this.searchInput.fill(query);
  }

  async clickCategory(category: 'all' | 'su-kien' | 'thong-bao' | 'hoat-dong' | 'tin-tuc') {
    const buttons: Record<string, Locator> = {
      'all': this.filterAll,
      'su-kien': this.filterSuKien,
      'thong-bao': this.filterThongBao,
      'hoat-dong': this.filterHoatDong,
      'tin-tuc': this.filterTinTuc,
    };
    await buttons[category].click();
  }
}

/**
 * Page Object for the News Detail page (/news/:slug).
 * Features: article content, tags, emoji reactions, comments, related articles.
 */
export class NewsDetailPage {
  readonly page: Page;

  readonly articleHeading: Locator;
  readonly backToNewsLink: Locator;
  readonly articleImage: Locator;
  readonly tagList: Locator;
  readonly reactionButtons: Locator;
  readonly commentsSection: Locator;
  readonly relatedArticlesSection: Locator;
  readonly relatedArticleLinks: Locator;

  constructor(page: Page) {
    this.page = page;

    this.articleHeading = page.getByRole('heading', { level: 1 });
    this.backToNewsLink = page.getByRole('link', { name: /Quay lại Tin Tức/ });
    this.articleImage = page.locator('main img').first();
    this.tagList = page.locator('main').filter({ hasText: /Thẻ:/ });
    this.reactionButtons = page.locator('main').filter({ hasText: /Cảm nhận/ }).getByRole('button');
    this.commentsSection = page.locator('main').getByRole('heading', { name: 'Bình Luận' });
    this.relatedArticlesSection = page.locator('main').getByRole('heading', { name: 'Bài Viết Liên Quan' });
    this.relatedArticleLinks = page.locator('main').filter({ hasText: /Bài Viết Liên Quan/ }).getByRole('link');
  }

  async goto(slug: string) {
    await this.page.goto(`/news/${slug}`);
    await this.page.waitForLoadState('networkidle');
  }
}
