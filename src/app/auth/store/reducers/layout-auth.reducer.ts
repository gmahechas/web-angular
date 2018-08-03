import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export interface State {
  error: any;
}

const initialState: State = {
  error: null
};

export function reducer(state = initialState, action: AuthActions): State {

  switch (action.type) {
    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
