import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsArticle, NewsCategory, NewsComment, NewsReactionMap } from '../models';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> { data: T; }
interface PageResponse<T> { content: T[]; totalElements: number; totalPages: number; number: number; }

export interface NewsCommentPayload {
  authorName: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getAll(page = 0, size = 100): Observable<NewsArticle[]> {
    return this.http
      .get<ApiResponse<PageResponse<NewsArticle>>>(`${this.base}/news?page=${page}&size=${size}`)
      .pipe(map(r => r.data.content));
  }

  getFeatured(): Observable<NewsArticle[]> {
    return this.http.get<ApiResponse<NewsArticle[]>>(`${this.base}/news/featured`).pipe(map(r => r.data));
  }

  getLatest(count = 3): Observable<NewsArticle[]> {
    return this.http.get<ApiResponse<NewsArticle[]>>(`${this.base}/news/latest?count=${count}`).pipe(map(r => r.data));
  }

  getByCategory(category: NewsCategory): Observable<NewsArticle[]> {
    return this.http.get<ApiResponse<NewsArticle[]>>(`${this.base}/news/category/${category}`).pipe(map(r => r.data));
  }

  getBySlug(slug: string): Observable<NewsArticle> {
    return this.http.get<ApiResponse<NewsArticle>>(`${this.base}/news/${slug}`).pipe(map(r => r.data));
  }

  // Comments

  getComments(slug: string): Observable<NewsComment[]> {
    return this.http.get<ApiResponse<NewsComment[]>>(`${this.base}/news/${slug}/comments`).pipe(map(r => r.data));
  }

  postComment(slug: string, payload: NewsCommentPayload): Observable<NewsComment> {
    return this.http.post<ApiResponse<NewsComment>>(`${this.base}/news/${slug}/comments`, payload)
      .pipe(map(r => r.data));
  }

  // Reactions

  getReactions(slug: string): Observable<NewsReactionMap> {
    return this.http.get<ApiResponse<NewsReactionMap>>(`${this.base}/news/${slug}/reactions`).pipe(map(r => r.data));
  }

  toggleReaction(slug: string, reaction: string, reacted: boolean): Observable<NewsReactionMap> {
    return this.http.post<ApiResponse<NewsReactionMap>>(
      `${this.base}/news/${slug}/reactions/${reaction}?reacted=${reacted}`, null
    ).pipe(map(r => r.data));
  }
}
