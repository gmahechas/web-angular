import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import * as fromLayout from './layout-auth.reducer';
import * as fromCore from '../../../core/store';

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
