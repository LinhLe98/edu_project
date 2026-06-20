/**
 * Component: PageHeroComponent
 * Purpose: Banner section displayed at the top of inner pages, showing a title,
 *          optional subtitle, and optional badge label with decorative background circles.
 *
 * Test Summary:
 * - should create: verifies component instantiation
 * - should render title: verifies @Input title is displayed in an h1 element
 * - should render subtitle when provided: verifies conditional subtitle rendering
 * - should not render subtitle when empty: verifies subtitle is hidden when empty
 * - should render badge when provided: verifies optional badge span appears
 *
 * Coverage: ~80% (tests all public @Input properties; decorative elements not asserted)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeroComponent } from './page-hero.component';

describe('PageHeroComponent', () => {
  let component: PageHeroComponent;
  let fixture: ComponentFixture<PageHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeroComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title in an h1', () => {
    component.title = 'Giới Thiệu';
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1') as HTMLElement;
    expect(h1.textContent).toContain('Giới Thiệu');
  });

  it('should render subtitle when provided', () => {
    component.subtitle = 'Trường mầm non chất lượng';
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain('Trường mầm non chất lượng');
  });

  it('should not render subtitle when empty', () => {
    component.subtitle = '';
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p).toBeNull();
  });

  it('should render badge span when badge is provided', () => {
    component.badge = 'Mới';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span).not.toBeNull();
    expect(span.textContent).toContain('Mới');
  });
});
