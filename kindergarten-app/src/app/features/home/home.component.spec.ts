/**
 * Component: HomeComponent
 * Purpose: Main landing page orchestrating slideshow, stats, overview, teachers, news, and CTA sections.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load hero slides from SlidesService: verifies slides array is populated from the service
 * - should render all section child components: verifies all major section selectors are present in the DOM
 *
 * Coverage: ~70% (tests initialization and service wiring; child component rendering is tested separately)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';
import { SlidesService } from '../../core/services/slides.service';

const mockSlides = [
  { id: '1', imageUrl: 'https://example.com/1.jpg', title: 'Slide 1', subtitle: '', ctaLabel: '', ctaLink: '/' },
];

const mockSlidesService = {
  getHeroSlides: () => [...mockSlides],
};

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        { provide: SlidesService, useValue: mockSlidesService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load hero slides from SlidesService', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.slides).toEqual(mockSlides);
  });

  it('should render all section child components', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-quick-stats')).toBeTruthy();
    expect(el.querySelector('app-school-overview')).toBeTruthy();
    expect(el.querySelector('app-teacher-highlights')).toBeTruthy();
    expect(el.querySelector('app-latest-news')).toBeTruthy();
    expect(el.querySelector('app-registration-cta')).toBeTruthy();
  });
});
