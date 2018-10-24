import { AuthActions, AuthActionTypes } from '@web/app/auth/store/actions/auth.actions';

import { User } from '@web/app/two/user/models/user.model';
import { Company } from '@web/app/one/company/models/company.model';

export interface State {
  user: User | null;
  company: Company | null;
}

export const initialState: State = {
  user: null,
  company: null
};

export function reducer(state = initialState, action: AuthActions): State {

  switch (action.type) {

    case AuthActionTypes.Auth:
    case AuthActionTypes.AuthFailure:
    case AuthActionTypes.CheckAuth:
    case AuthActionTypes.CheckAuthFailure:
    case AuthActionTypes.LogoutAuthSuccess:
    case AuthActionTypes.LogoutAuthFailure:
    case AuthActionTypes.AuthRedirect: {
      return initialState;
    }

    case AuthActionTypes.AuthSuccess: {
      return {
        ...state,
        user: action.payload.user,
        company: action.payload.company
      };
    }

    case AuthActionTypes.CheckAuthSuccess: {
      return {
        ...state,
        user: action.payload.checkAuth.user,
        company: action.payload.checkAuth.company
      };
    }

    default:
      return state;
  }

}

export const getUser = (state: State) => state.user;
export const getCompany = (state: State) => state.company;
