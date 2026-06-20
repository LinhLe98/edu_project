/**
 * Component: TeacherGroupDetailComponent
 * Purpose: Displays all teachers in a specific age-class group identified by the :dept route param.
 *   Shows a page hero with the group name and subtitle, a grid of CardTeacherComponent cards,
 *   and a back link to the About page teacher-groups section.
 *   Reacts to paramMap changes (takeUntilDestroyed) for reactive navigation between groups.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load members for dept from StaffService: verifies members signal is populated
 *     from StaffService.getByDepartment using the route :dept param
 * - should set groupLabel from known dept: verifies the Vietnamese group label is mapped
 *     correctly from the department key
 * - should render card-teacher elements: verifies teacher cards appear in the DOM
 * - should render back link to /about#teacher-groups: verifies the back anchor exists
 *
 * Coverage: ~80% (tests initialization, service binding, label mapping, DOM rendering, and back link)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { TeacherGroupDetailComponent } from './teacher-group-detail.component';
import { StaffService } from '../../core/services/staff.service';
import { StaffMember } from '../../core/models';

const mockMembers: StaffMember[] = [
  {
    id: 'st-1',
    fullName: 'Cô Lan',
    role: 'Giáo viên',
    department: 'to-giao-vien-la',
    photo: 'https://picsum.photos/seed/st1/200/200',
    bio: 'Bio mẫu',
    qualifications: [],
    featured: true,
    groupRole: 'leader',
  },
  {
    id: 'st-2',
    fullName: 'Cô Mai',
    role: 'Giáo viên',
    department: 'to-giao-vien-la',
    photo: 'https://picsum.photos/seed/st2/200/200',
    bio: 'Bio mẫu 2',
    qualifications: [],
    featured: false,
    groupRole: 'vice-leader',
  },
];

const mockStaffService = {
  getByDepartment: (dept: string) => dept === 'to-giao-vien-la' ? [...mockMembers] : [],
};

const mockRoute = {
  paramMap: of(convertToParamMap({ dept: 'to-giao-vien-la' })),
};

describe('TeacherGroupDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherGroupDetailComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: StaffService, useValue: mockStaffService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TeacherGroupDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load members for dept from StaffService', () => {
    const fixture = TestBed.createComponent(TeacherGroupDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.members().length).toBe(2);
    expect(fixture.componentInstance.members()[0].fullName).toBe('Cô Lan');
  });

  it('should set groupLabel from known dept', () => {
    const fixture = TestBed.createComponent(TeacherGroupDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.groupLabel()).toContain('Lớp Lá');
  });

  it('should render card-teacher elements', () => {
    const fixture = TestBed.createComponent(TeacherGroupDetailComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('app-card-teacher');
    expect(cards.length).toBe(2);
  });

  it('should render back link to /about#teacher-groups', () => {
    const fixture = TestBed.createComponent(TeacherGroupDetailComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const backLink = el.querySelector<HTMLAnchorElement>('a[href="/about#teacher-groups"]');
    expect(backLink).toBeTruthy();
  });
});
