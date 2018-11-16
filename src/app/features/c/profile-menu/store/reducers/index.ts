import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/c/profile-menu/store/reducers/entity-profile-menu.reducer';
import * as fromSearch from '@web/app/features/c/profile-menu/store/reducers/search-profile-menu.reducer';
import * as fromCore from '@web/app/core/store';

export interface ProfileMenuState {
  entity: fromEntity.State;
  search: fromSearch.State;
}

export const reducers: ActionReducerMap<ProfileMenuState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer
};

export interface State extends fromCore.State {
  profile_menu: ProfileMenuState;
}

export const getProfileMenuState = createFeatureSelector<State, ProfileMenuState>('profile_menu');
