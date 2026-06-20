import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [NgIf],
  templateUrl: './page-hero.component.html',
  styleUrl: './page-hero.component.css',
})
export class PageHeroComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() badge = '';
  @Input() bgClass = 'bg-gradient-to-br from-peach-50 via-warm-50 to-sky-50';
  @Input() circleClass = 'bg-peach-300';
}
