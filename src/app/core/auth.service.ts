import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginResponse } from '../shared/models/login-response';
import { User, UserType } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string = '';

  login(userType: UserType): Observable<LoginResponse> {

    let isAuthenticated = !!(userType && userType !== UserType.None);

    let loginResponse = {
      user: new User(userType, isAuthenticated),
      redirectUrl: this.redirectUrl
    }

    return of(loginResponse);
  }
}
