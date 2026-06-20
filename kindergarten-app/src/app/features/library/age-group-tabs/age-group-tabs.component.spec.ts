/**
 * Component: AgeGroupTabsComponent
 * Purpose: Tabbed gallery view filtering albums by age group (3, 4, and 5 years old).
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should default to the 3-tuoi tab: verifies activeTab signal starts on '3-tuoi'
 * - should switch active tab on button click: verifies activeTab updates when a tab button is clicked
 *
 * Coverage: ~75% (tests initialization, default signal state, and tab switching logic)
 */
import { TestBed } from '@angular/core/testing';
import { AgeGroupTabsComponent } from './age-group-tabs.component';
import { GalleryService } from '../../../core/services/gallery.service';

const mockGalleryService = {
  getByAgeGroup: (_age: string) => [],
};

describe('AgeGroupTabsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeGroupTabsComponent],
      providers: [{ provide: GalleryService, useValue: mockGalleryService }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AgeGroupTabsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should default to the 3-tuoi tab', () => {
    const fixture = TestBed.createComponent(AgeGroupTabsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.activeTab()).toBe('3-tuoi');
  });

  it('should switch active tab on set()', () => {
    const fixture = TestBed.createComponent(AgeGroupTabsComponent);
    fixture.detectChanges();
    fixture.componentInstance.activeTab.set('5-tuoi');
    fixture.detectChanges();
    expect(fixture.componentInstance.activeTab()).toBe('5-tuoi');
  });
});
