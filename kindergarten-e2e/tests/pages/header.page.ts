import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the shared sticky header / navigation present on every page.
 * The header contains the school logo and all primary nav links.
 */
export class HeaderPage {
  readonly page: Page;

  // Logo / home link
  readonly logo: Locator;

  // Primary navigation links
  readonly navHome: Locator;
  readonly navAbout: Locator;
  readonly navActivities: Locator;
  readonly navLibrary: Locator;
  readonly navNews: Locator;
  readonly navContact: Locator;
  readonly navRegister: Locator;

  constructor(page: Page) {
    this.page = page;
    const nav = page.locator('header nav');

    this.logo = page.locator('header').getByRole('link', { name: /Ánh Dương/ });

    this.navHome = nav.getByRole('link', { name: 'Trang Chủ' });
    this.navAbout = nav.getByRole('link', { name: 'Giới Thiệu' });
    this.navActivities = nav.getByRole('link', { name: 'Hoạt Động' });
    this.navLibrary = nav.getByRole('link', { name: 'Thư Viện' });
    this.navNews = nav.getByRole('link', { name: 'Tin Tức' });
    this.navContact = nav.getByRole('link', { name: 'Liên Hệ' });
    this.navRegister = nav.getByRole('link', { name: 'Đăng Ký' });
  }

  async clickHome() {
    await this.navHome.click();
  }

  async clickAbout() {
    await this.navAbout.click();
  }

  async clickActivities() {
    await this.navActivities.click();
  }

  async clickLibrary() {
    await this.navLibrary.click();
  }

  async clickNews() {
    await this.navNews.click();
  }

  async clickContact() {
    await this.navContact.click();
  }

  async clickRegister() {
    await this.navRegister.click();
  }
}
