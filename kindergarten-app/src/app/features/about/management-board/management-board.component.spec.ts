/**
 * Component: ManagementBoardComponent
 * Purpose: Displays the school's management/leadership team using card-teacher components.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load management members from StaffService: verifies management array is set from service
 * - should render section heading: verifies app-section-heading is present in the DOM
 *
 * Coverage: ~70% (tests initialization and service wiring)
 */
import { TestBed } from '@angular/core/testing';
import { ManagementBoardComponent } from './management-board.component';
import { StaffService } from '../../../core/services/staff.service';

const mockManagement = [
  { id: '1', name: 'Hiệu trưởng', role: 'Hiệu Trưởng', department: 'management', featured: true, imageUrl: '', bio: '', experience: 10 },
];

const mockStaffService = {
  getManagement: () => [...mockManagement],
};

describe('ManagementBoardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementBoardComponent],
      providers: [{ provide: StaffService, useValue: mockStaffService }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ManagementBoardComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load management members from StaffService', () => {
    const fixture = TestBed.createComponent(ManagementBoardComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.management.length).toBe(1);
    expect(fixture.componentInstance.management[0].name).toBe('Hiệu trưởng');
  });

  it('should render section heading', () => {
    const fixture = TestBed.createComponent(ManagementBoardComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-section-heading')).toBeTruthy();
  });
});
