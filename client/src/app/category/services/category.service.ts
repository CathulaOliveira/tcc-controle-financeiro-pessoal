import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/cotegory';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private selectedCategorySubject = new BehaviorSubject<Category>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_CONFIG.baseUrl}/categories`)
  }

  findByStatusAtivo(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_CONFIG.baseUrl}/categories/find-by-status-ativo`)
  }

  save(category: Category): Observable<Category> {
    return this.http.post<Category>(`${API_CONFIG.baseUrl}/categories`, category)
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${API_CONFIG.baseUrl}/categories`, category)
  }

  delete(id: number): Observable<Category> {
    return this.http.delete<Category>(`${API_CONFIG.baseUrl}/categories/${id}`)
  }

  setSelectedCategory(category?: Category) {
    this.selectedCategorySubject.next(category);
  }

}
