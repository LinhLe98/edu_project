/**
 * Component: HeaderComponent
 * Purpose: Sticky site header containing the logo, desktop nav menu, and mobile hamburger
 *          button. Toggles a shadow/blur effect on scroll.
 *
 * Test Summary:
 * - should create: verifies the component instantiates correctly
 * - should initialise menuOpen as false: verifies default signal value
 * - should set menuOpen to true when hamburger is clicked: verifies open-menu interaction
 * - should update scrolled signal on window scroll: verifies scroll listener behaviour
 *
 * Coverage: ~65% (tests signals and host listener; does not cover child component rendering)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([]), provideAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise menuOpen as false', () => {
    expect(component.menuOpen()).toBeFalse();
  });

  it('should set menuOpen to true when hamburger button is clicked', () => {
    const btn = fixture.nativeElement.querySelector('button[aria-label="Mở menu"]') as HTMLButtonElement;
    btn.click();
    expect(component.menuOpen()).toBeTrue();
  });

  it('should set scrolled to true when window scrollY > 20', () => {
    Object.defineProperty(window, 'scrollY', { value: 30, writable: true });
    component.onScroll();
    expect(component.scrolled()).toBeTrue();
  });
});
