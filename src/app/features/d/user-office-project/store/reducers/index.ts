import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromEntity from '@web/app/features/d/user-office-project/store/reducers/entity-user-office-project.reducer';
import * as fromSearch from '@web/app/features/d/user-office-project/store/reducers/search-user-office-project.reducer';
import * as fromPagination from '@web/app/features/d/user-office-project/store/reducers/pagination-user-office-project.reducer';
import * as fromLayout from '@web/app/features/d/user-office-project/store/reducers/layout-user-office-project.reducer';
import * as fromCore from '@web/app/core/store';

export interface UserOfficeProjectState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  user_office_project: UserOfficeProjectState;
}

export function reducers(state: UserOfficeProjectState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer,
  })(state, action);
}

export const getUserOfficeProjectState = createFeatureSelector<State, UserOfficeProjectState>('user_office_project');
