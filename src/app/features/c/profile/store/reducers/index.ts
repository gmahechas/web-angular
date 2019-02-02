import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/c/profile/store/reducers/entity-profile.reducer';
import * as fromSearch from '@web/app/features/c/profile/store/reducers/search-profile.reducer';
import * as fromPagination from '@web/app/features/c/profile/store/reducers/pagination-profile.reducer';
import * as fromLayout from '@web/app/features/c/profile/store/reducers/layout-profile.reducer';
import * as fromCore from '@web/app/core/store';

export interface ProfileState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  profile: ProfileState;
}

export const reducers: ActionReducerMap<ProfileState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export const getProfileState = createFeatureSelector<State, ProfileState>('profile');
