import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { RecurringTransaction } from 'src/app/transaction/models/transaction-recurring';
import { CashFlow } from '../models/cash-flow';

@Injectable({
  providedIn: 'root'
})
export class CashFlowService {

  constructor(
    private http: HttpClient,
  ) { }

  findFilter(filter): Observable<CashFlow> {
    return this.http.post<CashFlow>(`${API_CONFIG.baseUrl}/cash-flow`, filter)
  }
}
