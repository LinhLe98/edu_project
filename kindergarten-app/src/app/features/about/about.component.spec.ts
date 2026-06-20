/**
 * Component: AboutComponent
 * Purpose: About page with a 2-column intro section (hero content left, school history timeline right),
 *   followed by management board, teacher groups, and facilities sections.
 *   Timeline data is inlined in the component; sub-components used for subsequent sections only.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should have 6 timeline entries: verifies the school history timeline is populated
 * - should render all section sub-components: verifies management, teacher groups, and facilities are present
 * - should render timeline items in the DOM: verifies timeline cards appear
 * - should render contact CTA links: verifies navigation links to /contact are present
 *
 * Coverage: ~75% (tests initialization, data, DOM rendering, and navigation links)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutComponent } from './about.component';
import { StaffService } from '../../core/services/staff.service';
import { FacilitiesService } from '../../core/services/facilities.service';

const mockStaffService = {
  getManagement: () => [],
  getFeatured: () => [],
  getByDepartment: (_dept: string) => [],
  getGroupLeader: (_dept: string) => undefined,
  getGroupViceLeaders: (_dept: string) => [],
};

const mockFacilitiesService = {
  getAll: () => [],
};

describe('AboutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        provideRouter([]),
        { provide: StaffService, useValue: mockStaffService },
        { provide: FacilitiesService, useValue: mockFacilitiesService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 6 timeline entries', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.timeline.length).toBe(6);
  });

  it('should render all section sub-components', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-management-board')).toBeTruthy();
    expect(el.querySelector('app-teacher-groups')).toBeTruthy();
    expect(el.querySelector('app-facilities-section')).toBeTruthy();
  });

  it('should render timeline items in the DOM', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const years = el.querySelectorAll('.text-lavender-500');
    expect(years.length).toBeGreaterThanOrEqual(6);
  });

  it('should render contact CTA links', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const contactLinks = el.querySelectorAll('a[href="/contact"]');
    expect(contactLinks.length).toBeGreaterThanOrEqual(1);
  });
});
