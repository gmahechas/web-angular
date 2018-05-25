import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

import { Token } from './../../models/token.model';

export interface State {
  loggedIn: boolean;
}

export const initialState: State = {
  loggedIn: false
};

export function reducer(state = initialState, action: AuthActions): State {

  switch (action.type) {

    case AuthActionTypes.Login: {
      return state;
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true
      };
    }

    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        loggedIn: false
      };
    }

    case AuthActionTypes.Logout: {
      return {
        ...state,
        loggedIn: false
      };
    }

    default:
      return state;
  }

}

export const getLoggedIn = (state: State) => state.loggedIn;
