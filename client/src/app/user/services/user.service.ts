import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from 'src/app/config/api.config';
import { User } from 'src/app/user/models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  jwtService: JwtHelperService = new JwtHelperService();
  private _displayName = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
  ) { }

  save(user: User): Observable<User> {
    return this.http.post<User>(`${API_CONFIG.baseUrl}/users`, user)
  }

  update(user: User) {
    return this.http.put<User>(`${API_CONFIG.baseUrl}/users`, user)
  }

  getUserLogged(): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/users/user-logged`);
  }
  
  get displayName(): string {
    return this._displayName.getValue();
  }

  set displayName(newValue: string) {
    this._displayName.next(newValue);
  }

  displayName$ = this._displayName.asObservable();
}
