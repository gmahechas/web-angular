import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

export enum EntityActionTypes {
  LoadEntity = '[Profile] Load Entity ',
  LoadSuccessEntity = '[Profile] Load Success Entity',
  LoadFailEntity = '[Profile] Load Fail Entity'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: fromModels.SearchProfileMenu) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: fromModels.PaginationProfileMenu) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: any) { }
}

export type EntityActions =
  | LoadEntity
  | LoadSuccessEntity
  | LoadFailEntity;
