/**
 * Component: SlideshowComponent
 * Purpose: Hero image carousel powered by Swiper web components. Accepts an array of
 *          HeroSlide objects and an optional height string to control the container size.
 *
 * Test Summary:
 * - should create: verifies component instantiation
 * - should default height to 80vh: verifies the default @Input value
 * - should accept slides input: verifies @Input slides is stored and reflected
 * - should render one swiper-slide per slide: verifies template iteration over slides
 *
 * Coverage: ~60% (tests inputs and DOM structure; Swiper initialisation not covered)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SlideshowComponent } from './slideshow.component';
import { HeroSlide } from '../../core/models';

const mockSlides: HeroSlide[] = [
  {
    imageUrl: 'https://picsum.photos/seed/a/800/600',
    altText: 'Slide 1',
    heading: 'Heading One',
    subheading: 'Sub one',
    ctaLabel: 'Click',
    ctaLink: '/'
  },
  {
    imageUrl: 'https://picsum.photos/seed/b/800/600',
    altText: 'Slide 2',
    heading: 'Heading Two',
  }
];

describe('SlideshowComponent', () => {
  let component: SlideshowComponent;
  let fixture: ComponentFixture<SlideshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideshowComponent],
      providers: [provideRouter([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default height to 80vh', () => {
    expect(component.height).toBe('80vh');
  });

  it('should accept a slides input', () => {
    component.slides = mockSlides;
    fixture.detectChanges();
    expect(component.slides.length).toBe(2);
  });

  it('should render one swiper-slide element per slide', () => {
    component.slides = mockSlides;
    fixture.detectChanges();
    const slides = fixture.nativeElement.querySelectorAll('swiper-slide');
    expect(slides.length).toBe(mockSlides.length);
  });
});
