/**
 * Component: ProgramListComponent
 * Purpose: Displays all educational programs as a 3-column grid of program cards.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load programs from ProgramsService: verifies programs array is populated from the service
 * - should render card-program elements for each program: verifies cards appear in the template
 *
 * Coverage: ~70% (tests initialization, service wiring, and card rendering)
 */
import { TestBed } from '@angular/core/testing';
import { ProgramListComponent } from './program-list.component';
import { ProgramsService } from '../../../core/services/programs.service';

const mockPrograms = [
  { id: '1', title: 'Chương trình A', description: '', iconEmoji: '📚', ageGroup: '3-5', features: [] },
  { id: '2', title: 'Chương trình B', description: '', iconEmoji: '🎨', ageGroup: '3-5', features: [] },
];

const mockProgramsService = {
  getAll: () => [...mockPrograms],
};

describe('ProgramListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramListComponent],
      providers: [{ provide: ProgramsService, useValue: mockProgramsService }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProgramListComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load programs from ProgramsService', () => {
    const fixture = TestBed.createComponent(ProgramListComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.programs.length).toBe(2);
  });

  it('should render card-program elements for each program', () => {
    const fixture = TestBed.createComponent(ProgramListComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('app-card-program');
    expect(cards.length).toBe(2);
  });
});
