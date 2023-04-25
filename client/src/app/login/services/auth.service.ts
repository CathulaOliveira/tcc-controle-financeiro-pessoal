import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { User } from '../../user/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(
    private http:HttpClient,
  ) { }

  authenticate(login: Credential): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, login);
  }

  sucessFullLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    this.logout();
    return false;
  }

  logout() {
    localStorage.clear();
  }
}
