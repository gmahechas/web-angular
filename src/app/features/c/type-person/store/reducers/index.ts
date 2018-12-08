import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/c/type-person/store/reducers/entity-type-person.reducer';
import * as fromSearch from '@web/app/features/c/type-person/store/reducers/search-type-person.reducer';
import * as fromPagination from '@web/app/features/c/type-person/store/reducers/pagination-type-person.reducer';
import * as fromLayout from '@web/app/features/c/type-person/store/reducers/layout-type-person.reducer';
import * as fromCore from '@web/app/core/store';

export interface TypePersonState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<TypePersonState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  type_person: TypePersonState;
}

export const getTypePersonState = createFeatureSelector<State, TypePersonState>('type_person');
