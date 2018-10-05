import { Action } from '@ngrx/store';

import * as fromModels from '@app/app/two/user-office/models';

export enum EntityActionTypes {
  LoadEntity = '[User Office] Load Entity ',
  LoadSuccessEntity = '[User Office] Load Success Entity',
  LoadFailEntity = '[User Office] Load Fail Entity',
  ResetSearch = '[User Office] Reset Search'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchUserOffice }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationUserOffice }) { }
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
