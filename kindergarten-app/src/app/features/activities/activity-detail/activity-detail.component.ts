import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { switchMap, catchError, of } from 'rxjs';
import { ProgramsService } from '../../../core/services/programs.service';
import { EducationalProgram } from '../../../core/models';
import { PageHeroComponent } from '../../../shared/page-hero/page-hero.component';

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, PageHeroComponent],
  templateUrl: './activity-detail.component.html',
})
export class ActivityDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private programsService = inject(ProgramsService);
  private sanitizer = inject(DomSanitizer);
  private destroyRef = inject(DestroyRef);

  program = signal<EducationalProgram | null>(null);
  otherPrograms = signal<EducationalProgram[]>([]);

  get safeLongDescription(): SafeHtml {
    const p = this.program();
    if (!p?.longDescription) return '';
    return this.sanitizer.bypassSecurityTrustHtml(p.longDescription);
  }

  get ageGroupLabel(): string {
    const map: Record<string, string> = {
      'all': 'Tất Cả Độ Tuổi',
      '3-tuoi': 'Lớp Mầm (3 tuổi)',
      '4-tuoi': 'Lớp Chồi (4 tuổi)',
      '5-tuoi': 'Lớp Lá (5 tuổi)',
    };
    const p = this.program();
    return p ? (map[p.ageGroup] ?? p.ageGroup) : '';
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(params => {
        const slug = params.get('slug') ?? '';
        return this.programsService.getBySlug(slug).pipe(
          catchError(() => {
            this.router.navigate(['/activities']);
            return of(null);
          })
        );
      })
    ).subscribe(found => {
      if (!found) return;
      this.program.set(found);
      this.programsService.getAll().subscribe(all => {
        this.otherPrograms.set(all.filter(p => p.id !== found.id).slice(0, 3));
      });
    });
  }
}
