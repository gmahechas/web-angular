import { createReducer, on } from '@ngrx/store';
import * as fromProfileActions from '@web/app/features/c/profile/store/actions';
import { SearchProfile } from '@web/app/features/c/profile/models/search-profile.model';

export interface State {
  loaded: boolean;
  query: SearchProfile;
}

export const initialState: State = {
  loaded: false,
  query: {
    profile: {
      profile_id: '',
      profile_name: ''
    }
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromProfileActions.EntityActions.LoadEntity,
    fromProfileActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        profile: search.profile
      }
    })
  ),
  on(
    fromProfileActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromProfileActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromProfileActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
