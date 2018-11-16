import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/a/country/store/reducers/entity-country.reducer';
import * as fromSearch from '@web/app/features/a/country/store/reducers/search-country.reducer';
import * as fromPagination from '@web/app/features/a/country/store/reducers/pagination-country.reducer';
import * as fromLayout from '@web/app/features/a/country/store/reducers/layout-country.reducer';
import * as fromCore from '@web/app/core/store';

export interface CountryState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<CountryState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  country: CountryState;
}

export const getCountryState = createFeatureSelector<State, CountryState>('country');
