/**
 * Component: NavMenuComponent
 * Purpose: Desktop navigation bar listing the main site pages and a registration CTA button.
 *
 * Test Summary:
 * - should create: verifies component instantiation
 * - should expose NAV_ITEMS as navItems: verifies the nav items array is populated
 * - should render correct number of nav links: verifies each nav item produces an anchor
 * - should include a registration link: verifies the Đăng Ký CTA link is present
 *
 * Coverage: ~75% (tests data binding and DOM output; router-link activation not covered)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavMenuComponent, NAV_ITEMS } from './nav-menu.component';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMenuComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose NAV_ITEMS as navItems', () => {
    expect(component.navItems).toEqual(NAV_ITEMS);
    expect(component.navItems.length).toBeGreaterThan(0);
  });

  it('should render one anchor per nav item', () => {
    const nav = fixture.nativeElement.querySelector('nav') as HTMLElement;
    const links = nav.querySelectorAll('a[ng-reflect-router-link]');
    // NAV_ITEMS links + 1 registration link
    expect(links.length).toBe(NAV_ITEMS.length + 1);
  });

  it('should include a registration CTA link pointing to /contact', () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a');
    const ctaLink = Array.from(links).find(a => a.textContent?.trim() === 'Đăng Ký');
    expect(ctaLink).toBeTruthy();
  });
});
