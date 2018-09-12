import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from './entity-profile-menu.reducer';
import * as fromCore from '../../../../core/store';

export interface ProfileMenuState {
  entity: fromEntity.State;
}

export const reducers: ActionReducerMap<ProfileMenuState> = {
  entity: fromEntity.reducer
};

export interface State extends fromCore.State {
  profile_menu: ProfileMenuState;
}

export const getProfileMenuState = createFeatureSelector<ProfileMenuState>('profile_menu');
