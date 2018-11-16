import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/c/person/store/reducers/entity-person.reducer';
import * as fromSearch from '@web/app/features/c/person/store/reducers/search-person.reducer';
import * as fromPagination from '@web/app/features/c/person/store/reducers/pagination-person.reducer';
import * as fromLayout from '@web/app/features/c/person/store/reducers/layout-person.reducer';
import * as fromCore from '@web/app/core/store';

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
