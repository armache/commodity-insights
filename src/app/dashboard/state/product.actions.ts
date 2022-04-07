import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/shared/models/product";

export const GET_PRODUCTS = createAction(
    '[Product] Get Products'
);

export const GET_PRODUCTS_SUCCESS = createAction(
    '[User] Get Products Success',
    props<{ products: Product[] }>()
);

export const GET_PRODUCTS_FAIL = createAction(
    '[User] Get Products Fail',
    props<{ error: any }>()
);