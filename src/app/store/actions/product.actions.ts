import { createAction, props } from '@ngrx/store';
import { Product } from '../../../models/product.model';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);

export const searchProducts = createAction('[Product List] Search Products', props<{ keyword: string }>());
export const clearSearch = createAction('[Product] Clear Search');

export const filterProducts = createAction('[Product List] Filter Products', props<{ filters: { category?: string, minPrice?: number, maxPrice?: number } }>());

export const loadMoreProducts = createAction('[Product List] Load More Products');
export const setLoading = createAction('[Product List] Set Loading', props<{ isLoading: boolean }>());

// add to cart
export const addToCart = createAction('[Cart] Add to Cart', props<{ product: Product, quantity: number }>());
export const removeFromCart = createAction('[Cart] Remove from Cart', props<{ productId: number }>());
export const clearCart = createAction('[Cart] Clear Cart');