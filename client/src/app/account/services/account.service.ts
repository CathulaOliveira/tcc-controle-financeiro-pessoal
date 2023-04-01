import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Account } from 'src/app/account/models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private selectedAccountSubject = new BehaviorSubject<Account>(null);
  selectedAccount$ = this.selectedAccountSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<Account[]> {
    return this.http.get<Account[]>(`${API_CONFIG.baseUrl}/accounts`)
  }

  findByUserLogged(): Observable<Account[]> {
    return this.http.get<Account[]>(`${API_CONFIG.baseUrl}/accounts/find-by-user-logged`)
  }

  save(account: Account): Observable<Account> {
    return this.http.post<Account>(`${API_CONFIG.baseUrl}/accounts`, account)
  }

  update(category: Account): Observable<Account> {
    return this.http.put<Account>(`${API_CONFIG.baseUrl}/accounts`, category)
  }

  delete(id: number): Observable<Account> {
    return this.http.delete<Account>(`${API_CONFIG.baseUrl}/accounts/` + id)
  }
  
  setSelectedAccount(account?: Account) {
    this.selectedAccountSubject.next(account);
  }
}
