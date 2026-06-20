import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the Teacher Detail page (/teachers/:id).
 * Shows individual staff profile: name, role, bio, credentials, colleagues.
 */
export class TeacherDetailPage {
  readonly page: Page;

  readonly teacherName: Locator;
  readonly teacherRole: Locator;
  readonly backToAboutLink: Locator;
  readonly colleaguesSection: Locator;
  readonly colleagueLinks: Locator;

  constructor(page: Page) {
    this.page = page;

    this.teacherName = page.getByRole('heading', { level: 1 });
    this.teacherRole = page.locator('main').locator('p').first();
    this.backToAboutLink = page.getByRole('link', { name: /Quay lại Giới Thiệu/ });
    this.colleaguesSection = page.locator('main').getByRole('heading', { name: /Đồng Nghiệp/ });
    this.colleagueLinks = page.locator('main').filter({ hasText: /Đồng Nghiệp/ }).getByRole('link');
  }

  async goto(staffId: string) {
    await this.page.goto(`/teachers/${staffId}`);
    await this.page.waitForLoadState('networkidle');
  }
}

/**
 * Page Object for the Teacher Group page (/teacher-groups/:dept).
 * Shows full roster for one department.
 *
 * Department slug values (from CLAUDE.md):
 *   ban-giam-hieu | to-giao-vien-la | to-giao-vien-choi | to-giao-vien-mam | to-nhan-vien
 */
export class TeacherGroupDetailPage {
  readonly page: Page;

  readonly pageHeading: Locator;
  readonly backToTeachersLink: Locator;
  readonly staffCards: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageHeading = page.getByRole('heading', { level: 1 });
    this.backToTeachersLink = page.getByRole('link', { name: /Quay lại Đội Ngũ/ });
    this.staffCards = page.locator('main').getByRole('link').filter({ hasText: /Giáo viên|Trưởng|Phó/ });
  }

  async goto(dept: string) {
    await this.page.goto(`/teacher-groups/${dept}`);
    await this.page.waitForLoadState('networkidle');
  }
}
