import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/a/estate/store/reducers/entity-estate.reducer';
import * as fromSearch from '@web/app/features/a/estate/store/reducers/search-estate.reducer';
import * as fromPagination from '@web/app/features/a/estate/store/reducers/pagination-estate.reducer';
import * as fromLayout from '@web/app/features/a/estate/store/reducers/layout-estate.reducer';
import * as fromCore from '@web/app/core/store';

export interface EstateState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  estate: EstateState;
}

export const reducers: ActionReducerMap<EstateState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export const getEstateState = createFeatureSelector<State, EstateState>('estate');
