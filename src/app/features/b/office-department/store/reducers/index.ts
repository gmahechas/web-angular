import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromEntity from '@web/app/features/b/office-department/store/reducers/entity-office-department.reducer';
import * as fromSearch from '@web/app/features/b/office-department/store/reducers/search-office-department.reducer';
import * as fromPagination from '@web/app/features/b/office-department/store/reducers/pagination-office-department.reducer';
import * as fromLayout from '@web/app/features/b/office-department/store/reducers/layout-office-department.reducer';
import * as fromCore from '@web/app/core/store';

export interface OfficeDepartmentState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  office_department: OfficeDepartmentState;
}

export function reducers(state: OfficeDepartmentState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer,
  })(state, action);
}

export const getOfficeDepartmentState = createFeatureSelector<State, OfficeDepartmentState>('office_department');
