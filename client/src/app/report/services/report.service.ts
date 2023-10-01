import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { ReportFilter } from '../models/report-filter';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
  ) { }

  generate(filter: ReportFilter): Observable<Blob> {
    return this.http.post(`${API_CONFIG.baseUrl}/report/generate`, filter, {
      responseType: 'blob'
    });
  }
}
