import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/c/type-person-identification/store/reducers/entity-type-person-identification.reducer';
import * as fromSearch from '@web/app/features/c/type-person-identification/store/reducers/search-type-person-identification.reducer';
// tslint:disable-next-line:max-line-length
import * as fromPagination from '@web/app/features/c/type-person-identification/store/reducers/pagination-type-person-identification.reducer';
import * as fromLayout from '@web/app/features/c/type-person-identification/store/reducers/layout-type-person-identification.reducer';
import * as fromCore from '@web/app/core/store';

export interface TypePersonIdentificationState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<TypePersonIdentificationState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  type_person_identification: TypePersonIdentificationState;
}

export const getTypePersonIdentificationState = createFeatureSelector<State, TypePersonIdentificationState>('type_person_identification');
