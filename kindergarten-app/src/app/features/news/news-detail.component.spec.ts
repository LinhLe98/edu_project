/**
 * Component: NewsDetailComponent
 * Purpose: Displays a single news article identified by route :slug param.
 *   Renders article content safely via DomSanitizer, shows related articles
 *   from the same category, and redirects to /news when slug is not found.
 *   Reactions and comments are backed by real API calls via NewsService.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load article from route param on init
 * - should redirect to /news when slug not found
 * - should expose correct categoryLabel (slug-based mapping)
 * - should expose formattedDate in dd/MM/yyyy format from ISO offset string
 * - should have 4 reactions initialized from API
 * - should call toggleReaction on react()
 * - should call postComment on submitComment()
 * - should not call postComment when name or text is empty
 */
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NewsDetailComponent } from './news-detail.component';
import { NewsService } from '../../core/services/news.service';
import type { NewsArticle } from '../../core/models';

const mockArticle: NewsArticle = {
  id: 'news-1',
  title: 'Lễ Khai Giảng',
  slug: 'le-khai-giang',
  excerpt: 'Tóm tắt',
  content: '<p>Nội dung</p>',
  coverImage: 'https://picsum.photos/seed/test/800/400',
  publishedAt: '2025-09-05T08:00:00+07:00',
  category: 'su-kien',
  tags: ['khai-giang'],
  featured: true,
};

const mockRelated: NewsArticle = {
  id: 'news-2',
  title: 'Sự kiện khác',
  slug: 'su-kien-khac',
  excerpt: 'Tóm tắt 2',
  content: '<p>Nội dung 2</p>',
  coverImage: 'https://picsum.photos/seed/test2/800/400',
  publishedAt: '2025-09-10T08:00:00+07:00',
  category: 'su-kien',
  tags: [],
  featured: false,
};

const mockNewsService = {
  getBySlug: (slug: string) => slug === 'le-khai-giang' ? of(mockArticle) : throwError(() => new Error('not found')),
  getAll: () => of([mockArticle, mockRelated]),
  getComments: () => of([]),
  getReactions: () => of({ reactions: { heart: 2, 'thumbs-up': 0 } }),
  postComment: () => of({ id: 1, authorName: 'Test', message: 'Hello', createdAt: '2025-09-05T08:00:00+07:00' }),
  toggleReaction: (slug: string, reaction: string, reacted: boolean) =>
    of({ reactions: { heart: reacted ? 1 : 3, 'thumbs-up': 0 } }),
};

const mockRoute = {
  paramMap: of(convertToParamMap({ slug: 'le-khai-giang' })),
};

describe('NewsDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsDetailComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: NewsService, useValue: mockNewsService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NewsDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load article from route param on init', fakeAsync(() => {
    const fixture = TestBed.createComponent(NewsDetailComponent);
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.article()).toEqual(mockArticle);
  }));

  it('should redirect to /news when slug not found', fakeAsync(() => {
    const notFoundRoute = { paramMap: of(convertToParamMap({ slug: 'does-not-exist' })) };
    TestBed.overrideProvider(ActivatedRoute, { useValue: notFoundRoute });
    const fixture = TestBed.createComponent(NewsDetailComponent);
    const router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate');
    fixture.detectChanges();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/news']);
  }));

  it('should expose correct categoryLabel for slug-based category', fakeAsync(() => {
    const fixture = TestBed.createComponent(NewsDetailComponent);
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.categoryLabel).toBe('Sự Kiện');
  }));

  it('should expose formattedDate from ISO offset string', fakeAsync(() => {
    const fixture = TestBed.createComponent(NewsDetailComponent);
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.formattedDate).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  }));

  it('should load reactions from API on article load', fakeAsync(() => {
    const fixture = TestBed.createComponent(NewsDetailComponent);
    fixture.detectChanges();
    tick();
    const reactions = fixture.componentInstance.reactions();
    expect(reactions.length).toBe(4);
    // heart should have count 2 from the mock API
    const heartReaction = reactions.find(r => r.type === 'heart');
    expect(heartReaction?.count).toBe(2);
  }));

  it('should call toggleReaction on react() and update counts', fakeAsync(() => {
    const fixture = TestBed.createComponent(NewsDetailComponent);
    fixture.detectChanges();
    tick();
    const spy = vi.spyOn(mockNewsService, 'toggleReaction');
    fixture.componentInstance.react(0); // heart, index 0
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('should call postComment and show success message', fakeAsync(() => {
    const fixture = TestBed.createComponent(NewsDetailComponent);
    fixture.detectChanges();
    tick();
    fixture.componentInstance.commentName = 'Phụ huynh A';
    fixture.componentInstance.commentText = 'Bài viết rất hay!';
    const spy = vi.spyOn(mockNewsService, 'postComment');
    fixture.componentInstance.submitComment();
    tick();
    expect(spy).toHaveBeenCalled();
    expect(fixture.componentInstance.commentSuccess).toBe(true);
  }));

  it('should not call postComment when name or text is empty', fakeAsync(() => {
    const fixture = TestBed.createComponent(NewsDetailComponent);
    fixture.detectChanges();
    tick();
    const spy = vi.spyOn(mockNewsService, 'postComment');
    fixture.componentInstance.commentName = '';
    fixture.componentInstance.commentText = 'Nội dung';
    fixture.componentInstance.submitComment();
    fixture.componentInstance.commentName = 'Tên';
    fixture.componentInstance.commentText = '';
    fixture.componentInstance.submitComment();
    expect(spy).not.toHaveBeenCalled();
  }));
});
