import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { StaffService } from '../../core/services/staff.service';
import { StaffMember, StaffDepartment } from '../../core/models';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { CardTeacherComponent } from '../../shared/cards/card-teacher/card-teacher.component';

const GROUP_META: Record<string, { label: string; subtitle: string }> = {
  'to-giao-vien-la': {
    label: 'Tổ Giáo Viên Lớp Lá (5 tuổi)',
    subtitle: 'Đội ngũ giáo viên chuẩn bị kiến thức vào lớp 1 cho bé 5 tuổi',
  },
  'to-giao-vien-choi': {
    label: 'Tổ Giáo Viên Lớp Chồi (4 tuổi)',
    subtitle: 'Đội ngũ giáo viên phát triển ngôn ngữ và tư duy cho bé 4 tuổi',
  },
  'to-giao-vien-mam': {
    label: 'Tổ Giáo Viên Lớp Mầm (3 tuổi)',
    subtitle: 'Đội ngũ giáo viên chăm sóc và nuôi dưỡng bé 3 tuổi',
  },
};

@Component({
  selector: 'app-teacher-group-detail',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, PageHeroComponent, CardTeacherComponent],
  templateUrl: './teacher-group-detail.component.html',
})
export class TeacherGroupDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private staffService = inject(StaffService);
  private destroyRef = inject(DestroyRef);

  groupLabel = signal('');
  groupSubtitle = signal('');
  members = signal<StaffMember[]>([]);

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(params => {
        const dept = (params.get('dept') ?? '') as StaffDepartment;
        const meta = GROUP_META[dept];
        this.groupLabel.set(meta?.label ?? 'Tổ Giáo Viên');
        this.groupSubtitle.set(meta?.subtitle ?? '');
        return this.staffService.getByDepartment(dept);
      })
    ).subscribe(members => this.members.set(members));
  }
}
