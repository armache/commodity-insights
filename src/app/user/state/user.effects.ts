import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { AuthService } from "src/app/core/auth.service";
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
    
    constructor(private actions$: Actions, private authService: AuthService,
        private router: Router) {

    }

    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.LOGIN),
            exhaustMap(payload => this.authService.login(payload.userType).pipe(
                map(({user, redirectUrl}) => UserActions.LOGIN_SUCCESS({ user, redirectUrl })),
                catchError(error => of(UserActions.LOGIN_FAIL({ error })))
            ))
        );
    });

    loginSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.LOGIN_SUCCESS),
            tap(payload => {
                if (payload.redirectUrl) {
                    this.router.navigateByUrl(payload.redirectUrl);
                } else {
                    this.router.navigate(['/dashboard']);
                }
            })
        ),
        { dispatch: false }
    );

    loginFail$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.LOGIN_FAIL),
            tap(err => console.log(err.error))
        ),
        { dispatch: false }
    );

    logout$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.LOGOUT),
            tap(() => this.router.navigate(['/login']))
        ),
        { dispatch: false }
    );
}