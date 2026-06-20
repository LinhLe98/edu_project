import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor } from '@angular/common';
import { ProgramsService } from '../../../core/services/programs.service';
import { SectionHeadingComponent } from '../../../shared/section-heading/section-heading.component';
import { CardProgramComponent } from '../../../shared/cards/card-program/card-program.component';

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [NgFor, SectionHeadingComponent, CardProgramComponent],
  templateUrl: './program-list.component.html',
  styleUrl: './program-list.component.css',
})
export class ProgramListComponent {
  private programsService = inject(ProgramsService);
  programs = toSignal(this.programsService.getAll(), { initialValue: [] });
}
