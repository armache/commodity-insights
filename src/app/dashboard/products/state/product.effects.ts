import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { DashboardService } from "../../dashboard.service";
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions, private dashboardService: DashboardService) {

    }

    getProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.GET_PRODUCTS),
            mergeMap(() => this.dashboardService.getProducts().pipe(
                map(products => ProductActions.GET_PRODUCTS_SUCCESS({ products })),
                catchError(error => of(ProductActions.GET_PRODUCTS_FAIL({ error })))
            ))
        );
    });
}