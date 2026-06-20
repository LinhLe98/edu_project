/**
 * Component: CardProgramComponent
 * Purpose: Displays an educational program card with cover image, emoji icon,
 *          title, short description, and a link to the activities page.
 *
 * Test Summary:
 * - should create: verifies component instantiation with a valid program input
 * - should display program title: verifies @Input program.title is rendered
 * - should display program icon emoji: verifies the emoji span is in the template
 * - should include a link to the activities page: verifies the routerLink destination
 *
 * Coverage: ~70% (covers rendered fields; hover animation not tested)
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CardProgramComponent } from './card-program.component';
import { EducationalProgram } from '../../../core/models';

const mockProgram: EducationalProgram = {
  id: '1',
  title: 'Giáo dục STEM',
  shortDescription: 'Chương trình khám phá khoa học và công nghệ cho trẻ.',
  coverImage: 'https://picsum.photos/seed/prog/600/400',
  iconEmoji: '🔬',
  fullDescription: '',
  ageGroup: '5-tuoi',
};

describe('CardProgramComponent', () => {
  let component: CardProgramComponent;
  let fixture: ComponentFixture<CardProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProgramComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CardProgramComponent);
    component = fixture.componentInstance;
    component.program = mockProgram;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display program title in h3', () => {
    const h3 = fixture.nativeElement.querySelector('h3') as HTMLElement;
    expect(h3.textContent).toContain('Giáo dục STEM');
  });

  it('should display the program icon emoji', () => {
    const text: string = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('🔬');
  });

  it('should contain a link to /activities', () => {
    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor).not.toBeNull();
    expect(anchor.getAttribute('ng-reflect-router-link') ?? anchor.href).toContain('hoat-dong-giao-duc');
  });
});
