import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-badge',
  standalone: true,
  templateUrl: './tag-badge.component.html',
  styleUrl: './tag-badge.component.css',
})
export class TagBadgeComponent {
  @Input() label = '';
  @Input() colorClass = 'bg-peach-100 text-peach-500';
}
