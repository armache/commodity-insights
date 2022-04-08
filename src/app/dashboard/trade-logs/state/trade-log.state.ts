import * as AppState from '../../../state/app.state';

export interface State extends AppState.State {
    products: TradeLogState;
}

export interface TradeLogState {
    tradelogs: string[];
    error: string;
}