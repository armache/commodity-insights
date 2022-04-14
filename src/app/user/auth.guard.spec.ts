import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { getIsAuthenticatd, initialUserState } from './state/user.reducer';
import { UserState } from './state/user.state';
import { Observable } from 'rxjs';

describe('AuthGuard', () => {

    let guard: AuthGuard;
    let routeMock: any = { snapshot: {} };
    let routeStateMock: any = { snapshot: {}, url: '/dashboard' };
    let routerMock = { navigate: jasmine.createSpy('navigate') };
    let mockStore: MockStore<UserState>;

    const initialState: UserState = initialUserState;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                { provide: Router, useValue: routerMock },
                provideMockStore({initialState})
            ]
        });

        guard = TestBed.inject(AuthGuard);
        mockStore = TestBed.inject(MockStore);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should return "true" when user is authenticated', () => {

        mockStore.overrideSelector(getIsAuthenticatd, true);

        (<Observable<boolean>>guard.canActivate(routeMock, routeStateMock)).subscribe((result: boolean) => {
            expect(result).toBe(true);
        })
    });

    it('should redirect to the login page when user is not authenticated', () => {

        mockStore.overrideSelector(getIsAuthenticatd, false);

        (<Observable<boolean>>guard.canActivate(routeMock, routeStateMock)).subscribe((result: boolean) => {
            expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
            expect(result).toBe(false);
        })
    });
});

