import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  authenticate(login: User) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, login, {
      observe: 'response',
      responseType: 'text'
    });
  }

  sucessFullLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    
  }
}
