import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { TradeLogState } from "./trade-log.state";

const initialTradeLogState: TradeLogState = {
    tradelogs: [],
    error: ''
};
  
export const tradelogReducer = createReducer<TradeLogState>(
    initialTradeLogState,
    // on(ProductActions.GET_PRODUCTS_SUCCESS, (state, payload): ProductState => {
    //     return {
    //         ...state,
    //         products: payload.products,
    //         error: ''
    //     };
    // }),
    // on(ProductActions.GET_PRODUCTS_FAIL, (state, payload): ProductState => {
    //     return {
    //         ...state,
    //         products: [],
    //         error: payload.error
    //     };
    // }),
    // on(UserActions.LOGOUT, (state): ProductState => {
    //     return {
    //         ...state,
    //         products: []
    //     };
    // }),
);

export const getTradeLogState = createFeatureSelector<TradeLogState>('tradelogs');

export const getTradeLogs =  createSelector(
    getTradeLogState,
    state => state.tradelogs
);