import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the Activities page (/activities).
 * Sections: page hero, educational programs grid, activity album links.
 */
export class ActivitiesPage {
  readonly page: Page;

  readonly pageHeading: Locator;
  readonly programsSection: Locator;
  readonly programCards: Locator;
  readonly albumSection: Locator;
  readonly albumLinks: Locator;
  readonly seeFullLibraryLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageHeading = page.getByRole('heading', { name: 'Hoạt Động Giáo Dục', level: 1 });
    this.programsSection = page.locator('main').filter({ hasText: /Chương Trình Giáo Dục/ });
    this.programCards = page.locator('main').locator('section, div').filter({ hasText: /Chương Trình Giáo Dục/ }).locator('img').locator('..');
    this.albumSection = page.locator('main').filter({ hasText: /Album Ảnh Hoạt Động/ });
    this.albumLinks = page.locator('main').getByRole('link').filter({ hasText: /Lớp/ });
    this.seeFullLibraryLink = page.getByRole('link', { name: /Xem thư viện đầy đủ/ });
  }

  async goto() {
    await this.page.goto('/activities');
    await this.page.waitForLoadState('networkidle');
  }
}
