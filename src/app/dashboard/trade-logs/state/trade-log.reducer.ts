import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { TradeLogState } from "./trade-log.state";
import * as TradeLogActions from './trade-log.actions';
import * as UserActions from '../../../user/state/user.actions';

const initialTradeLogState: TradeLogState = {
    tradeLogs: [],
    error: ''
};
  
export const tradeLogReducer = createReducer<TradeLogState>(
    initialTradeLogState,
    on(TradeLogActions.GET_TRADE_LOGS_SUCCESS, (state, payload): TradeLogState => {
        return {
            ...state,
            tradeLogs: payload.tradeLogs,
            error: ''
        };
    }),
    on(TradeLogActions.GET_TRADE_LOGS_FAIL, (state, payload): TradeLogState => {
        return {
            ...state,
            tradeLogs: [],
            error: payload.error
        };
    }),
    on(UserActions.LOGOUT, (state): TradeLogState => {
        return {
            ...state,
            tradeLogs: []
        };
    }),
);

export const getTradeLogState = createFeatureSelector<TradeLogState>('tradeLogState');

export const getTradeLogs =  createSelector(
    getTradeLogState,
    state => state.tradeLogs
);

export const getTradeLogError =  createSelector(
    getTradeLogState,
    state => state.error
);