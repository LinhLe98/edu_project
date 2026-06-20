import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the Library page (/library).
 * Sections: album browser with age-group tabs, learning materials grid.
 * Album Detail (/library/album/:id) is also covered here.
 */
export class LibraryPage {
  readonly page: Page;

  readonly pageHeading: Locator;

  // Age-group tab buttons
  readonly tabMamNon: Locator;   // 3 tuoi
  readonly tabChoi: Locator;     // 4 tuoi
  readonly tabLa: Locator;       // 5 tuoi

  readonly albumCards: Locator;
  readonly learningMaterialsSection: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageHeading = page.getByRole('heading', { name: 'Thư Viện', level: 1 });

    this.tabMamNon = page.getByRole('button', { name: /Lớp Mầm/ });
    this.tabChoi = page.getByRole('button', { name: /Lớp Chồi/ });
    this.tabLa = page.getByRole('button', { name: /Lớp Lá/ });

    this.albumCards = page.locator('main').getByRole('link').filter({ hasText: /ảnh/ });
    this.learningMaterialsSection = page.locator('main').filter({ hasText: /Học Liệu/ });
  }

  async goto() {
    await this.page.goto('/library');
    await this.page.waitForLoadState('networkidle');
  }

  async clickTab(ageGroup: 'mam' | 'choi' | 'la') {
    const tabs: Record<string, Locator> = {
      mam: this.tabMamNon,
      choi: this.tabChoi,
      la: this.tabLa,
    };
    await tabs[ageGroup].click();
  }
}

/**
 * Page Object for Album Detail (/library/album/:id).
 */
export class AlbumDetailPage {
  readonly page: Page;

  readonly albumTitle: Locator;
  readonly albumImages: Locator;
  readonly reactionButtons: Locator;
  readonly backToLibraryLink: Locator;
  readonly breadcrumbLibraryLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.albumTitle = page.getByRole('heading', { level: 1 });
    this.albumImages = page.locator('main img');
    this.reactionButtons = page.locator('main').filter({ hasText: /Cảm nhận/ }).getByRole('button');
    this.backToLibraryLink = page.getByRole('link', { name: /Quay lại Thư Viện/ });
    this.breadcrumbLibraryLink = page.locator('nav[aria-label], nav').getByRole('link', { name: 'Thư Viện' });
  }

  async goto(albumId: string) {
    await this.page.goto(`/library/album/${albumId}`);
    await this.page.waitForLoadState('networkidle');
  }
}
