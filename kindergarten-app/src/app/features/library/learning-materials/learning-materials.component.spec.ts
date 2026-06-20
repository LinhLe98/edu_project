/**
 * Component: LearningMaterialsComponent
 * Purpose: Displays a grid of downloadable learning material links for parents and children.
 *   viewMaterial opens the file URL in a new tab; downloadMaterial fetches the file as a
 *   blob for a true download, falling back to window.open on CORS or network errors.
 *   Material URLs must point to a working public PDF (not a 404 endpoint).
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should have 9 materials: verifies the materials array contains exactly 9 items
 * - should render material titles in the DOM: verifies at least one material title appears in the template
 * - should call window.open with material URL on viewMaterial: verifies the view action opens
 *     the correct file URL in a new browser tab
 * - material file URLs should not point to the broken W3C PDF path: guards against
 *     regression to the old 404 URL that caused the "document not found" error
 *
 * Coverage: ~80% (tests initialization, data definition, template rendering, and view action)
 */
import { TestBed } from '@angular/core/testing';
import { LearningMaterialsComponent } from './learning-materials.component';
import { LearningMaterial } from '../../../core/models';

describe('LearningMaterialsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningMaterialsComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LearningMaterialsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 9 materials', () => {
    const fixture = TestBed.createComponent(LearningMaterialsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.materials.length).toBe(9);
  });

  it('should render material titles in the DOM', () => {
    const fixture = TestBed.createComponent(LearningMaterialsComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const text = el.textContent ?? '';
    expect(text).toContain('Thực đơn dinh dưỡng');
    expect(text).toContain('Tải xuống');
  });

  it('should call window.open with material URL on viewMaterial', () => {
    const fixture = TestBed.createComponent(LearningMaterialsComponent);
    fixture.detectChanges();
    spyOn(window, 'open');
    const material: LearningMaterial = fixture.componentInstance.materials[0];
    fixture.componentInstance.viewMaterial(material);
    expect(window.open).toHaveBeenCalledWith(material.fileUrl, '_blank');
  });

  it('material file URLs should not point to the broken W3C PDF path', () => {
    const fixture = TestBed.createComponent(LearningMaterialsComponent);
    fixture.detectChanges();
    const brokenUrl = 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF2.pdf';
    const broken = fixture.componentInstance.materials.filter(m => m.fileUrl === brokenUrl);
    expect(broken.length).toBe(0);
  });
});
