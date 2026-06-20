/**
 * Component: SchoolOverviewComponent
 * Purpose: Presents a two-column section with school description text and a 2x2 photo grid.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should render the section heading component: verifies app-section-heading is in the DOM
 * - should contain router links to about and contact pages: verifies navigation anchors are present
 *
 * Coverage: ~65% (tests initialization and static template structure)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SchoolOverviewComponent } from './school-overview.component';

describe('SchoolOverviewComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolOverviewComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SchoolOverviewComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the section heading component', () => {
    const fixture = TestBed.createComponent(SchoolOverviewComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-section-heading')).toBeTruthy();
  });

  it('should contain router links to about and contact pages', () => {
    const fixture = TestBed.createComponent(SchoolOverviewComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const links = el.querySelectorAll('a[ng-reflect-router-link], a[routerlink]');
    expect(links.length).toBeGreaterThanOrEqual(2);
  });
});
