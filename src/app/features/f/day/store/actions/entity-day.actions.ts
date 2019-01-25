import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/f/day/models';

export enum EntityActionTypes {
  LoadSuccessEntity = '[Day] Load Success Entity',
  LoadFailEntity = '[Day] Load Fail Entity',
  LoadEntityShared = '[Day] Load Entity Shared',
  ResetSearch = '[Day] Reset Search'
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationDay }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class LoadEntityShared implements Action {
  readonly type = EntityActionTypes.LoadEntityShared;
  constructor(public payload: { search: fromModels.SearchDay }) { }
}

export class ResetSearch implements Action {
  readonly type = EntityActionTypes.ResetSearch;
}

export type EntityActions =
  | LoadSuccessEntity
  | LoadFailEntity
  | LoadEntityShared
  | ResetSearch;
