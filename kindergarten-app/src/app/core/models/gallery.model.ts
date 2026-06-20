import { AgeGroup } from './program.model';

export type AlbumCategory =
  | 'hoat-dong-hoc'
  | 'vui-choi'
  | 'le-hoi'
  | 'co-so-vat-chat'
  | 'tham-quan';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  ageGroup: AgeGroup | 'all';
  category: AlbumCategory;
  images: GalleryImage[];
  createdAt: string;
}
