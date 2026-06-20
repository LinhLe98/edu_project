import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StaffMember } from '../../../core/models';

@Component({
  selector: 'app-card-teacher',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './card-teacher.component.html',
  styleUrl: './card-teacher.component.css',
})
export class CardTeacherComponent {
  @Input() member!: StaffMember;
}
