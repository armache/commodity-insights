import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { DashboardService } from "../../dashboard.service";
import * as TradeLogActions from '../state/trade-log.actions';

@Injectable()
export class TradeLogEffects {

    constructor(private actions$: Actions, private dashboardService: DashboardService) {

    }

    getProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TradeLogActions.GET_TRADE_LOGS),
            mergeMap(() => this.dashboardService.getTradeLogs().pipe(
                map(tradeLogs => TradeLogActions.GET_TRADE_LOGS_SUCCESS({ tradeLogs })),
                catchError(error => of(TradeLogActions.GET_TRADE_LOGS_FAIL({ error })))
            ))
        );
    });
}