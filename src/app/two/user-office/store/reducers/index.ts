import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from './entity-user-office.reducer';
import * as fromCore from '../../../../core/store';

export interface UserOfficeState {
  entity: fromEntity.State;
}

export const reducers: ActionReducerMap<UserOfficeState> = {
  entity: fromEntity.reducer,
};

export interface State extends fromCore.State {
  user_office: UserOfficeState;
}

export const getUserOfficeState = createFeatureSelector<UserOfficeState>('user_office');
