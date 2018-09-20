import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from './entity-user.reducer';
import * as fromSearch from './search-user.reducer';
import * as fromPagination from './pagination-user.reducer';
import * as fromLayout from './layout-user.reducer';
import * as fromCore from '../../../../core/store';

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
