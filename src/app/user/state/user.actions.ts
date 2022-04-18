import { createAction, props } from "@ngrx/store";
import { LoginResponse } from "src/app/shared/models/login-response";
import { User, UserType } from "../user";

export const LOGIN = createAction(
    '[User] Login',
    props<{ userType: UserType }>()
);

export const LOGIN_SUCCESS = createAction(
    '[User] Login Success',
    props<LoginResponse>()
);

export const LOGIN_FAIL = createAction(
    '[User] Login Fail',
    props<{ error: any }>()
);

export const LOGOUT = createAction(
    '[User] Logout'
);