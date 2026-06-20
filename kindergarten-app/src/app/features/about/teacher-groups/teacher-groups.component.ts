import { Component, inject, OnInit, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StaffService } from '../../../core/services/staff.service';
import { SectionHeadingComponent } from '../../../shared/section-heading/section-heading.component';
import { CardTeacherComponent } from '../../../shared/cards/card-teacher/card-teacher.component';
import { StaffMember, StaffDepartment } from '../../../core/models';

@Component({
  selector: 'app-teacher-groups',
  standalone: true,
  imports: [NgFor, RouterLink, SectionHeadingComponent, CardTeacherComponent],
  templateUrl: './teacher-groups.component.html',
  styleUrl: './teacher-groups.component.css',
})
export class TeacherGroupsComponent implements OnInit {
  private staffService = inject(StaffService);

  groups = signal<{ label: string; dept: StaffDepartment; members: StaffMember[] }[]>([]);

  private deptMeta: { label: string; dept: StaffDepartment }[] = [
    { label: 'Tổ Giáo Viên Lớp Lá (5 tuổi)', dept: 'to-giao-vien-la' },
    { label: 'Tổ Giáo Viên Lớp Chồi (4 tuổi)', dept: 'to-giao-vien-choi' },
    { label: 'Tổ Giáo Viên Lớp Mầm (3 tuổi)', dept: 'to-giao-vien-mam' },
  ];

  ngOnInit() {
    forkJoin(
      this.deptMeta.map(m => this.staffService.getByDepartment(m.dept))
    ).subscribe(results => {
      this.groups.set(
        this.deptMeta.map((m, i) => ({
          ...m,
          members: results[i]
            .filter(s => s.groupRole === 'LEADER' || s.groupRole === 'VICE_LEADER')
            .slice(0, 3),
        }))
      );
    });
  }
}
