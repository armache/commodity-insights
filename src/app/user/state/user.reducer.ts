import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { UserType } from "../user";
import { UserState } from "./user.state";
import * as UserActions from "./user.actions";

export const initialUserState: UserState = {
    userType: UserType.None,
    isAuthenticated: false,
    canViewLogs: false,
    error: ''
};

export const userReducer = createReducer<UserState>(
    initialUserState,
    on(UserActions.LOGIN_SUCCESS, (state, payload): UserState => {
        return  {
            ...state,
            userType: payload.user.userType,
            isAuthenticated: payload.user.isAuthenticated,
            canViewLogs: (payload.user.userType === UserType.Trader) ? true : false,
            error: ''
        }
    }),
    on(UserActions.LOGIN_FAIL, (state, payload): UserState => {
        return  {
            ...state,
            userType: UserType.None,
            isAuthenticated: false,
            canViewLogs: false,
            error: payload.error
        }
    }),
    on(UserActions.LOGOUT, (state): UserState => {
        return {
            ...state,
            userType: UserType.None,
            isAuthenticated: false,
            canViewLogs: false
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

export const getCanViewLogs =  createSelector(
    getUserState,
    state => state.canViewLogs
);