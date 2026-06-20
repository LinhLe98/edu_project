/**
 * Component: RegistrationCtaComponent
 * Purpose: Full-width call-to-action banner urging parents to register for the upcoming school year.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should render registration heading text: verifies the CTA heading is present in the DOM
 * - should contain a link to the contact page: verifies the registration link targets /contact
 *
 * Coverage: ~65% (tests initialization and static template content)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RegistrationCtaComponent } from './registration-cta.component';

describe('RegistrationCtaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationCtaComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RegistrationCtaComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render registration heading text', () => {
    const fixture = TestBed.createComponent(RegistrationCtaComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Đăng Ký Năm Học');
  });

  it('should contain a link to the contact page', () => {
    const fixture = TestBed.createComponent(RegistrationCtaComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[ng-reflect-router-link="/contact"], a[routerlink="/contact"]');
    expect(link).toBeTruthy();
  });
});
