import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeroSlide } from '../models';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> { data: T; }

@Injectable({ providedIn: 'root' })
export class SlidesService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getHeroSlides(): Observable<HeroSlide[]> {
    return this.http.get<ApiResponse<HeroSlide[]>>(`${this.base}/slides`).pipe(map(r => r.data));
  }
}
