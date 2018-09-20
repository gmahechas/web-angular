import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from './entity-profile.reducer';
import * as fromSearch from './search-profile.reducer';
import * as fromPagination from './pagination-profile.reducer';
import * as fromLayout from './layout-profile.reducer';
import * as fromCore from '../../../../core/store';

export interface ProfileState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<ProfileState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  profile: ProfileState;
}

export const getProfileState = createFeatureSelector<State, ProfileState>('profile');
