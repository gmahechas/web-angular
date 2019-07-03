import { createReducer, on } from '@ngrx/store';
import * as fromProfileMenuActions from '@web/app/features/c/profile-menu/store/actions';
import { SearchProfileMenu } from '@web/app/features/c/profile-menu/models/search-profile-menu.model';

export interface State {
  loaded: boolean;
  query: SearchProfileMenu;
}

export const initialState: State = {
  loaded: false,
  query: {
    profile_menu: {
      profile_menu_id: '',
      profile_menu_status: null
    },
    profile: null,
    menu: null
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromProfileMenuActions.EntityActions.LoadEntity,
    fromProfileMenuActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        profile_menu: search.profile_menu,
        profile: search.profile,
        menu: search.menu
      }
    })
  ),
  on(
    fromProfileMenuActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromProfileMenuActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromProfileMenuActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
