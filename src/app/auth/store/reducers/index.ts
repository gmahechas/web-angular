import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from '@web/app/auth/store/reducers/auth.reducer';
import * as fromLayout from '@web/app/auth/store/reducers/layout-auth.reducer';
import * as fromCore from '@web/app/core/store';

export interface AuthState {
  status: fromAuth.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer,
  layout: fromLayout.reducer
};

export const getAuthState = createFeatureSelector<State, AuthState>('auth');
