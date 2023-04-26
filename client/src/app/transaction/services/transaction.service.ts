import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../models/transaction';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private selectedTransactionSubject = new BehaviorSubject<Transaction>(null);
  selectedTransaction$ = this.selectedTransactionSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${API_CONFIG.baseUrl}/transactions`)
  }

  save(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${API_CONFIG.baseUrl}/transactions`, transaction)
  }

  update(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${API_CONFIG.baseUrl}/transactions`, transaction)
  }

  delete(id: number): Observable<Transaction> {
    return this.http.delete<Transaction>(`${API_CONFIG.baseUrl}/transactions/${id}`)
  }

  findByUserLogged(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${API_CONFIG.baseUrl}/transactions/find-by-user-logged`)
  }

  setSelectedTransaction(transaction?: Transaction) {
    this.selectedTransactionSubject.next(transaction);
  }
}
