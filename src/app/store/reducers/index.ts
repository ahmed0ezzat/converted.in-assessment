import {
    ActionReducerMap,
    MetaReducer
  } from '@ngrx/store';
  import { localStorageSyncReducer } from '../local-storage';
  import { environment } from '../../shared/environments/environment';
//   import * as fromCart from './cart.reducer';
  import * as productReducer from './product.reducer';
  
  export interface AppState {
    // cart: fromCart.CartState;
    productState: productReducer.ProductState;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    // cart: fromCart.cartReducer,
    // products: productReducer.productReducer,
    productState: productReducer.productReducer,
  };
  
  export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];
  