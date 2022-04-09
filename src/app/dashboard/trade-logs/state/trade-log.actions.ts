import { createAction, props } from "@ngrx/store";
import { TradeLog } from "src/app/shared/models/trade-log";

export const GET_TRADE_LOGS = createAction(
    '[Trade Logs] Get Trade Logs'
);

export const GET_TRADE_LOGS_SUCCESS = createAction(
    '[Trade Logs] Get Trade Logs Success',
    props<{ tradeLogs: TradeLog[] }>()
);

export const GET_TRADE_LOGS_FAIL = createAction(
    '[Trade Logs] Get Trade Logs Fail',
    props<{ error: any }>()
);