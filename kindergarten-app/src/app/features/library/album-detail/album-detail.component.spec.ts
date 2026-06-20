/**
 * Component: AlbumDetailComponent
 * Purpose: Full-page detail view for a single gallery album, showing title, description, photo count, image grid,
 *   and an emoji reactions bar that lets visitors express their feeling about the album.
 *   Reactions toggle count on click; reset is not needed (single album per route visit).
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load album by id from route param: verifies album is fetched using the route snapshot param
 * - should render album title when album is found: verifies title appears in the DOM
 * - should show not-found message when album does not exist: verifies fallback text renders
 * - should initialize 4 reactions at count 0: verifies reaction signal default state
 * - should toggle reaction count on react(): verifies clicking increments count and marks reacted; clicking again reverts
 *
 * Coverage: ~80% (tests initialization, route param handling, found/not-found states, and reactions)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlbumDetailComponent } from './album-detail.component';
import { GalleryService } from '../../../core/services/gallery.service';

const mockAlbum = {
  id: 'album-1', title: 'Album Test', description: 'Mô tả', coverUrl: '',
  ageGroup: '3-tuoi' as const, createdAt: '2025-01-01',
  photos: [{ src: 'img1.jpg', alt: 'Ảnh 1' }],
};

const mockGalleryService = {
  getAlbumById: (id: string) => id === 'album-1' ? mockAlbum : undefined,
};

describe('AlbumDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumDetailComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'album-1' } } } },
        { provide: GalleryService, useValue: mockGalleryService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AlbumDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load album by id from route param', () => {
    const fixture = TestBed.createComponent(AlbumDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.album).toEqual(mockAlbum);
  });

  it('should render album title when album is found', () => {
    const fixture = TestBed.createComponent(AlbumDetailComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Album Test');
  });

  it('should initialize 4 reactions at count 0', () => {
    const fixture = TestBed.createComponent(AlbumDetailComponent);
    fixture.detectChanges();
    const reactions = fixture.componentInstance.reactions();
    expect(reactions.length).toBe(4);
    expect(reactions.every(r => r.count === 0 && !r.reacted)).toBeTrue();
  });

  it('should toggle reaction count on react()', () => {
    const fixture = TestBed.createComponent(AlbumDetailComponent);
    fixture.detectChanges();
    fixture.componentInstance.react(0);
    expect(fixture.componentInstance.reactions()[0].count).toBe(1);
    expect(fixture.componentInstance.reactions()[0].reacted).toBeTrue();
    fixture.componentInstance.react(0);
    expect(fixture.componentInstance.reactions()[0].count).toBe(0);
    expect(fixture.componentInstance.reactions()[0].reacted).toBeFalse();
  });
});

describe('AlbumDetailComponent — not found', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumDetailComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'missing-id' } } } },
        { provide: GalleryService, useValue: mockGalleryService },
      ],
    }).compileComponents();
  });

  it('should show not-found message when album does not exist', () => {
    const fixture = TestBed.createComponent(AlbumDetailComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Không tìm thấy album');
  });
});
