import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [NgIf],
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.css',
})
export class SectionHeadingComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() badge = '';
  @Input() badgeClass = 'bg-peach-100 text-peach-500';
  @Input() accentClass = 'bg-peach-400';
  @Input() align: 'center' | 'left' = 'center';
}
