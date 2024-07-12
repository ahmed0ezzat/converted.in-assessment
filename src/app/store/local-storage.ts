import { ActionReducer, Action } from '@ngrx/store';

export function localStorageSyncReducer<T>(reducer: ActionReducer<T>): ActionReducer<T> {
  return function (state: T | undefined, action: Action): T {
    const nextState = reducer(state, action);
    localStorage.setItem('productState', JSON.stringify(nextState));
    return nextState;
  };
}

