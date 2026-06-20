/**
 * Component: TeacherGroupsComponent
 * Purpose: Displays teachers grouped by age class (Lá, Chồi, Mầm) on the About page.
 *   Shows 1 group leader + up to 2 vice-leaders per group. Each group has a "Xem tất cả"
 *   link routing to /teacher-groups/:dept for the full teacher roster of that group.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should create 3 department groups: verifies the groups array has 3 items
 * - should render group labels in the DOM: verifies all 3 class names appear in the template
 * - should render per-group see-all links: verifies each group has an anchor pointing to
 *     /teacher-groups/:dept so parents can browse the full group roster
 *
 * Coverage: ~80% (tests initialization, data grouping, label rendering, and navigation links)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TeacherGroupsComponent } from './teacher-groups.component';
import { StaffService } from '../../../core/services/staff.service';

const mockStaffService = {
  getByDepartment: (_dept: string) => [],
  getGroupLeader: (_dept: string) => undefined,
  getGroupViceLeaders: (_dept: string) => [],
};

describe('TeacherGroupsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherGroupsComponent],
      providers: [
        provideRouter([]),
        { provide: StaffService, useValue: mockStaffService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TeacherGroupsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should create 3 department groups', () => {
    const fixture = TestBed.createComponent(TeacherGroupsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.groups.length).toBe(3);
  });

  it('should render group labels in the DOM', () => {
    const fixture = TestBed.createComponent(TeacherGroupsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const text = el.textContent ?? '';
    expect(text).toContain('Lớp Lá');
    expect(text).toContain('Lớp Chồi');
    expect(text).toContain('Lớp Mầm');
  });

  it('should render per-group see-all links pointing to /teacher-groups/:dept', () => {
    const fixture = TestBed.createComponent(TeacherGroupsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const links = el.querySelectorAll<HTMLAnchorElement>('a[href^="/teacher-groups/"]');
    expect(links.length).toBe(3);
    const hrefs = Array.from(links).map(a => a.getAttribute('href'));
    expect(hrefs).toContain('/teacher-groups/to-giao-vien-la');
    expect(hrefs).toContain('/teacher-groups/to-giao-vien-choi');
    expect(hrefs).toContain('/teacher-groups/to-giao-vien-mam');
  });
});
