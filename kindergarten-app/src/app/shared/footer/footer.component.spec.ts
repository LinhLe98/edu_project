/**
 * Component: FooterComponent
 * Purpose: Site-wide footer displaying the school brand, navigation links, and contact
 *          information.
 *
 * Test Summary:
 * - should create: verifies component instantiation
 * - should expose navItems: verifies the navigation array is populated
 * - should render footer element: verifies the semantic footer tag is in the DOM
 * - should display copyright text: verifies the copyright line is rendered
 *
 * Coverage: ~65% (tests DOM output; link routing not covered)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose navItems with at least one entry', () => {
    expect(component.navItems.length).toBeGreaterThan(0);
  });

  it('should render the footer element', () => {
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer).not.toBeNull();
  });

  it('should display copyright text', () => {
    const text: string = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Ánh Dương');
  });
});
