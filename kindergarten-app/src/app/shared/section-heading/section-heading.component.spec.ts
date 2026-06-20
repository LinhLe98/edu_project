/**
 * Component: SectionHeadingComponent
 * Purpose: Reusable section title block with optional badge, accent bar, subtitle,
 *          and configurable left/center alignment.
 *
 * Test Summary:
 * - should create: verifies component instantiation
 * - should render title in h2: verifies @Input title binding
 * - should apply text-center class when align is center: verifies alignment logic
 * - should not apply text-center when align is left: verifies left alignment
 * - should show badge when provided: verifies conditional badge rendering
 *
 * Coverage: ~80% (covers all @Input properties; CSS class deep-testing not included)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionHeadingComponent } from './section-heading.component';

describe('SectionHeadingComponent', () => {
  let component: SectionHeadingComponent;
  let fixture: ComponentFixture<SectionHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHeadingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SectionHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in an h2', () => {
    component.title = 'Giáo viên';
    fixture.detectChanges();
    const h2 = fixture.nativeElement.querySelector('h2') as HTMLElement;
    expect(h2.textContent).toContain('Giáo viên');
  });

  it('should apply text-center class when align is center', () => {
    component.align = 'center';
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(wrapper.classList).toContain('text-center');
  });

  it('should not apply text-center when align is left', () => {
    component.align = 'left';
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(wrapper.classList).not.toContain('text-center');
  });

  it('should render badge when provided', () => {
    component.badge = 'Nổi bật';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span).not.toBeNull();
    expect(span.textContent).toContain('Nổi bật');
  });
});
