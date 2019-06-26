import { createReducer, on } from '@ngrx/store';
import * as fromAuthActions from '@web/app/auth/store/actions';

import { User } from '@web/app/features/c/user/models/user.model';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
};

export const reducer = createReducer(
  initialState,
  on(
    fromAuthActions.AuthActions.Auth,
    fromAuthActions.AuthActions.AuthFailure,
    fromAuthActions.AuthActions.CheckAuth,
    fromAuthActions.AuthActions.CheckAuthFailure,
    fromAuthActions.AuthActions.LogoutAuthSuccess,
    fromAuthActions.AuthActions.LogoutAuthFailure,
    fromAuthActions.AuthActions.AuthRedirect,
    fromAuthActions.AuthActions.ExpiredAuth,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromAuthActions.AuthActions.AuthSuccess,
    (state, { token, user, company }) => ({
      ...state,
      user
    })
  ),
  on(
    fromAuthActions.AuthActions.CheckAuthSuccess,
    (state, { auth }) => ({
      ...state,
      user: auth.checkAuth.user
    })
  )
);

export const getUser = (state: State) => state.user;
