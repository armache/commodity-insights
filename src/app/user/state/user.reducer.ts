import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { UserType } from "../user";
import { UserState } from "./user.state";
import * as UserActions from "./user.actions";

const initialUserState: UserState = {
    userType: UserType.None,
    isAuthenticated: false,
    canViewCharts: false,
    error: ''
};

export const userReducer = createReducer<UserState>(
    initialUserState,
    on(UserActions.LOGIN_SUCCESS, (state, payload): UserState => {
        return  {
            ...state,
            userType: payload.user.userType,
            isAuthenticated: payload.user.isAuthenticated,
            canViewCharts: (payload.user.userType === UserType.Trader) ? true : false,
            error: ''            
        }
    }),
    on(UserActions.LOGIN_FAIL, (state, payload): UserState => {
        return  {
            ...state,
            userType: UserType.None,
            isAuthenticated: false,
            canViewCharts: false,
            error: payload.error
        }
    }),
    on(UserActions.LOGOUT, (state): UserState => {
        return {
            ...state,
            userType: UserType.None,
            isAuthenticated: false,
            canViewCharts: false
        };
    })
);

export const getUserState = createFeatureSelector<UserState>('userState');

export const getIsAuthenticatd =  createSelector(
    getUserState,
    state => state.isAuthenticated
);

export const getAuthError =  createSelector(
    getUserState,
    state => state.error
);

export const getCanViewCharts =  createSelector(
    getUserState,
    state => state.canViewCharts
);