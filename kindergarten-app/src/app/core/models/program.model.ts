import { AlbumCategory } from './gallery.model';

export type AgeGroup = '3-tuoi' | '4-tuoi' | '5-tuoi';

export interface ProgramAlbumRef {
  id: string;
  title: string;
  coverImage: string;
  ageGroup: AgeGroup | 'all';
  category: AlbumCategory;
}

export interface EducationalProgram {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  iconEmoji: string;
  ageGroup: AgeGroup | 'all';
  albums: ProgramAlbumRef[];
  orderIndex: number;
  longDescription?: string;
  outcomes?: string[];
  weeklySchedule?: string;
  featuredImages?: string[];
}
