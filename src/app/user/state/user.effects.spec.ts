import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from "rxjs";
import { AuthService } from "src/app/core/auth.service";
import { UserEffects } from "./user.effects";
import { UserState } from "./user.state";
import * as UserActions from "./user.actions";
import { LoginResponse } from "src/app/shared/models/login-response";
import { User, UserType } from "../user";
import { Router } from "@angular/router";

describe('UserEffects', () => {
    let actions$: Observable<any>;
    let effects: UserEffects;
    let store: MockStore<UserState>;
    let authService: AuthService;
    let routerMock = {
        navigate: jasmine.createSpy('navigate'),
        navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserEffects,
                provideMockActions(() => actions$),
                provideMockStore({}),
                { provide: Router, useValue: routerMock },
            ],
        });

        effects = TestBed.inject(UserEffects);
        store = TestBed.inject(MockStore);
        authService = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('should fire LOGIN_SUCCESS on successful login', (done) => {

        const mockedLoginResponse: LoginResponse = {
            user: new User(UserType.Trader, true),
            redirectUrl: ''
        };

        const spy = spyOn(authService, 'login').and.callFake(() => {
            return of(mockedLoginResponse);
        });

        actions$ = of(UserActions.LOGIN);

        effects.loginUser$.subscribe((result: any) => {
            expect(result).toEqual(UserActions.LOGIN_SUCCESS({ user: mockedLoginResponse.user, redirectUrl: mockedLoginResponse.redirectUrl }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should fire LOGIN_FAIL when error is thrown on login', (done) => {

        const errorMsg = 'some error';
        const spy = spyOn(authService, 'login').and.callFake(() => {
            return throwError(() => errorMsg)
        });

        actions$ = of(UserActions.LOGIN);

        effects.loginUser$.subscribe((result: any) => {
            expect(result).toEqual(UserActions.LOGIN_FAIL({ error: errorMsg }));
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should redirect to specified redirect url on LOGIN_SUCCESS action', (done) => {

        const mockedLoginResponse: LoginResponse = {
            user: new User(UserType.Trader, true),
            redirectUrl: '/dashboard?test=1'
        };

        actions$ = of(UserActions.LOGIN_SUCCESS(mockedLoginResponse));

        effects.loginSuccess$.subscribe((response: LoginResponse) => {
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith(response.redirectUrl);
            expect(response.redirectUrl).toEqual(mockedLoginResponse.redirectUrl);
            done();
        });
    });

    it('should redirect to dashboard page by default on LOGIN_SUCCESS action', (done) => {

        const mockedLoginResponse: LoginResponse = {
            user: new User(UserType.Trader, true),
            redirectUrl: ''
        };

        actions$ = of(UserActions.LOGIN_SUCCESS(mockedLoginResponse));

        effects.loginSuccess$.subscribe((response: LoginResponse) => {
            expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
            expect(response.redirectUrl).toEqual(mockedLoginResponse.redirectUrl);
            done();
        });
    });

    it('should log error on console when LOGIN_FAIL action is dispatched', (done) => {

        const consoleSpy = spyOn(console, 'log');
        const errorMsg = 'some error';
        actions$ = of(UserActions.LOGIN_FAIL({error: errorMsg}));        

        effects.loginFail$.subscribe((response: any) => {
            expect(consoleSpy).toHaveBeenCalledWith(errorMsg);
            done();
        });
    });

    it('should redirect to login page when LOGOUT action is dispatched', (done) => {

        actions$ = of(UserActions.LOGOUT());

        effects.logout$.subscribe(() => {
            expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
            done();
        });
    });
});