import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from './entity-country.reducer';
import * as fromSearch from './search-country.reducer';
import * as fromPagination from './pagination-country.reducer';
import * as fromCore from '../../../../core/store';

export interface CountryState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
}

export const reducers: ActionReducerMap<CountryState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
};

export interface State extends fromCore.State {
  country: CountryState;
}

export const getCountryState = createFeatureSelector<CountryState>('country');
