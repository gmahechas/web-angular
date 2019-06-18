import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromEntity from '@web/app/features/c/user-office/store/reducers/entity-user-office.reducer';
import * as fromSearch from '@web/app/features/c/user-office/store/reducers/search-user-office.reducer';
import * as fromPagination from '@web/app/features/c/user-office/store/reducers/pagination-user-office.reducer';
import * as fromLayout from '@web/app/features/c/user-office/store/reducers/layout-user-office.reducers';
import * as fromCore from '@web/app/core/store';

export interface UserOfficeState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  user_office: UserOfficeState;
}

export function reducers(state: UserOfficeState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer
  })(state, action);
}

export const getUserOfficeState = createFeatureSelector<State, UserOfficeState>('user_office');
