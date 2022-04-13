import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { getIsAuthenticatd } from './state/user.reducer';
import { UserState } from './state/user.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAuth$: Observable<boolean> | undefined;

  constructor(private authService: AuthService, private router: Router,
    private store: Store<UserState>) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.store.select(getIsAuthenticatd).pipe(
        map(auth => {
          if(auth) {
            return true;
          } 
          else {
            this.authService.redirectUrl = state.url;
            this.router.navigate(['/login']);
  
            return false;
          }
        })
      );
  }
}
