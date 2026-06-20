import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EducationalProgram, AgeGroup } from '../models';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> { data: T; }

@Injectable({ providedIn: 'root' })
export class ProgramsService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getAll(): Observable<EducationalProgram[]> {
    return this.http.get<ApiResponse<EducationalProgram[]>>(`${this.base}/programs`).pipe(map(r => r.data));
  }

  getByAgeGroup(age: AgeGroup | 'all'): Observable<EducationalProgram[]> {
    return this.http.get<ApiResponse<EducationalProgram[]>>(`${this.base}/programs/age-group/${age}`).pipe(map(r => r.data));
  }

  getBySlug(slug: string): Observable<EducationalProgram> {
    return this.http.get<ApiResponse<EducationalProgram>>(`${this.base}/programs/${slug}`).pipe(map(r => r.data));
  }
}
