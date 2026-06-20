import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GalleryService } from '../../../core/services/gallery.service';
import { SectionHeadingComponent } from '../../../shared/section-heading/section-heading.component';
import { CardAlbumComponent } from '../../../shared/cards/card-album/card-album.component';

@Component({
  selector: 'app-activity-album-links',
  standalone: true,
  imports: [NgFor, RouterLink, SectionHeadingComponent, CardAlbumComponent],
  templateUrl: './activity-album-links.component.html',
  styleUrl: './activity-album-links.component.css',
})
export class ActivityAlbumLinksComponent {
  private galleryService = inject(GalleryService);
  private allAlbums = toSignal(this.galleryService.getAll(), { initialValue: [] });
  albums = computed(() => this.allAlbums().slice(0, 6));
}
