import { ActionReducerMap, createFeatureSelector, ActionReducer, MetaReducer } from '@ngrx/store';

import { storeFreeze } from 'ngrx-store-freeze';

import * as fromLayout from '@web/app/core/store/reducers/layout-core.reducer';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '@web/app/shared/router-utils';

import { AuthActionTypes } from '@web/app/auth/store/actions/auth.actions';

import { environment } from '@web/environments/environment';

export interface State {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer
};

export const getRouterState = createFeatureSelector<State, fromRouter.RouterReducerState<RouterStateUrl>>('router');
export const getLayoutState = createFeatureSelector<State, fromLayout.State>('layout');

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    if (action.type === AuthActionTypes.LogoutAuthSuccess) {
      console.log('Reset state here');
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [/* logger ,*/ /* clearState, */ storeFreeze] : [];
