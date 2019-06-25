import { createReducer, on } from '@ngrx/store';
import * as fromUserActions from '@web/app/features/c/user/store/actions';
import { SearchUser } from '@web/app/features/c/user/models/search-user.model';

export interface State {
  loaded: boolean;
  query: SearchUser;
}

export const initialState: State = {
  loaded: false,
  query: {
    user: {
      user_id: '',
      username: ''
    },
    person: null,
    profile: null
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromUserActions.EntityActions.LoadEntity,
    fromUserActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        user: search.user,
        person: search.person,
        profile: search.profile
      }
    })
  ),
  on(
    fromUserActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromUserActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromUserActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
