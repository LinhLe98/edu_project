import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor } from '@angular/common';
import { StaffService } from '../../../core/services/staff.service';
import { SectionHeadingComponent } from '../../../shared/section-heading/section-heading.component';
import { CardTeacherComponent } from '../../../shared/cards/card-teacher/card-teacher.component';

@Component({
  selector: 'app-management-board',
  standalone: true,
  imports: [NgFor, SectionHeadingComponent, CardTeacherComponent],
  templateUrl: './management-board.component.html',
  styleUrl: './management-board.component.css',
})
export class ManagementBoardComponent {
  private staffService = inject(StaffService);
  management = toSignal(this.staffService.getManagement(), { initialValue: [] });
}
