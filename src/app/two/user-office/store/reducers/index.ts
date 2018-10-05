import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@app/app/two/user-office/store/reducers/entity-user-office.reducer';
import * as fromSearch from '@app/app/two/user-office/store/reducers/search-user-office.reducer';
import * as fromCore from '@app/app/core/store';

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
