import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from 'src/app/config/api.config';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
  ) { }

  save(login: User) {
    return this.http.post(`${API_CONFIG.baseUrl}/users`, login, {
      observe: 'response',
      responseType: 'text'
    });
  }
}
