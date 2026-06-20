import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { GalleryImage } from '../../core/models';

@Component({
  selector: 'app-image-gallery-grid',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './image-gallery-grid.component.html',
  styleUrl: './image-gallery-grid.component.css',
})
export class ImageGalleryGridComponent {
  @Input() images: GalleryImage[] = [];
  @Output() imageClick = new EventEmitter<number>();
}
