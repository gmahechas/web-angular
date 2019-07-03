import { createReducer, on } from '@ngrx/store';
import * as fromAuthActions from '@web/app/auth/store/actions';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromAuthActions.AuthActions.Auth,
    fromAuthActions.AuthActions.CheckAuth,
    (state) => ({
      ...state,
      error: null,
      pending: true
    })
  ),
  on(
    fromAuthActions.AuthActions.AuthSuccess,
    fromAuthActions.AuthActions.CheckAuthSuccess,
    (state) => ({
      ...state,
      error: null,
      pending: false
    })
  ),
  on(
    fromAuthActions.AuthActions.AuthFailure,
    (state, { error }) => ({
      ...state,
      error: 'auth.authenticationIncorrect',
      pending: false
    })
  ),
  on(
    fromAuthActions.AuthActions.CheckAuthFailure,
    (state, { error }) => ({
      ...state,
      error: 'auth.sessionExpired',
      pending: false
    })
  )
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
