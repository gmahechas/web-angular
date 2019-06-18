import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

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

export interface State extends fromCore.State {
  country: CountryState;
}

export function reducers(state: CountryState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer,
  })(state, action);
}

export const getCountryState = createFeatureSelector<State, CountryState>('country');
