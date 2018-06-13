import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from './entity-estate.reducer';
import * as fromSearch from './search-estate.reducer';
import * as fromPagination from './pagination-estate.reducer';
import * as fromLayout from './layout-estate.reducer';
import * as fromCore from '../../../../core/store';

export interface EstateState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<EstateState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  estate: EstateState;
}

export const getEstateState = createFeatureSelector<EstateState>('estate');
