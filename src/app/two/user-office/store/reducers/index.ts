import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/two/user-office/store/reducers/entity-user-office.reducer';
import * as fromSearch from '@web/app/two/user-office/store/reducers/search-user-office.reducer';
import * as fromLayout from '@web/app/two/user-office/store/reducers/layout-user-office.reducers';
import * as fromCore from '@web/app/core/store';

export interface UserOfficeState {
  entity: fromEntity.State;
  search: fromSearch.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<UserOfficeState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  user_office: UserOfficeState;
}

export const getUserOfficeState = createFeatureSelector<State, UserOfficeState>('user_office');
