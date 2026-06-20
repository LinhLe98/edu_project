import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GalleryService } from '../../../core/services/gallery.service';
import { GalleryAlbum } from '../../../core/models';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { ImageGalleryGridComponent } from '../../../shared/image-gallery-grid/image-gallery-grid.component';
import { ImageLightboxComponent } from '../../../shared/image-lightbox/image-lightbox.component';

export interface AlbumReaction {
  emoji: string;
  label: string;
  count: number;
  reacted: boolean;
}

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, BreadcrumbComponent, ImageGalleryGridComponent, ImageLightboxComponent],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css',
})
export class AlbumDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private galleryService = inject(GalleryService);

  album = signal<GalleryAlbum | null>(null);
  lightboxOpen = signal(false);
  lightboxIndex = signal(0);

  reactions = signal<AlbumReaction[]>([
    { emoji: '❤️', label: 'Yêu thích', count: 0, reacted: false },
    { emoji: '😊', label: 'Thú vị', count: 0, reacted: false },
    { emoji: '🎉', label: 'Tuyệt vời', count: 0, reacted: false },
    { emoji: '👏', label: 'Ấn tượng', count: 0, reacted: false },
  ]);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.galleryService.getAlbumById(id).subscribe(album => this.album.set(album));
    }
  }

  get formattedDate(): string {
    const a = this.album();
    if (!a) return '';
    return new Date(a.createdAt).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }

  openLightbox(index: number) {
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.classList.add('lightbox-open');
  }

  closeLightbox() {
    this.lightboxOpen.set(false);
    document.body.classList.remove('lightbox-open');
  }

  react(index: number) {
    this.reactions.update(rs =>
      rs.map((r, i) =>
        i === index
          ? { ...r, count: r.reacted ? r.count - 1 : r.count + 1, reacted: !r.reacted }
          : r
      )
    );
  }
}
