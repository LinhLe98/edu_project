import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GalleryAlbum } from '../../../core/models';

@Component({
  selector: 'app-card-album',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-album.component.html',
  styleUrl: './card-album.component.css',
})
export class CardAlbumComponent {
  @Input() album!: GalleryAlbum;

  get ageLabel(): string {
    const map: Record<string, string> = {
      '3-tuoi': 'Mầm', '4-tuoi': 'Chồi', '5-tuoi': 'Lá', 'all': 'Tất cả'
    };
    return map[this.album.ageGroup] ?? this.album.ageGroup;
  }
}
