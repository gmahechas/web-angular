import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/c/user/store/reducers/entity-user.reducer';
import * as fromSearch from '@web/app/features/c/user/store/reducers/search-user.reducer';
import * as fromPagination from '@web/app/features/c/user/store/reducers/pagination-user.reducer';
import * as fromLayout from '@web/app/features/c/user/store/reducers/layout-user.reducer';
import * as fromCore from '@web/app/core/store';

export interface UserState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  user: UserState;
}

export const reducers: ActionReducerMap<UserState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export const getUserState = createFeatureSelector<State, UserState>('user');
