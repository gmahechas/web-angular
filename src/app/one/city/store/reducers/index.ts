import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from './entity-city.reducer';
import * as fromSearch from './search-city.reducer';
import * as fromPagination from './pagination-city.reducer';
import * as fromLayout from './layout-city.reducer';
import * as fromCore from '../../../../core/store';

export interface CityState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<CityState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  city: CityState;
}

export const getCityState = createFeatureSelector<CityState>('city');
