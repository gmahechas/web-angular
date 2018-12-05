import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/d/user-office-project/store/reducers/entity-user-office-project.reducer';
import * as fromSearch from '@web/app/features/d/user-office-project/store/reducers/search-user-office-project.reducer';
import * as fromLayout from '@web/app/features/d/user-office-project/store/reducers/layout-user-office-project.reducer';
import * as fromCore from '@web/app/core/store';

export interface UserOfficeProjectState {
  entity: fromEntity.State;
  search: fromSearch.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<UserOfficeProjectState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  user_office_project: UserOfficeProjectState;
}

export const getUserOfficeProjectState = createFeatureSelector<State, UserOfficeProjectState>('user_office_project');
