import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ProductService } from "src/app/core/product.service";
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions, private productService: ProductService) {

    }

    getProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.GET_PRODUCTS),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductActions.GET_PRODUCTS_SUCCESS({ products })),
                catchError(error => of(ProductActions.GET_PRODUCTS_FAIL({ error })))
            ))
        );
    });
}