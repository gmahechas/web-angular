import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from './entity-user-office.reducer';
import * as fromSearch from './search-user-office.reducer';
import * as fromCore from '../../../../core/store';

export interface UserOfficeState {
  entity: fromEntity.State;
  search: fromSearch.State;
}

export const reducers: ActionReducerMap<UserOfficeState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer
};

export interface State extends fromCore.State {
  user_office: UserOfficeState;
}

export const getUserOfficeState = createFeatureSelector<State, UserOfficeState>('user_office');
