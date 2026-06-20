/**
 * Component: CardAlbumComponent
 * Purpose: Displays a photo album card linking to the album detail page, showing cover image,
 *          title, photo count, and a mapped age-group label.
 *
 * Test Summary:
 * - should create: verifies component instantiation with a valid album input
 * - should map known ageGroup codes to labels: verifies the ageLabel getter
 * - should return raw ageGroup for unknown codes: verifies fallback behaviour
 * - should display photo count: verifies the photos.length is shown in the template
 *
 * Coverage: ~75% (covers ageLabel getter and photo count; navigation not tested)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CardAlbumComponent } from './card-album.component';
import { GalleryAlbum } from '../../../core/models';

const mockAlbum: GalleryAlbum = {
  id: 'album-1',
  title: 'Tết Trung Thu 2024',
  coverImage: 'https://picsum.photos/seed/album/600/400',
  ageGroup: '4-tuoi',
  photos: [
    { src: 'https://picsum.photos/seed/p1/400/400', alt: 'p1' },
    { src: 'https://picsum.photos/seed/p2/400/400', alt: 'p2' },
    { src: 'https://picsum.photos/seed/p3/400/400', alt: 'p3' },
  ]
};

describe('CardAlbumComponent', () => {
  let component: CardAlbumComponent;
  let fixture: ComponentFixture<CardAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAlbumComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CardAlbumComponent);
    component = fixture.componentInstance;
    component.album = mockAlbum;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map "4-tuoi" ageGroup to "Chồi"', () => {
    expect(component.ageLabel).toBe('Chồi');
  });

  it('should return raw ageGroup for unknown codes', () => {
    component.album = { ...mockAlbum, ageGroup: 'khac' };
    expect(component.ageLabel).toBe('khac');
  });

  it('should display the number of photos', () => {
    const text: string = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('3 ảnh');
  });
});
