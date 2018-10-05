import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@app/app/one/office/store/reducers/entity-office.reducer';
import * as fromSearch from '@app/app/one/office/store/reducers/search-office.reducer';
import * as fromPagination from '@app/app/one/office/store/reducers/pagination-office.reducer';
import * as fromLayout from '@app/app/one/office/store/reducers/layout-office.reducer';
import * as fromCore from '@app/app/core/store';

export interface OfficeState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<OfficeState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  office: OfficeState;
}

export const getOfficeState = createFeatureSelector<State, OfficeState>('office');
