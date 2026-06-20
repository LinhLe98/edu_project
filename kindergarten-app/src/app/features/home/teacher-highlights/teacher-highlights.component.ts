import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StaffService } from '../../../core/services/staff.service';
import { SectionHeadingComponent } from '../../../shared/section-heading/section-heading.component';
import { CardTeacherComponent } from '../../../shared/cards/card-teacher/card-teacher.component';

@Component({
  selector: 'app-teacher-highlights',
  standalone: true,
  imports: [NgFor, RouterLink, SectionHeadingComponent, CardTeacherComponent],
  templateUrl: './teacher-highlights.component.html',
  styleUrl: './teacher-highlights.component.css',
})
export class TeacherHighlightsComponent {
  private staffService = inject(StaffService);
  private allFeatured = toSignal(this.staffService.getFeatured(), { initialValue: [] });
  featured = computed(() => this.allFeatured().slice(0, 4));
}
