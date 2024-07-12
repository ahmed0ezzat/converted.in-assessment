import {
    ActionReducerMap,
    MetaReducer
  } from '@ngrx/store';
  import { localStorageSyncReducer } from '../local-storage';
  import { environment } from '../../shared/environments/environment';
  import * as productReducer from './product.reducer';
  
  export interface AppState {
    productState: productReducer.ProductState;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    productState: productReducer.productReducer,
  };
  
  export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];
  