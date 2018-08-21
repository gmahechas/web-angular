import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from './entity-office.reducer';
import * as fromSearch from './search-office.reducer';
import * as fromPagination from './pagination-office.reducer';
import * as fromLayout from './layout-office.reducer';
import * as fromCore from '../../../../core/store';

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

export const getOfficeState = createFeatureSelector<OfficeState>('office');
