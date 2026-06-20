/**
 * Component: TeacherHighlightsComponent
 * Purpose: Shows up to 4 featured teachers on the home page, with a link that navigates
 *   directly to the teacher-groups section on the About page via routerLink + fragment.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load at most 4 featured members: verifies the featured array is capped at 4
 * - should render card-teacher elements: verifies teacher cards appear in the template
 * - should link to /about#teacher-groups: verifies the "see all" anchor has the
 *     correct href so the home page teacher section navigates to the right About section
 *
 * Coverage: ~80% (tests initialization, service data binding, card rendering, and navigation link)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TeacherHighlightsComponent } from './teacher-highlights.component';
import { StaffService } from '../../../core/services/staff.service';

const mockStaff = [
  { id: '1', name: 'Cô A', role: 'Giáo viên', department: 'to-giao-vien-la', featured: true, imageUrl: '', bio: '', experience: 5 },
  { id: '2', name: 'Cô B', role: 'Giáo viên', department: 'to-giao-vien-la', featured: true, imageUrl: '', bio: '', experience: 3 },
  { id: '3', name: 'Cô C', role: 'Giáo viên', department: 'to-giao-vien-choi', featured: true, imageUrl: '', bio: '', experience: 4 },
  { id: '4', name: 'Cô D', role: 'Giáo viên', department: 'to-giao-vien-mam', featured: true, imageUrl: '', bio: '', experience: 2 },
  { id: '5', name: 'Cô E', role: 'Giáo viên', department: 'to-giao-vien-mam', featured: true, imageUrl: '', bio: '', experience: 1 },
];

const mockStaffService = {
  getFeatured: () => [...mockStaff],
  getManagement: () => [],
  getByDepartment: (_dept: string) => [],
};

describe('TeacherHighlightsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherHighlightsComponent],
      providers: [
        provideRouter([]),
        { provide: StaffService, useValue: mockStaffService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TeacherHighlightsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load at most 4 featured members', () => {
    const fixture = TestBed.createComponent(TeacherHighlightsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.featured.length).toBeLessThanOrEqual(4);
    expect(fixture.componentInstance.featured.length).toBe(4);
  });

  it('should render card-teacher elements', () => {
    const fixture = TestBed.createComponent(TeacherHighlightsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('app-card-teacher');
    expect(cards.length).toBe(4);
  });

  it('should link to /about#teacher-groups', () => {
    const fixture = TestBed.createComponent(TeacherHighlightsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector<HTMLAnchorElement>('a[href="/about#teacher-groups"]');
    expect(link).toBeTruthy();
  });
});
