import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TypeGoal } from '../models/type-goal';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TypeGoalService {

  private selectedTypeGoalSubject = new BehaviorSubject<TypeGoal>(null);
  selectedTypeGoal$ = this.selectedTypeGoalSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<TypeGoal[]> {
    return this.http.get<TypeGoal[]>(`${API_CONFIG.baseUrl}/type-goal`)
  }

  save(typeGoal: TypeGoal): Observable<TypeGoal> {
    return this.http.post<TypeGoal>(`${API_CONFIG.baseUrl}/type-goal`, typeGoal)
  }

  update(typeGoal: TypeGoal): Observable<TypeGoal> {
    return this.http.put<TypeGoal>(`${API_CONFIG.baseUrl}/type-goal`, typeGoal)
  }

  delete(id: number): Observable<TypeGoal> {
    return this.http.delete<TypeGoal>(`${API_CONFIG.baseUrl}/type-goal/${id}`)
  }

  setSelectedTypeGoal(typeGoal?: TypeGoal) {
    this.selectedTypeGoalSubject.next(typeGoal);
  }
}
