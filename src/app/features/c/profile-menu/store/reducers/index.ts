import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromEntity from '@web/app/features/c/profile-menu/store/reducers/entity-profile-menu.reducer';
import * as fromSearch from '@web/app/features/c/profile-menu/store/reducers/search-profile-menu.reducer';
import * as fromCore from '@web/app/core/store';

export interface ProfileMenuState {
  entity: fromEntity.State;
  search: fromSearch.State;
}

export interface State extends fromCore.State {
  profile_menu: ProfileMenuState;
}

export function reducers(state: ProfileMenuState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer
  })(state, action);
}

export const getProfileMenuState = createFeatureSelector<State, ProfileMenuState>('profile_menu');
