import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/shared/models/product";

export const GET_PRODUCTS = createAction(
    '[Products] Get Products'
);

export const GET_PRODUCTS_SUCCESS = createAction(
    '[Products] Get Products Success',
    props<{ products: Product[] }>()
);

export const GET_PRODUCTS_FAIL = createAction(
    '[Products] Get Products Fail',
    props<{ error: any }>()
);