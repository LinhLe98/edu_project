import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StaffMember, StaffDepartment } from '../models';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> { data: T; }

@Injectable({ providedIn: 'root' })
export class StaffService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getAll(): Observable<StaffMember[]> {
    return this.http.get<ApiResponse<StaffMember[]>>(`${this.base}/staff`).pipe(map(r => r.data));
  }

  getFeatured(): Observable<StaffMember[]> {
    return this.http.get<ApiResponse<StaffMember[]>>(`${this.base}/staff/featured`).pipe(map(r => r.data));
  }

  getManagement(): Observable<StaffMember[]> {
    return this.http.get<ApiResponse<StaffMember[]>>(`${this.base}/staff/management`).pipe(map(r => r.data));
  }

  getTeachers(): Observable<StaffMember[]> {
    return this.http.get<ApiResponse<StaffMember[]>>(`${this.base}/staff/teachers`).pipe(map(r => r.data));
  }

  getById(id: string): Observable<StaffMember> {
    return this.http.get<ApiResponse<StaffMember>>(`${this.base}/staff/${id}`).pipe(map(r => r.data));
  }

  getByDepartment(dept: StaffDepartment): Observable<StaffMember[]> {
    return this.http.get<ApiResponse<StaffMember[]>>(`${this.base}/staff/department/${dept}`).pipe(map(r => r.data));
  }

  getGroupLeader(dept: StaffDepartment): Observable<StaffMember> {
    return this.http.get<ApiResponse<StaffMember>>(`${this.base}/staff/department/${dept}/leader`).pipe(map(r => r.data));
  }

  getGroupViceLeaders(dept: StaffDepartment): Observable<StaffMember[]> {
    return this.http.get<ApiResponse<StaffMember[]>>(`${this.base}/staff/department/${dept}/vice-leaders`).pipe(map(r => r.data));
  }
}
