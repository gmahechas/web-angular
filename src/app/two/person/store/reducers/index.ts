import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from './entity-person.reducer';
import * as fromSearch from './search-person.reducer';
import * as fromPagination from './pagination-person.reducer';
import * as fromLayout from './layout-person.reducer';
import * as fromCore from '../../../../core/store';

export interface PersonState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<PersonState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  person: PersonState;
}

export const getPersonState = createFeatureSelector<State, PersonState>('person');
