import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromEntity from '@web/app/features/b/department/store/reducers/entity-department.reducer';
import * as fromSearch from '@web/app/features/b/department/store/reducers/search-department.reducer';
import * as fromPagination from '@web/app/features/b/department/store/reducers/pagination-department.reducer';
import * as fromLayout from '@web/app/features/b/department/store/reducers/layout-department.reducer';
import * as fromCore from '@web/app/core/store';

export interface DepartmentState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  department: DepartmentState;
}

export function reducers(state: DepartmentState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer,
  })(state, action);
}

export const getDepartmentState = createFeatureSelector<State, DepartmentState>('department');
