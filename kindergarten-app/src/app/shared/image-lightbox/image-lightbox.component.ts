import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { NgIf } from '@angular/common';
import { GalleryImage } from '../../core/models';

@Component({
  selector: 'app-image-lightbox',
  standalone: true,
  imports: [NgIf],
  templateUrl: './image-lightbox.component.html',
  styleUrl: './image-lightbox.component.css',
})
export class ImageLightboxComponent {
  @Input() images: GalleryImage[] = [];
  @Input() set startIndex(i: number) { this._index.set(i); }
  @Input() open = false;
  @Output() closeEvent = new EventEmitter<void>();

  _index = signal(0);
  zoomLevel = signal(1);

  currentImage = computed(() => this.images[this._index()]);

  prev() {
    this._index.update(i => (i - 1 + this.images.length) % this.images.length);
    this.zoomLevel.set(1);
  }

  next() {
    this._index.update(i => (i + 1) % this.images.length);
    this.zoomLevel.set(1);
  }

  zoomIn() {
    this.zoomLevel.update(z => Math.min(z + 0.25, 3));
  }

  zoomOut() {
    this.zoomLevel.update(z => Math.max(z - 0.25, 0.5));
  }

  resetZoom() {
    this.zoomLevel.set(1);
  }

  close() {
    this.zoomLevel.set(1);
    this.closeEvent.emit();
  }

  downloadImage() {
    const img = this.currentImage();
    if (!img) return;
    const a = document.createElement('a');
    a.href = img.src;
    a.download = img.alt || `photo-${this._index() + 1}.jpg`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('lightbox-backdrop')) {
      this.close();
    }
  }

  get position(): string {
    return `${this._index() + 1} / ${this.images.length}`;
  }
}
