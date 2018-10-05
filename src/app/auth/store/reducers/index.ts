import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from '@app/app/auth/store/reducers/auth.reducer';
import * as fromLayout from '@app/app/auth/store/reducers/layout-auth.reducer';
import * as fromCore from '@app/app/core/store';

export interface AuthState {
  status: fromAuth.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  auth: AuthState;
}

export const getAuthState = createFeatureSelector<State, AuthState>('auth');
