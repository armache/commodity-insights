import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserType } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string = '';

  login(userType: UserType): Observable<{user: User, redirectUrl: string}> {

    let isAuthenticated = !!(userType && userType !== UserType.None);

    let loginResponse = {
      user: new User(userType, isAuthenticated),
      redirectUrl: this.redirectUrl
    }

    return of(loginResponse);
  }
}
