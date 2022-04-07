import * as AppState from '../../state/app.state';
import { UserType } from '../user';

export interface State extends AppState.State {
    user: UserState
}

export interface UserState {
    userType: UserType;
    isAuthenticated: boolean;
    canViewCharts: boolean;
    error: string
}