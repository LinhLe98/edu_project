/**
 * Component: ActivitiesComponent
 * Purpose: Educational activities page composing a page hero with program list and album links sections.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should render the page hero component: verifies app-page-hero is present in the DOM
 * - should render program list and album links sections: verifies both child sections are present
 *
 * Coverage: ~65% (tests initialization and child component presence)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { ProgramsService } from '../../core/services/programs.service';
import { GalleryService } from '../../core/services/gallery.service';

const mockProgramsService = { getAll: () => [] };
const mockGalleryService = { getAll: () => [], getByAgeGroup: (_age: string) => [], getAlbumById: (_id: string) => undefined };

describe('ActivitiesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesComponent],
      providers: [
        provideRouter([]),
        { provide: ProgramsService, useValue: mockProgramsService },
        { provide: GalleryService, useValue: mockGalleryService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ActivitiesComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the page hero component', () => {
    const fixture = TestBed.createComponent(ActivitiesComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-page-hero')).toBeTruthy();
  });

  it('should render program list and album links sections', () => {
    const fixture = TestBed.createComponent(ActivitiesComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-program-list')).toBeTruthy();
    expect(el.querySelector('app-activity-album-links')).toBeTruthy();
  });
});
