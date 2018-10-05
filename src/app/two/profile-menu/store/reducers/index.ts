import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@app/app/two/profile-menu/store/reducers/entity-profile-menu.reducer';
import * as fromSearch from '@app/app/two/profile-menu/store/reducers/search-profile-menu.reducer';
import * as fromCore from '@app/app/core/store';

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
