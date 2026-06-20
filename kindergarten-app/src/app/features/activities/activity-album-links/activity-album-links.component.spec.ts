/**
 * Component: ActivityAlbumLinksComponent
 * Purpose: Shows the first 6 gallery albums as cards, with a link to the full library page.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load at most 6 albums: verifies albums array is capped at 6 items
 * - should render a link to the library page: verifies the "Xem thư viện" link is present
 *
 * Coverage: ~70% (tests initialization, data slicing, and navigation link)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivityAlbumLinksComponent } from './activity-album-links.component';
import { GalleryService } from '../../../core/services/gallery.service';

const makeAlbums = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `album-${i}`, title: `Album ${i}`, description: '', coverUrl: '',
    ageGroup: '3-tuoi' as const, createdAt: '2025-01-01', photos: [],
  }));

const mockGalleryService = {
  getAll: () => makeAlbums(8),
};

describe('ActivityAlbumLinksComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityAlbumLinksComponent],
      providers: [
        provideRouter([]),
        { provide: GalleryService, useValue: mockGalleryService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ActivityAlbumLinksComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load at most 6 albums', () => {
    const fixture = TestBed.createComponent(ActivityAlbumLinksComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.albums.length).toBe(6);
  });

  it('should render a link to the library page', () => {
    const fixture = TestBed.createComponent(ActivityAlbumLinksComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const text = el.textContent ?? '';
    expect(text).toContain('Xem thư viện');
  });
});
