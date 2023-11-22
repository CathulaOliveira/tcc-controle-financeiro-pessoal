import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Goal } from '../models/goal';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private selectedGoalSubject = new BehaviorSubject<Goal>(null);
  selectedGoal$ = this.selectedGoalSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${API_CONFIG.baseUrl}/goals`)
  }

  save(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(`${API_CONFIG.baseUrl}/goals`, goal)
  }

  update(goal: Goal): Observable<Goal> {
    return this.http.put<Goal>(`${API_CONFIG.baseUrl}/goals`, goal)
  }

  delete(id: number): Observable<Goal> {
    return this.http.delete<Goal>(`${API_CONFIG.baseUrl}/goals/${id}`)
  }

  findByUserLogged(): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${API_CONFIG.baseUrl}/goals/find-by-user-logged`)
  }

  setSelectedGoal(goal?: Goal) {
    this.selectedGoalSubject.next(goal);
  }

  getAverageValue(categoryId: number): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/goals/get-average-value/${categoryId}`)
  }
}
