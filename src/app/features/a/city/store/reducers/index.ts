import { createFeatureSelector, combineReducers, Action} from '@ngrx/store';

import * as fromEntity from '@web/app/features/a/city/store/reducers/entity-city.reducer';
import * as fromSearch from '@web/app/features/a/city/store/reducers/search-city.reducer';
import * as fromPagination from '@web/app/features/a/city/store/reducers/pagination-city.reducer';
import * as fromLayout from '@web/app/features/a/city/store/reducers/layout-city.reducer';
import * as fromCore from '@web/app/core/store';

export interface CityState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  city: CityState;
}

export function reducers(state: CityState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer,
  })(state, action);
}

export const getCityState = createFeatureSelector<State, CityState>('city');
