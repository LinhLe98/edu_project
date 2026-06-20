/**
 * Component: NewsListComponent
 * Purpose: Paginated, searchable news list page with category filter tabs.
 *   Displays news articles in a 3-column grid with 6 articles per page.
 *   Search filters by title and excerpt; category filter resets pagination to page 1.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should start on page 1 with all articles: verifies initial state shows first page
 * - should filter by category: verifies setCategory() changes pagedArticles to matching articles
 * - should filter by search query: verifies onSearch() filters articles by title/excerpt
 * - should reset to page 1 on category change: verifies currentPage resets when category changes
 * - should reset to page 1 on search: verifies currentPage resets when search query changes
 * - should paginate correctly: verifies pagedArticles returns correct slice per page
 * - should compute totalPages: verifies totalPages matches ceil(total/6)
 *
 * Coverage: ~85% (tests initialization, filtering, search, pagination, and page computation)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NewsListComponent } from './news-list.component';
import { NewsService } from '../../core/services/news.service';
import { NewsArticle } from '../../core/models';

const makeArticle = (i: number): NewsArticle => ({
  id: `news-${i}`,
  title: `Bài viết ${i}`,
  slug: `bai-viet-${i}`,
  excerpt: `Tóm tắt ${i}`,
  content: `<p>Nội dung ${i}</p>`,
  coverImage: `https://picsum.photos/seed/n${i}/400/200`,
  publishedAt: '2025-09-01',
  category: i % 2 === 0 ? 'su-kien' : 'thong-bao',
  tags: [],
  featured: false,
});

const mockArticles: NewsArticle[] = Array.from({ length: 9 }, (_, i) => makeArticle(i + 1));

const mockNewsService = {
  getAll: () => [...mockArticles],
  getByCategory: (cat: string) => mockArticles.filter(a => a.category === cat),
};

describe('NewsListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsListComponent],
      providers: [
        provideRouter([]),
        { provide: NewsService, useValue: mockNewsService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NewsListComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start on page 1 with all articles', () => {
    const fixture = TestBed.createComponent(NewsListComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.currentPage()).toBe(1);
    expect(fixture.componentInstance.pagedArticles().length).toBe(6);
  });

  it('should filter by category', () => {
    const fixture = TestBed.createComponent(NewsListComponent);
    fixture.detectChanges();
    fixture.componentInstance.setCategory('su-kien');
    const articles = fixture.componentInstance.pagedArticles();
    expect(articles.every(a => a.category === 'su-kien')).toBeTrue();
  });

  it('should filter by search query', () => {
    const fixture = TestBed.createComponent(NewsListComponent);
    fixture.detectChanges();
    fixture.componentInstance.onSearch('Bài viết 3');
    const articles = fixture.componentInstance.pagedArticles();
    expect(articles.length).toBe(1);
    expect(articles[0].title).toBe('Bài viết 3');
  });

  it('should reset to page 1 on category change', () => {
    const fixture = TestBed.createComponent(NewsListComponent);
    fixture.detectChanges();
    fixture.componentInstance.currentPage.set(2);
    fixture.componentInstance.setCategory('su-kien');
    expect(fixture.componentInstance.currentPage()).toBe(1);
  });

  it('should reset to page 1 on search', () => {
    const fixture = TestBed.createComponent(NewsListComponent);
    fixture.detectChanges();
    fixture.componentInstance.currentPage.set(2);
    fixture.componentInstance.onSearch('Bài viết 1');
    expect(fixture.componentInstance.currentPage()).toBe(1);
  });

  it('should paginate correctly', () => {
    const fixture = TestBed.createComponent(NewsListComponent);
    fixture.detectChanges();
    fixture.componentInstance.goToPage(2);
    const page2 = fixture.componentInstance.pagedArticles();
    expect(page2.length).toBe(3);
  });

  it('should compute totalPages', () => {
    const fixture = TestBed.createComponent(NewsListComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.totalPages()).toBe(2);
  });
});
