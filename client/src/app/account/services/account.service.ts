import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Account } from 'src/app/models/account';

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
}
