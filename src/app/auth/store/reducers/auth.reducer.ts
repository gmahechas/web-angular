import { AuthActions, AuthActionTypes } from '@web/app/auth/store/actions/auth.actions';
import { User } from '@web/app/two/user/models';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
};

export function reducer(state = initialState, action: AuthActions): State {

  switch (action.type) {

    case AuthActionTypes.Login: {
      return state;
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        user: action.payload.user
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
