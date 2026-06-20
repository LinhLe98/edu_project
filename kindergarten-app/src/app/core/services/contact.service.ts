import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactInfo } from '../models';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> { data: T; }

export interface SupportRequestPayload {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getContactInfo(): Observable<ContactInfo> {
    return this.http.get<ApiResponse<ContactInfo>>(`${this.base}/contact`).pipe(map(r => r.data));
  }

  submitSupportRequest(payload: SupportRequestPayload): Observable<void> {
    return this.http.post<void>(`${this.base}/contact/support-requests`, payload);
  }
}
