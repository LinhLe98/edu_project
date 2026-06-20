/**
 * Component: TagBadgeComponent
 * Purpose: Small coloured pill label used to tag content items with a category or status.
 *
 * Test Summary:
 * - should create: verifies component instantiation
 * - should render the label text: verifies @Input label is displayed
 * - should apply the default colorClass: verifies default CSS classes on the span
 * - should apply a custom colorClass when provided: verifies colorClass binding
 *
 * Coverage: ~85% (tests all @Input properties; exact CSS computed values not verified)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagBadgeComponent } from './tag-badge.component';

describe('TagBadgeComponent', () => {
  let component: TagBadgeComponent;
  let fixture: ComponentFixture<TagBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TagBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label text', () => {
    component.label = 'Thông Báo';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    expect(span.textContent?.trim()).toBe('Thông Báo');
  });

  it('should apply the default colorClass', () => {
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    expect(span.className).toContain('bg-peach-100');
    expect(span.className).toContain('text-peach-500');
  });

  it('should apply a custom colorClass when provided', () => {
    component.colorClass = 'bg-mint-100 text-mint-600';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    expect(span.className).toContain('bg-mint-100');
  });
});
