/**
 * Component: QuickStatsComponent
 * Purpose: Displays a horizontal row of key school statistics (years, students, teachers, classrooms).
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should have 4 stats: verifies the stats array contains exactly 4 entries
 * - should render stat values in the DOM: verifies each stat value appears in the rendered template
 *
 * Coverage: ~75% (tests initialization, data definition, and template rendering)
 */
import { TestBed } from '@angular/core/testing';
import { QuickStatsComponent } from './quick-stats.component';

describe('QuickStatsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickStatsComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(QuickStatsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 4 stats', () => {
    const fixture = TestBed.createComponent(QuickStatsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.stats.length).toBe(4);
  });

  it('should render stat values in the DOM', () => {
    const fixture = TestBed.createComponent(QuickStatsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const text = el.textContent ?? '';
    expect(text).toContain('15+');
    expect(text).toContain('350+');
    expect(text).toContain('25+');
    expect(text).toContain('6');
  });
});
