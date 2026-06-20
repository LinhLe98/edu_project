/**
 * Component: FacilitiesSectionComponent
 * Purpose: Shows facility cards with icon, name, and description, plus a photo gallery grid.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load facilities from FacilitiesService: verifies facilities array is populated from the service
 * - should render facility names in the DOM: verifies mock facility name appears in the template
 *
 * Coverage: ~70% (tests initialization, service wiring, and template rendering)
 */
import { TestBed } from '@angular/core/testing';
import { FacilitiesSectionComponent } from './facilities-section.component';
import { FacilitiesService } from '../../../core/services/facilities.service';

const mockFacilities = [
  { id: '1', name: 'Phòng học', description: 'Phòng học hiện đại', iconEmoji: '🏫', images: [] },
];

const mockFacilitiesService = {
  getAll: () => [...mockFacilities],
};

describe('FacilitiesSectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilitiesSectionComponent],
      providers: [{ provide: FacilitiesService, useValue: mockFacilitiesService }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FacilitiesSectionComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load facilities from FacilitiesService', () => {
    const fixture = TestBed.createComponent(FacilitiesSectionComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.facilities.length).toBe(1);
    expect(fixture.componentInstance.facilities[0].name).toBe('Phòng học');
  });

  it('should render facility names in the DOM', () => {
    const fixture = TestBed.createComponent(FacilitiesSectionComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Phòng học');
  });
});
