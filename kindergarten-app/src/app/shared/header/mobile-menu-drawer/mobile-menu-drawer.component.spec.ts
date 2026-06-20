/**
 * Component: MobileMenuDrawerComponent
 * Purpose: Slide-in mobile navigation drawer controlled by an @Input open flag,
 *          emitting a close event when the backdrop or close button is clicked.
 *
 * Test Summary:
 * - should create: verifies component instantiation
 * - should not render drawer when open is false: verifies default hidden state
 * - should render drawer when open is true: verifies conditional display
 * - should emit close event when close button is clicked: verifies close output
 * - should expose navItems from NAV_ITEMS: verifies nav array is populated
 *
 * Coverage: ~70% (tests open/close logic; animation timing not covered)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MobileMenuDrawerComponent } from './mobile-menu-drawer.component';

describe('MobileMenuDrawerComponent', () => {
  let component: MobileMenuDrawerComponent;
  let fixture: ComponentFixture<MobileMenuDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileMenuDrawerComponent, NoopAnimationsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileMenuDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render the drawer when open is false', () => {
    component.open = false;
    fixture.detectChanges();
    const drawer = fixture.nativeElement.querySelector('.fixed');
    expect(drawer).toBeNull();
  });

  it('should render the drawer when open is true', () => {
    component.open = true;
    fixture.detectChanges();
    const drawer = fixture.nativeElement.querySelector('.fixed');
    expect(drawer).not.toBeNull();
  });

  it('should emit close event when close button is clicked', () => {
    component.open = true;
    fixture.detectChanges();
    let emitted = false;
    component.close.subscribe(() => (emitted = true));
    const closeBtn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    closeBtn.click();
    expect(emitted).toBeTrue();
  });

  it('should have navItems populated', () => {
    expect(component.navItems.length).toBeGreaterThan(0);
  });
});
