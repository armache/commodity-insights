import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { ProductState } from "./product.state";
import * as ProductActions from './product.actions';
import * as UserActions from '../../../user/state/user.actions';
import { ChartProduct } from "src/app/shared/models/chart-product";

const initialProductState: ProductState = {
    products: [],
    error: ''
};
  
export const productReducer = createReducer<ProductState>(
    initialProductState,
    on(ProductActions.GET_PRODUCTS_SUCCESS, (state, payload): ProductState => {
        return {
            ...state,
            products: payload.products,
            error: ''
        };
    }),
    on(ProductActions.GET_PRODUCTS_FAIL, (state, payload): ProductState => {
        return {
            ...state,
            products: [],
            error: payload.error
        };
    }),
    on(UserActions.LOGOUT, (state): ProductState => {
        return {
            ...state,
            products: []
        };
    }),
);

export const getProductState = createFeatureSelector<ProductState>('products');

export const getProducts =  createSelector(
    getProductState,
    state => state.products
);

export const getProductsByYear =  (year: number) => createSelector(
    getProductState,
    state => state.products.map(p => {
        
        let chartProduct = new ChartProduct();
        chartProduct.name = `${p.modelName}_${p.commodityName}`;
        chartProduct.historicalPnl = p.historicalPnl.find(a => a.year === year)
        
        return  chartProduct;
    })
);

export const getLoadingStatus =  createSelector(
    getProducts,
    products => !(products.length > 0)
);

export const getProductNames =  createSelector(
    getProducts,
    products => products.map(p => `${p.modelName}_${p.commodityName}`)
);

export const getAvailableYears =  createSelector(
    getProducts,
    products => products[0]?.historicalPnl.flatMap(a => a.year)
);

export const getDefaultYear =  createSelector(
    getAvailableYears,
    years => (years) ? years[0] : 0
);

export const getProductError =  createSelector(
    getProductState,
    state => state.error
);