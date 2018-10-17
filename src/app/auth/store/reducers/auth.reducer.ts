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

    case AuthActionTypes.Login: {
      return state;
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
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

export const getUser = (state: State) => state.user;
