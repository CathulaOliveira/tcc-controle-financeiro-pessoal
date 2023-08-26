import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from '../models/dashboard';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
  ) { }

  findFilter(filter): Observable<Dashboard> {
    return this.http.post<Dashboard>(`${API_CONFIG.baseUrl}/dashboard`, filter)
  }
}
