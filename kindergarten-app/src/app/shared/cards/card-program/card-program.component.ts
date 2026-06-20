import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EducationalProgram } from '../../../core/models';

@Component({
  selector: 'app-card-program',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-program.component.html',
  styleUrl: './card-program.component.css',
})
export class CardProgramComponent {
  @Input() program!: EducationalProgram;
}
