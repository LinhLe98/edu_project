/**
 * Component: TeacherDetailComponent
 * Purpose: Displays a single teacher's profile identified by route :id param.
 *   Shows bio, qualifications, specialties, contact info, and lists colleagues
 *   from the same department. Redirects to /about when id is not found.
 *   Reacts to paramMap changes so navigating between colleagues updates the
 *   view without recreating the component.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load teacher from route param on init: verifies teacher signal is
 *     populated from StaffService.getById using the paramMap id
 * - should redirect to /about when teacher not found: verifies
 *     Router.navigate is called when getById returns undefined
 * - should populate colleagues from same department excluding self: verifies
 *     the colleagues signal contains department members other than the current teacher
 * - should expose correct departmentLabel: verifies the getter maps department
 *     keys to their Vietnamese display strings
 *
 * Coverage: ~75% (tests data loading, routing guard, department label;
 *   template rendering is covered at integration level)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { TeacherDetailComponent } from './teacher-detail.component';
import { StaffService } from '../../core/services/staff.service';

const mockTeacher = {
  id: 'staff-3',
  fullName: 'Lê Thị Thu',
  role: 'Giáo Viên Chủ Nhiệm Lớp Lá 1',
  department: 'to-giao-vien-la' as const,
  photo: 'https://picsum.photos/seed/t3/400/400',
  bio: 'Bio mô tả',
  qualifications: ['Cử nhân Sư Phạm'],
  featured: true,
  groupRole: 'leader' as const,
  experience: 10,
  specialties: ['Phát triển ngôn ngữ'],
  email: 'thu@anhduong.edu.vn',
};

const mockColleague = {
  id: 'staff-4',
  fullName: 'Phạm Thị Lan',
  role: 'Giáo Viên Lớp Lá 2',
  department: 'to-giao-vien-la' as const,
  photo: 'https://picsum.photos/seed/t4/400/400',
  bio: 'Bio đồng nghiệp',
  qualifications: [],
  featured: false,
};

const mockStaffService = {
  getById: (id: string) => (id === 'staff-3' ? mockTeacher : undefined),
  getByDepartment: () => [mockTeacher, mockColleague],
};

const mockRoute = {
  paramMap: of(convertToParamMap({ id: 'staff-3' })),
};

describe('TeacherDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherDetailComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: StaffService, useValue: mockStaffService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TeacherDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load teacher from route param on init', () => {
    const fixture = TestBed.createComponent(TeacherDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.teacher()).toEqual(mockTeacher);
  });

  it('should redirect to /about when teacher not found', () => {
    const notFoundRoute = { paramMap: of(convertToParamMap({ id: 'staff-999' })) };
    TestBed.overrideProvider(ActivatedRoute, { useValue: notFoundRoute });
    const fixture = TestBed.createComponent(TeacherDetailComponent);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/about']);
  });

  it('should populate colleagues from same department excluding self', () => {
    const fixture = TestBed.createComponent(TeacherDetailComponent);
    fixture.detectChanges();
    const colleagues = fixture.componentInstance.colleagues();
    expect(colleagues.some(c => c.id === 'staff-4')).toBeTrue();
    expect(colleagues.some(c => c.id === 'staff-3')).toBeFalse();
  });

  it('should expose correct departmentLabel', () => {
    const fixture = TestBed.createComponent(TeacherDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.departmentLabel).toBe('Tổ Giáo Viên Lớp Lá');
  });
});
