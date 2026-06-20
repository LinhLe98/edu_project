/**
 * Component: ImageLightboxComponent
 * Purpose: Full-screen image lightbox overlay with zoom, navigation, and download.
 *
 * Test Summary:
 * - should create: verifies component instantiation
 * - should not render when open is false: verifies conditional rendering
 * - should render when open is true: verifies overlay is displayed
 * - should show correct position indicator: verifies position string formatting
 * - should navigate to next image: verifies next() updates index
 * - should navigate to prev image: verifies prev() wraps correctly
 * - should zoom in and cap at max: verifies zoomIn() logic
 * - should zoom out and cap at min: verifies zoomOut() logic
 * - should reset zoom: verifies resetZoom() sets level to 1
 * - should emit closeEvent on close(): verifies EventEmitter output
 *
 * Coverage: ~75%
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageLightboxComponent } from './image-lightbox.component';
import { GalleryImage } from '../../core/models';

const mockImages: GalleryImage[] = [
  { src: 'https://picsum.photos/seed/a/800/600', alt: 'Photo 1', caption: 'Caption 1' },
  { src: 'https://picsum.photos/seed/b/800/600', alt: 'Photo 2' },
  { src: 'https://picsum.photos/seed/c/800/600', alt: 'Photo 3', caption: 'Caption 3' },
];

describe('ImageLightboxComponent', () => {
  let component: ImageLightboxComponent;
  let fixture: ComponentFixture<ImageLightboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageLightboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageLightboxComponent);
    component = fixture.componentInstance;
    component.images = mockImages;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render when open is false', () => {
    component.open = false;
    fixture.detectChanges();
    const backdrop = fixture.nativeElement.querySelector('.lightbox-backdrop');
    expect(backdrop).toBeNull();
  });

  it('should render when open is true', () => {
    component.open = true;
    fixture.detectChanges();
    const backdrop = fixture.nativeElement.querySelector('.lightbox-backdrop');
    expect(backdrop).toBeTruthy();
  });

  it('should show correct position indicator', () => {
    component.open = true;
    component.startIndex = 0;
    fixture.detectChanges();
    expect(component.position).toBe('1 / 3');
  });

  it('should navigate to next image', () => {
    component.startIndex = 0;
    component.next();
    expect(component._index()).toBe(1);
  });

  it('should wrap to first image when navigating past last', () => {
    component.startIndex = 2;
    component.next();
    expect(component._index()).toBe(0);
  });

  it('should navigate to prev image', () => {
    component.startIndex = 1;
    component.prev();
    expect(component._index()).toBe(0);
  });

  it('should wrap to last image when navigating before first', () => {
    component.startIndex = 0;
    component.prev();
    expect(component._index()).toBe(2);
  });

  it('should zoom in and not exceed max zoom of 3', () => {
    component.zoomLevel.set(2.75);
    component.zoomIn();
    expect(component.zoomLevel()).toBe(3);
    component.zoomIn();
    expect(component.zoomLevel()).toBe(3);
  });

  it('should zoom out and not go below min zoom of 0.5', () => {
    component.zoomLevel.set(0.75);
    component.zoomOut();
    expect(component.zoomLevel()).toBe(0.5);
    component.zoomOut();
    expect(component.zoomLevel()).toBe(0.5);
  });

  it('should reset zoom to 1', () => {
    component.zoomLevel.set(2);
    component.resetZoom();
    expect(component.zoomLevel()).toBe(1);
  });

  it('should emit closeEvent on close()', () => {
    const spy = spyOn(component.closeEvent, 'emit');
    component.close();
    expect(spy).toHaveBeenCalled();
  });

  it('should reset zoom on close()', () => {
    component.zoomLevel.set(2.5);
    component.close();
    expect(component.zoomLevel()).toBe(1);
  });

  it('should reset zoom when navigating', () => {
    component.zoomLevel.set(2);
    component.next();
    expect(component.zoomLevel()).toBe(1);
    component.zoomLevel.set(2);
    component.prev();
    expect(component.zoomLevel()).toBe(1);
  });
});
