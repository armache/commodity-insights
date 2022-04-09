import { UserType } from '../user';

export interface UserState {
    userType: UserType;
    isAuthenticated: boolean;
    canViewLogs: boolean;
    error: string
}