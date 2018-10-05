import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@app/app/two/user/store/reducers/entity-user.reducer';
import * as fromSearch from '@app/app/two/user/store/reducers/search-user.reducer';
import * as fromPagination from '@app/app/two/user/store/reducers/pagination-user.reducer';
import * as fromLayout from '@app/app/two/user/store/reducers/layout-user.reducer';
import * as fromCore from '@app/app/core/store';

export interface UserState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<UserState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  user: UserState;
}

export const getUserState = createFeatureSelector<State, UserState>('user');
