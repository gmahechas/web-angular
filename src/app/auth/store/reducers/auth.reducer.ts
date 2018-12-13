import { AuthActions, AuthActionTypes } from '@web/app/auth/store/actions/auth.actions';

import { User } from '@web/app/features/c/user/models/user.model';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
};

export function reducer(state = initialState, action: AuthActions): State {

  switch (action.type) {

    case AuthActionTypes.Auth:
    case AuthActionTypes.AuthFailure:
    case AuthActionTypes.CheckAuth:
    case AuthActionTypes.CheckAuthFailure:
    case AuthActionTypes.LogoutAuthSuccess:
    case AuthActionTypes.LogoutAuthFailure:
    case AuthActionTypes.AuthRedirect:
    case AuthActionTypes.ExpiredAuth: {
      return initialState;
    }

    case AuthActionTypes.AuthSuccess: {
      return {
        ...state,
        user: action.payload.user
      };
    }

    case AuthActionTypes.CheckAuthSuccess: {
      return {
        ...state,
        user: action.payload.checkAuth.user
      };
    }

    default:
      return state;
  }

}

export const getUser = (state: State) => state.user;
