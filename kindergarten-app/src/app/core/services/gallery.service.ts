import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GalleryAlbum, AgeGroup, AlbumCategory } from '../models';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> { data: T; }

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getAll(): Observable<GalleryAlbum[]> {
    return this.http.get<ApiResponse<GalleryAlbum[]>>(`${this.base}/gallery/albums`).pipe(map(r => r.data));
  }

  getAlbumById(id: string): Observable<GalleryAlbum> {
    return this.http.get<ApiResponse<GalleryAlbum>>(`${this.base}/gallery/albums/${id}`).pipe(map(r => r.data));
  }

  getByAgeGroup(age: AgeGroup | 'all'): Observable<GalleryAlbum[]> {
    return this.http.get<ApiResponse<GalleryAlbum[]>>(`${this.base}/gallery/albums/age-group/${age}`).pipe(map(r => r.data));
  }

  getByCategory(category: AlbumCategory): Observable<GalleryAlbum[]> {
    return this.http.get<ApiResponse<GalleryAlbum[]>>(`${this.base}/gallery/albums/category/${category}`).pipe(map(r => r.data));
  }
}
