import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeadingComponent } from '../../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-school-overview',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent],
  templateUrl: './school-overview.component.html',
  styleUrl: './school-overview.component.css',
})
export class SchoolOverviewComponent {}
