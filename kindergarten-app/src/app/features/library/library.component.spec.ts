/**
 * Component: LibraryComponent
 * Purpose: Library page composing a page hero with age-group album tabs and learning materials sections.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should render the page hero component: verifies app-page-hero is present in the DOM
 * - should render age-group tabs and learning materials sections: verifies both child sections are present
 *
 * Coverage: ~65% (tests initialization and child component presence)
 */
import { TestBed } from '@angular/core/testing';
import { LibraryComponent } from './library.component';
import { GalleryService } from '../../core/services/gallery.service';

const mockGalleryService = {
  getAll: () => [],
  getByAgeGroup: (_age: string) => [],
  getAlbumById: (_id: string) => undefined,
};

describe('LibraryComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryComponent],
      providers: [
        { provide: GalleryService, useValue: mockGalleryService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LibraryComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the page hero component', () => {
    const fixture = TestBed.createComponent(LibraryComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-page-hero')).toBeTruthy();
  });

  it('should render age-group tabs and learning materials sections', () => {
    const fixture = TestBed.createComponent(LibraryComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-age-group-tabs')).toBeTruthy();
    expect(el.querySelector('app-learning-materials')).toBeTruthy();
  });
});
