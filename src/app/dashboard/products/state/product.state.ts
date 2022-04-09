import { Product } from 'src/app/shared/models/product';

export interface ProductState {
    products: Product[];
    error: string;
}