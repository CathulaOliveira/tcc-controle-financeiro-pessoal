import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { GoalDashboard } from '../models/goal-dashboard';

@Injectable({
  providedIn: 'root'
})
export class GoalDashboardService {

  constructor(
    private http: HttpClient,
  ) { }

  findFilter(filter: number): Observable<GoalDashboard> {
    return this.http.get<GoalDashboard>(`${API_CONFIG.baseUrl}/goal-dashboard/` + filter)
  }

}
