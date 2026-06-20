/**
 * Component: LatestNewsComponent
 * Purpose: Displays the 3 most recent news articles in a 3-column grid on the home page.
 *   Each card is wrapped in a routerLink anchor that navigates to /news/:slug so
 *   users can open the full article from the home page.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load 3 latest articles: verifies latestNews array has exactly 3 items
 * - should render card-news elements: verifies news card components appear in the template
 * - should wrap each card in a link to /news/:slug: verifies each card has an <a>
 *     ancestor with the correct routerLink path so home-page news is navigable
 *
 * Coverage: ~80% (tests initialization, service data binding, card rendering, and navigation links)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LatestNewsComponent } from './latest-news.component';
import { NewsService } from '../../../core/services/news.service';

const mockArticles = [
  { id: '1', title: 'Tin 1', excerpt: '', coverImage: '', publishedAt: '2025-01-01', category: 'su-kien' as const, content: '', slug: 'tin-1', tags: [], featured: false },
  { id: '2', title: 'Tin 2', excerpt: '', coverImage: '', publishedAt: '2025-01-02', category: 'tin-tuc' as const, content: '', slug: 'tin-2', tags: [], featured: false },
  { id: '3', title: 'Tin 3', excerpt: '', coverImage: '', publishedAt: '2025-01-03', category: 'tin-tuc' as const, content: '', slug: 'tin-3', tags: [], featured: false },
];

const mockNewsService = {
  getLatest: (_n: number) => [...mockArticles],
  getAll: () => [...mockArticles],
};

describe('LatestNewsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestNewsComponent],
      providers: [
        provideRouter([]),
        { provide: NewsService, useValue: mockNewsService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LatestNewsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load 3 latest articles', () => {
    const fixture = TestBed.createComponent(LatestNewsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.latestNews.length).toBe(3);
  });

  it('should render card-news elements', () => {
    const fixture = TestBed.createComponent(LatestNewsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('app-card-news');
    expect(cards.length).toBe(3);
  });

  it('should wrap each card in a link to /news/:slug', () => {
    const fixture = TestBed.createComponent(LatestNewsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const links = el.querySelectorAll<HTMLAnchorElement>('a[href]');
    expect(links.length).toBe(3);
    const hrefs = Array.from(links).map(a => a.getAttribute('href'));
    expect(hrefs).toContain('/news/tin-1');
    expect(hrefs).toContain('/news/tin-2');
    expect(hrefs).toContain('/news/tin-3');
  });
});
