/**
 * Component: App (root shell)
 * Purpose: Root application shell that composes the Header, router outlet, and Footer
 *          into the main page layout.
 *
 * Test Summary:
 * - should create: verifies the App component instantiates correctly
 * - should render header element: verifies app-header is present in the DOM
 * - should render footer element: verifies app-footer is present in the DOM
 * - should render main element: verifies the main wrapper element is rendered
 *
 * Coverage: ~70% (tests structural rendering, does not cover router navigation)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main')).not.toBeNull();
  });

  it('should render app-header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).not.toBeNull();
  });

  it('should render app-footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });
});
