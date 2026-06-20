import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor } from '@angular/common';
import { FacilitiesService } from '../../../core/services/facilities.service';
import { SectionHeadingComponent } from '../../../shared/section-heading/section-heading.component';
import { ImageGalleryGridComponent } from '../../../shared/image-gallery-grid/image-gallery-grid.component';
import { ImageLightboxComponent } from '../../../shared/image-lightbox/image-lightbox.component';
import { GalleryImage } from '../../../core/models';

@Component({
  selector: 'app-facilities-section',
  standalone: true,
  imports: [NgFor, SectionHeadingComponent, ImageGalleryGridComponent, ImageLightboxComponent],
  templateUrl: './facilities-section.component.html',
  styleUrl: './facilities-section.component.css',
})
export class FacilitiesSectionComponent {
  private facilitiesService = inject(FacilitiesService);
  facilities = toSignal(this.facilitiesService.getAll(), { initialValue: [] });

  lightboxOpen = signal(false);
  lightboxIndex = signal(0);

  allImages = computed<GalleryImage[]>(() => this.facilities().flatMap(f => f.images.slice(0, 2)));

  openLightbox(index: number) {
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.classList.add('lightbox-open');
  }

  closeLightbox() {
    this.lightboxOpen.set(false);
    document.body.classList.remove('lightbox-open');
  }
}
