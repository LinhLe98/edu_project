import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LearningMaterial, MaterialCategory } from '../models';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> { data: T; }

@Injectable({ providedIn: 'root' })
export class MaterialsService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getAll(): Observable<LearningMaterial[]> {
    return this.http.get<ApiResponse<LearningMaterial[]>>(`${this.base}/materials`).pipe(map(r => r.data));
  }

  getById(id: string): Observable<LearningMaterial> {
    return this.http.get<ApiResponse<LearningMaterial>>(`${this.base}/materials/${id}`).pipe(map(r => r.data));
  }

  getByCategory(category: MaterialCategory): Observable<LearningMaterial[]> {
    return this.http.get<ApiResponse<LearningMaterial[]>>(`${this.base}/materials/category/${category}`).pipe(map(r => r.data));
  }

  getByAgeGroup(age: string): Observable<LearningMaterial[]> {
    return this.http.get<ApiResponse<LearningMaterial[]>>(`${this.base}/materials/age-group/${age}`).pipe(map(r => r.data));
  }
}
