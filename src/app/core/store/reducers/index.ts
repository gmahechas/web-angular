import { ActionReducerMap, createFeatureSelector, createSelector, ActionReducer, MetaReducer } from '@ngrx/store';

import { storeFreeze } from 'ngrx-store-freeze';

import * as fromLayout from './layout-core.reducer';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '../../../shared/router-utils';

import { environment } from '../../../../environments/environment';

export interface State {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [/* logger ,*/ storeFreeze] : [];
