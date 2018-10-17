import { AuthActions, AuthActionTypes } from '@web/app/auth/store/actions/auth.actions';

import { Token } from '@web/app/auth/models/token.model';
import { User } from '@web/app/two/user/models/user.model';
import { Company } from '@web/app/one/company/models/company.model';

export interface State {
  token: Token | null;
  user: User | null;
  company: Company | null;
}

export const initialState: State = {
  token: null,
  user: null,
  company: null
};

export function reducer(state = initialState, action: AuthActions): State {

  switch (action.type) {

    case AuthActionTypes.Login: {
      return state;
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        company: action.payload.company
      };
    }

    case AuthActionTypes.LoginFailure:
    case AuthActionTypes.LoginRedirect:
    case AuthActionTypes.Logout: {
      return initialState;
    }

    default:
      return state;
  }

}

export const getToken = (state: State) => state.token;
export const getUser = (state: State) => state.user;
export const getCompany = (state: State) => state.company;
