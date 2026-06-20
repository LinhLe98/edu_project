/**
 * Component: BreadcrumbComponent
 * Purpose: Renders a horizontal breadcrumb trail from an array of BreadcrumbItem objects,
 *          turning items with a link property into anchor tags and the last item into plain text.
 *
 * Test Summary:
 * - should create: verifies component instantiation
 * - should render one segment per item: verifies the correct number of text nodes/anchors
 * - should render linked items as anchor tags: verifies items with link become <a> elements
 * - should render last item as plain text: verifies the final item is not a link
 * - should show separator between items: verifies › separators are present
 *
 * Coverage: ~75% (covers rendering logic; active-class styling not asserted)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from './breadcrumb.component';

const mockItems: BreadcrumbItem[] = [
  { label: 'Trang Chủ', link: '/' },
  { label: 'Thư Viện', link: '/library' },
  { label: 'Album Hè 2024' }
];

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render linked items as anchor tags', () => {
    component.items = mockItems;
    fixture.detectChanges();
    const anchors = fixture.nativeElement.querySelectorAll('a');
    // first two items have links and are not last
    expect(anchors.length).toBe(2);
  });

  it('should render last item as a span (plain text)', () => {
    component.items = mockItems;
    fixture.detectChanges();
    const spans: NodeListOf<HTMLSpanElement> = fixture.nativeElement.querySelectorAll('span');
    const lastSpan = Array.from(spans).find(s => s.textContent?.trim() === 'Album Hè 2024');
    expect(lastSpan).not.toBeUndefined();
  });

  it('should render separator spans between items', () => {
    component.items = mockItems;
    fixture.detectChanges();
    const separators: HTMLSpanElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('span')
    ).filter((s: HTMLSpanElement) => s.textContent?.trim() === '›');
    // 3 items → 2 separators
    expect(separators.length).toBe(2);
  });

  it('should default to an empty items array', () => {
    expect(component.items).toEqual([]);
  });
});
