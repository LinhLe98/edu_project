import { GalleryImage } from './gallery.model';

export interface Facility {
  id: string;
  name: string;
  description: string;
  images: GalleryImage[];
  iconEmoji: string;
}
