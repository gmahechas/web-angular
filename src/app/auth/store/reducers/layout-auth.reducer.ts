import { AuthActions, AuthActionTypes } from '@web/app/auth/store/actions/auth.actions';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false
};

export function reducer(state = initialState, action: AuthActions): State {

  switch (action.type) {
    case AuthActionTypes.Auth:
    case AuthActionTypes.CheckAuth: {
      return {
        ...state,
        error: null,
        pending: true
      };
    }

    case AuthActionTypes.AuthSuccess:
    case AuthActionTypes.CheckAuthSuccess: {
      return initialState;
    }

    case AuthActionTypes.AuthFailure: {
      return {
        ...state,
        error: 'error.verb',
        pending: false
      };
    }

    case AuthActionTypes.CheckAuthFailure: {
      return {
        ...state,
        error: 'error.verb',
        pending: false
      };
    }

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
