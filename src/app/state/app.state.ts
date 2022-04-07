import { ProductState } from "../dashboard/state/product.state";
import { UserState } from "../user/state/user.state";

export interface State {
    user: UserState;
    products: ProductState;
}