import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Facility } from '../models';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> { data: T; }

@Injectable({ providedIn: 'root' })
export class FacilitiesService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getAll(): Observable<Facility[]> {
    return this.http.get<ApiResponse<Facility[]>>(`${this.base}/facilities`).pipe(map(r => r.data));
  }
}
