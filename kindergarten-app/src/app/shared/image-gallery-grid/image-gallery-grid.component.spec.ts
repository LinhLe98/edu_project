/**
 * Component: ImageGalleryGridComponent
 * Purpose: Responsive photo grid that renders an array of GalleryImage objects,
 *          showing an optional caption overlay on hover.
 *
 * Test Summary:
 * - should create: verifies component instantiation
 * - should render one grid item per image: verifies iteration over the images input
 * - should render img elements with correct src: verifies image src binding
 * - should not render caption overlay when caption is absent: verifies conditional caption
 *
 * Coverage: ~70% (tests structural rendering; hover styles not testable in unit tests)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageGalleryGridComponent } from './image-gallery-grid.component';
import { GalleryImage } from '../../core/models';

const mockImages: GalleryImage[] = [
  { src: 'https://picsum.photos/seed/x/400/400', alt: 'Photo 1', caption: 'Lớp Mầm' },
  { src: 'https://picsum.photos/seed/y/400/400', alt: 'Photo 2' }
];

describe('ImageGalleryGridComponent', () => {
  let component: ImageGalleryGridComponent;
  let fixture: ComponentFixture<ImageGalleryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGalleryGridComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageGalleryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one grid item per image', () => {
    component.images = mockImages;
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('div.relative');
    expect(items.length).toBe(mockImages.length);
  });

  it('should render img elements with the correct src', () => {
    component.images = mockImages;
    fixture.detectChanges();
    const imgs: NodeListOf<HTMLImageElement> = fixture.nativeElement.querySelectorAll('img');
    expect(imgs[0].src).toContain('seed/x');
    expect(imgs[1].src).toContain('seed/y');
  });

  it('should render caption overlay only for images that have a caption', () => {
    component.images = mockImages;
    fixture.detectChanges();
    const captions = fixture.nativeElement.querySelectorAll('p.text-white');
    // only the first image has a caption
    expect(captions.length).toBe(1);
    expect(captions[0].textContent).toContain('Lớp Mầm');
  });
});
