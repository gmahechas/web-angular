import { createFeatureSelector, ActionReducer, MetaReducer, Action, ActionReducerMap } from '@ngrx/store';

import { InjectionToken } from '@angular/core';

import * as fromLayout from '@web/app/core/store/reducers/layout-core.reducer';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '@web/app/shared/router-utils';

import * as fromAuthActions from '@web/app/auth/store/actions';

import { environment } from '@web/environments/environment';

export interface State {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>('Root reducers token', {
  factory: () => ({
    layout: fromLayout.reducer,
    router: fromRouter.routerReducer,
  }),
});

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): any => {
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
  return (state: State, action: any): any => {
    if (
      action.type === fromAuthActions.AuthActions.LogoutAuthSuccess ||
      action.type === fromAuthActions.AuthActions.CheckAuthFailure ||
      action.type === fromAuthActions.AuthActions.ExpiredAuth
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [/* logger ,*/ clearState] : [];

export const getRouterState = createFeatureSelector<State, fromRouter.RouterReducerState<RouterStateUrl>>('router');
export const getLayoutState = createFeatureSelector<State, fromLayout.State>('layout');
