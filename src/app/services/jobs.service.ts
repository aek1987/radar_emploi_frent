import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobsResponse } from '../models/job.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JobsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOffers(): Observable<JobsResponse> {
    return this.http.get<JobsResponse>(`${this.apiUrl}/api/offres`);
  }

  refresh(token: string): Observable<{ ok: boolean; message?: string; error?: string }> {
    const body = new URLSearchParams();
    body.set('token', token);
    return this.http.post<{ ok: boolean; message?: string; error?: string }>(
      `${this.apiUrl}/api/refresh`,
      body.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  getStatus(): Observable<{ running: boolean; error: string | null }> {
    return this.http.get<{ running: boolean; error: string | null }>(`${this.apiUrl}/api/status`);
  }
}
