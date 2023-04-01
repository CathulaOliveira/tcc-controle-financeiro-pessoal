import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Account } from 'src/app/account/models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

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
    return this.http.put<Account>(`${API_CONFIG.baseUrl}/accounts`, account)
  }
}
