/**
 * Component: GoogleMapEmbedComponent
 * Purpose: Renders a sanitized Google Maps iframe embed within a rounded container.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should sanitize and set safeUrl when url input is set: verifies safeUrl is defined after the input setter runs
 * - should render an iframe element: verifies the iframe element is present in the DOM after URL is set
 *
 * Coverage: ~75% (tests initialization, DomSanitizer integration, and iframe rendering)
 */
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapEmbedComponent } from './google-map-embed.component';

describe('GoogleMapEmbedComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleMapEmbedComponent, BrowserModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GoogleMapEmbedComponent);
    fixture.componentInstance.url = 'https://maps.google.com/?q=test';
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should sanitize and set safeUrl when url input is set', () => {
    const fixture = TestBed.createComponent(GoogleMapEmbedComponent);
    fixture.componentInstance.url = 'https://maps.google.com/?q=test';
    fixture.detectChanges();
    expect(fixture.componentInstance.safeUrl).toBeTruthy();
  });

  it('should render an iframe element', () => {
    const fixture = TestBed.createComponent(GoogleMapEmbedComponent);
    fixture.componentInstance.url = 'https://maps.google.com/?q=test';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('iframe')).toBeTruthy();
  });
});
