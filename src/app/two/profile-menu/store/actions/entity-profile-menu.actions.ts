import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/two/profile-menu/models';

export enum EntityActionTypes {
  LoadEntity = '[Profile Menu] Load Entity ',
  LoadSuccessEntity = '[Profile Menu] Load Success Entity',
  LoadFailEntity = '[Profile Menu] Load Fail Entity',
  ResetSearch = '[Profile Menu] Reset Search'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchProfileMenu }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationProfileMenu }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class ResetSearch implements Action {
  readonly type = EntityActionTypes.ResetSearch;
}

export type EntityActions =
  | LoadEntity
  | LoadSuccessEntity
  | LoadFailEntity
  | ResetSearch;
