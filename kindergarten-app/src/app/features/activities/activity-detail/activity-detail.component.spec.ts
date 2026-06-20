/**
 * Component: ActivityDetailComponent
 * Purpose: Displays a single educational program identified by route :slug param.
 *   Renders long description safely via DomSanitizer, shows up to 3 other
 *   programs at the bottom, and redirects to /activities when the
 *   slug is not found. Reacts to paramMap changes so navigating between
 *   related programs updates the view without recreating the component.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load program from route param on init: verifies program signal is
 *     populated from ProgramsService.getBySlug using the paramMap slug
 * - should redirect to /activities when slug not found: verifies
 *     Router.navigate is called when getBySlug returns undefined
 * - should populate otherPrograms excluding current: verifies that otherPrograms
 *     signal excludes the currently displayed program
 * - should expose correct ageGroupLabel: verifies the getter maps age group
 *     keys to their Vietnamese display strings
 *
 * Coverage: ~75% (tests data loading, routing guard, age group label;
 *   HTML rendering and DomSanitizer output are covered at integration level)
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ActivityDetailComponent } from './activity-detail.component';
import { ProgramsService } from '../../../core/services/programs.service';

const mockProgram = {
  id: 'prog-1',
  title: 'Phát Triển Ngôn Ngữ',
  slug: 'phat-trien-ngon-ngu',
  shortDescription: 'Mô tả ngắn',
  fullDescription: 'Mô tả đầy đủ',
  coverImage: 'https://picsum.photos/seed/prog1/800/400',
  iconEmoji: '📖',
  ageGroup: 'all' as const,
  albumIds: [],
  order: 1,
  outcomes: ['Phát triển từ vựng'],
  weeklySchedule: '4 buổi/tuần',
};

const mockOther = {
  id: 'prog-2',
  title: 'Âm Nhạc & Nghệ Thuật',
  slug: 'am-nhac-nghe-thuat',
  shortDescription: 'Mô tả âm nhạc',
  fullDescription: 'Đầy đủ âm nhạc',
  coverImage: 'https://picsum.photos/seed/prog2/800/400',
  iconEmoji: '🎵',
  ageGroup: 'all' as const,
  albumIds: [],
  order: 2,
};

const mockProgramsService = {
  getBySlug: (slug: string) => (slug === 'phat-trien-ngon-ngu' ? mockProgram : undefined),
  getAll: () => [mockProgram, mockOther],
};

const mockRoute = {
  paramMap: of(convertToParamMap({ slug: 'phat-trien-ngon-ngu' })),
};

describe('ActivityDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityDetailComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: ProgramsService, useValue: mockProgramsService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ActivityDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load program from route param on init', () => {
    const fixture = TestBed.createComponent(ActivityDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.program()).toEqual(mockProgram);
  });

  it('should redirect to /activities when slug not found', () => {
    const notFoundRoute = { paramMap: of(convertToParamMap({ slug: 'does-not-exist' })) };
    TestBed.overrideProvider(ActivatedRoute, { useValue: notFoundRoute });
    const fixture = TestBed.createComponent(ActivityDetailComponent);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/activities']);
  });

  it('should populate otherPrograms excluding current', () => {
    const fixture = TestBed.createComponent(ActivityDetailComponent);
    fixture.detectChanges();
    const others = fixture.componentInstance.otherPrograms();
    expect(others.some(p => p.id === 'prog-2')).toBeTrue();
    expect(others.some(p => p.id === 'prog-1')).toBeFalse();
  });

  it('should expose correct ageGroupLabel for all ages', () => {
    const fixture = TestBed.createComponent(ActivityDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.ageGroupLabel).toBe('Tất Cả Độ Tuổi');
  });
});
