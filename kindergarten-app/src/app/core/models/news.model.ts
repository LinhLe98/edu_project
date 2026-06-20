export type NewsCategory = 'su-kien' | 'thong-bao' | 'tin-tuc' | 'hoat-dong';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;   // ISO-8601 with offset, e.g. "2025-09-01T08:00:00+07:00"
  category: NewsCategory;
  tags: string[];
  featured: boolean;
}

export interface NewsComment {
  id: number;
  authorName: string;
  message: string;
  createdAt: string;   // ISO-8601 with offset
}

export interface NewsReactionMap {
  reactions: Record<string, number>;
}
