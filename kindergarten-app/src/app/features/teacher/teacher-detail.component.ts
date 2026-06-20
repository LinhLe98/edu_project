import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { switchMap, catchError, of } from 'rxjs';
import { StaffService } from '../../core/services/staff.service';
import { StaffMember } from '../../core/models';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, PageHeroComponent],
  templateUrl: './teacher-detail.component.html',
})
export class TeacherDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private staffService = inject(StaffService);
  private destroyRef = inject(DestroyRef);

  teacher = signal<StaffMember | null>(null);
  colleagues = signal<StaffMember[]>([]);

  get departmentLabel(): string {
    const map: Record<string, string> = {
      'BAN_GIAM_HIEU': 'Ban Giám Hiệu',
      'TO_GIAO_VIEN_LA': 'Tổ Giáo Viên Lớp Lá',
      'TO_GIAO_VIEN_CHOI': 'Tổ Giáo Viên Lớp Chồi',
      'TO_GIAO_VIEN_MAM': 'Tổ Giáo Viên Lớp Mầm',
      'TO_NHAN_VIEN': 'Nhân Viên',
    };
    const t = this.teacher();
    return t ? (map[t.department] ?? t.department) : '';
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(params => {
        const id = params.get('id') ?? '';
        return this.staffService.getById(id).pipe(
          catchError(() => {
            this.router.navigate(['/about']);
            return of(null);
          })
        );
      })
    ).subscribe(found => {
      if (!found) return;
      this.teacher.set(found);
      this.staffService.getByDepartment(found.department).subscribe(members => {
        this.colleagues.set(members.filter(s => s.id !== found.id));
      });
    });
  }
}
