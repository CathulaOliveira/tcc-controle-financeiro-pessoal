import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
  ) { }

  generate(): Observable<Blob> {
    return this.http.get(`${API_CONFIG.baseUrl}/report/generate`, {
      responseType: 'blob'
    });
  }
}
