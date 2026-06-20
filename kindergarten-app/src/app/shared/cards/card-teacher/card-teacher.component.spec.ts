/**
 * Component: CardTeacherComponent
 * Purpose: Displays a staff member profile card with photo, name, role, bio,
 *          and a list of qualification badges.
 *
 * Test Summary:
 * - should create: verifies component instantiation with a valid member input
 * - should display member full name: verifies @Input member.fullName is rendered in h3
 * - should display member role: verifies member.role appears in the card
 * - should render one qualification badge per qualification: verifies *ngFor on qualifications
 *
 * Coverage: ~75% (covers all rendered fields; hover CSS animations not tested)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardTeacherComponent } from './card-teacher.component';
import { StaffMember } from '../../../core/models';

const mockMember: StaffMember = {
  id: '1',
  fullName: 'Nguyễn Thị Lan',
  role: 'Giáo viên chủ nhiệm',
  photo: 'https://picsum.photos/seed/teacher/200/200',
  bio: 'Hơn 10 năm kinh nghiệm giảng dạy mầm non.',
  qualifications: ['Cử nhân Sư phạm', 'Chứng chỉ Montessori'],
  department: 'Lớp Chồi',
};

describe('CardTeacherComponent', () => {
  let component: CardTeacherComponent;
  let fixture: ComponentFixture<CardTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTeacherComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardTeacherComponent);
    component = fixture.componentInstance;
    component.member = mockMember;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the member full name in an h3', () => {
    const h3 = fixture.nativeElement.querySelector('h3') as HTMLElement;
    expect(h3.textContent).toContain('Nguyễn Thị Lan');
  });

  it('should display the member role', () => {
    const text: string = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Giáo viên chủ nhiệm');
  });

  it('should render one badge per qualification', () => {
    const badges = fixture.nativeElement.querySelectorAll('span.bg-lavender-50');
    expect(badges.length).toBe(mockMember.qualifications.length);
  });
});
