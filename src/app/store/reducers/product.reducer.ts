import { createReducer, on, Action } from '@ngrx/store';
import { Product } from '../../../models/product.model';
import * as ProductActions from '../actions/product.actions';

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  displayedProducts: Product[];
  currentPage: number;
  productsPerPage: number;
  isLoading: boolean;
  error: any;
  currentFilters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  cart: { product: Product; quantity: number }[];
  
}

export const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  displayedProducts: [],
  currentPage: 1,
  productsPerPage: 10,
  isLoading: false,
  error: null,
  currentFilters: {},
  cart: []
};

const _productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    filteredProducts: products,
    displayedProducts: products.slice(0, state.productsPerPage),
    isLoading: false
  })),
  on(ProductActions.searchProducts, (state, { keyword }) => {
    const filteredProducts = state.products.filter(product => product.title.toLowerCase().includes(keyword.toLowerCase()));
    return {
      ...state,
      filteredProducts,
      displayedProducts: filteredProducts.slice(0, state.productsPerPage),
      currentPage: 1
    };
  }),
  on(ProductActions.filterProducts, (state, { filters }) => {
    const filteredProducts = state.products.filter(product => {
      return (!filters.category || product.category === filters.category) &&
             (!filters.minPrice || product.price >= filters.minPrice) &&
             (!filters.maxPrice || product.price <= filters.maxPrice);
    });
    return {
      ...state,
      filteredProducts,
      displayedProducts: filteredProducts.slice(0, state.productsPerPage),
      currentPage: 1,
      currentFilters: filters
    };
  }),
  on(ProductActions.clearSearch, (state) => {
    const filters = state.currentFilters;
    const filteredProducts = state.products.filter(product => {
      return (!filters.category || product.category === filters.category) &&
             (!filters.minPrice || product.price >= filters.minPrice) &&
             (!filters.maxPrice || product.price <= filters.maxPrice);
    });
    return {
      ...state,
      filteredProducts,
      displayedProducts: filteredProducts.slice(0, state.productsPerPage),
      currentPage: 1
    };
  }),
  on(ProductActions.loadMoreProducts, (state) => {
    const nextPage = state.currentPage + 1;
    const newDisplayedProducts = state.filteredProducts.slice(0, nextPage * state.productsPerPage);
    return {
      ...state,
      currentPage: nextPage,
      displayedProducts: newDisplayedProducts,
      isLoading: false
    };
  }),
  on(ProductActions.addToCart, (state, { product, quantity }) => {
    const existingItem = state.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === product.id ? { ...item, quantity:  Number(quantity) } : item
        )
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, { product, quantity: Number(quantity) }]
      };
    }
  }),

  on(ProductActions.removeFromCart, (state, { productId }) => ({
    ...state,
    cart: state.cart.filter(item => item.product.id !== productId)
  })),
  on(ProductActions.clearCart, state => ({
    ...state,
    cart: []
  })),
  on(ProductActions.setLoading, (state, { isLoading }) => ({
    ...state,
    isLoading
  }))
  
);

export function productReducer(state: ProductState | undefined, action: Action) {
  return _productReducer(state, action);
}
