import { UserType } from '../user';

export interface UserState {
    userType: UserType;
    isAuthenticated: boolean;
    canViewCharts: boolean;
    error: string
}