import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromEntity from '@web/app/features/c/profile-menu/store/reducers/entity-profile-menu.reducer';
import * as fromSearch from '@web/app/features/c/profile-menu/store/reducers/search-profile-menu.reducer';
import * as fromPagination from '@web/app/features/c/profile-menu/store/reducers/pagination-profile-menu.reducer';
import * as fromLayout from '@web/app/features/c/profile-menu/store/reducers/layout-profile-menu.reducer';
import * as fromCore from '@web/app/core/store';

export interface ProfileMenuState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  profile_menu: ProfileMenuState;
}

export function reducers(state: ProfileMenuState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer,
  })(state, action);
}

export const getProfileMenuState = createFeatureSelector<State, ProfileMenuState>('profile_menu');
