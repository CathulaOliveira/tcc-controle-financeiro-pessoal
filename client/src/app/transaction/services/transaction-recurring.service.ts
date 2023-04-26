import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RecurringTransaction } from '../models/transaction-recurring';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RecurringTransactionService {

  private selectedRecurringTransactionSubject = new BehaviorSubject<RecurringTransaction>(null);
  selectedRecurringTransaction$ = this.selectedRecurringTransactionSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<RecurringTransaction[]> {
    return this.http.get<RecurringTransaction[]>(`${API_CONFIG.baseUrl}/recurring-transactions`)
  }

  save(recurringTransaction: RecurringTransaction): Observable<RecurringTransaction> {
    return this.http.post<RecurringTransaction>(`${API_CONFIG.baseUrl}/recurring-transactions`, recurringTransaction)
  }

  update(recurringTransaction: RecurringTransaction): Observable<RecurringTransaction> {
    return this.http.put<RecurringTransaction>(`${API_CONFIG.baseUrl}/recurring-transactions`, recurringTransaction)
  }

  delete(id: number): Observable<RecurringTransaction> {
    return this.http.delete<RecurringTransaction>(`${API_CONFIG.baseUrl}/recurring-transactions/${id}`)
  }

  findByUserLogged(): Observable<RecurringTransaction[]> {
    return this.http.get<RecurringTransaction[]>(`${API_CONFIG.baseUrl}/recurring-transactions/find-by-user-logged`)
  }

  setSelectedRecurringTransaction(recurringTransaction?: RecurringTransaction) {
    this.selectedRecurringTransactionSubject.next(recurringTransaction);
  }
}
