import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the Home page (/).
 * Contains: hero slideshow, statistics bar, about section, teacher highlights,
 * news section, and a CTA registration banner.
 */
export class HomePage {
  readonly page: Page;

  // Hero section
  readonly heroSection: Locator;
  readonly heroHeadings: Locator;

  // Stats bar (numbers shown beneath the hero)
  readonly statsBar: Locator;

  // About preview section
  readonly aboutSection: Locator;
  readonly learnMoreLink: Locator;
  readonly contactNowLink: Locator;

  // Teacher highlights
  readonly teacherSection: Locator;
  readonly teacherCards: Locator;
  readonly seeAllTeachersLink: Locator;

  // News preview section
  readonly newsSection: Locator;
  readonly newsArticles: Locator;

  // CTA registration banner
  readonly ctaBanner: Locator;
  readonly ctaRegisterLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heroSection = page.locator('main').first();
    this.heroHeadings = page.locator('main').getByRole('heading', { level: 2 }).first();

    this.statsBar = page.locator('main').locator('section, div').filter({ hasText: /Năm thành lập/ }).first();

    this.aboutSection = page.locator('main').filter({ hasText: /Về Trường Mầm Non Ánh Dương/ });
    this.learnMoreLink = page.getByRole('link', { name: 'Tìm hiểu thêm' }).first();
    this.contactNowLink = page.getByRole('link', { name: 'Liên hệ ngay' }).first();

    this.teacherSection = page.locator('main').filter({ hasText: /Đội Ngũ Giáo Viên/ });
    this.teacherCards = page.locator('main').getByRole('link').filter({ hasText: /Hiệu Trưởng|Phó Hiệu Trưởng|Tổ Trưởng/ });
    this.seeAllTeachersLink = page.getByRole('link', { name: /Xem tất cả giáo viên/ });

    this.newsSection = page.locator('main').filter({ hasText: /Tin Tức & Sự Kiện/ });
    this.newsArticles = page.locator('main article');

    this.ctaBanner = page.locator('main').filter({ hasText: /Đăng Ký Năm Học/ });
    this.ctaRegisterLink = page.getByRole('link', { name: 'Đăng ký ngay' });
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }
}
