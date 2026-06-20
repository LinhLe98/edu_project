import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { ContactInfo } from '../../../core/models';

@Component({
  selector: 'app-contact-info-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './contact-info-card.component.html',
  styleUrl: './contact-info-card.component.css',
})
export class ContactInfoCardComponent {
  @Input() info!: ContactInfo;

  platformIcon(platform: string): string {
    const map: Record<string, string> = {
      facebook: '📘', zalo: '💬', youtube: '▶️', tiktok: '🎵'
    };
    return map[platform] ?? '🔗';
  }
}
