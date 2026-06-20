/**
 * Component: SchoolHistoryComponent
 * Purpose: Renders an alternating timeline of 6 milestones in the school's 15-year history.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should have 6 timeline events: verifies the timeline array has 6 entries
 * - should render all event years in the DOM: verifies timeline year labels appear in the template
 *
 * Coverage: ~75% (tests initialization, data definition, and template rendering)
 */
import { TestBed } from '@angular/core/testing';
import { SchoolHistoryComponent } from './school-history.component';

describe('SchoolHistoryComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolHistoryComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SchoolHistoryComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 6 timeline events', () => {
    const fixture = TestBed.createComponent(SchoolHistoryComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.timeline.length).toBe(6);
  });

  it('should render all event years in the DOM', () => {
    const fixture = TestBed.createComponent(SchoolHistoryComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const text = el.textContent ?? '';
    ['2010', '2013', '2016', '2019', '2022', '2025'].forEach(year => {
      expect(text).toContain(year);
    });
  });
});
