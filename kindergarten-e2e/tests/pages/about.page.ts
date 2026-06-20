import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the About page (/about).
 * Sections: intro / school history timeline, management board, teacher groups, facilities.
 */
export class AboutPage {
  readonly page: Page;

  // Page hero
  readonly pageHero: Locator;

  // School intro section
  readonly introSection: Locator;

  // Management section (Ban Giam Hieu)
  readonly managementSection: Locator;
  readonly managementStaffLinks: Locator;

  // Teacher groups section
  readonly teacherGroupsSection: Locator;
  readonly teacherGroupLinks: Locator;
  readonly seeAllLinks: Locator;

  // Facilities section
  readonly facilitiesSection: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageHero = page.locator('main').getByRole('heading', { name: 'Giới Thiệu', level: 1 });

    this.introSection = page.locator('main').filter({ hasText: /Về Trường/ }).first();

    this.managementSection = page.locator('main').filter({ hasText: /Ban Giám Hiệu/ });
    this.managementStaffLinks = page.locator('main').getByRole('link').filter({ hasText: /Hiệu Trưởng|Phó Hiệu Trưởng/ });

    this.teacherGroupsSection = page.locator('main').filter({ hasText: /Đội Ngũ Giáo Viên/ });
    this.teacherGroupLinks = page.locator('main').getByRole('link').filter({ hasText: /Xem tất cả/ });
    this.seeAllLinks = page.getByRole('link').filter({ hasText: /Xem tất cả/ });

    this.facilitiesSection = page.locator('main').filter({ hasText: /Cơ Sở Vật Chất/ });
  }

  async goto() {
    await this.page.goto('/about');
    await this.page.waitForLoadState('networkidle');
  }
}
