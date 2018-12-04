import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/d/user-office-project/models';

export enum EntityActionTypes {
  LoadEntity = '[UserOfficeProject] Load Entity ',
  LoadSuccessEntity = '[UserOfficeProject] Load Success Entity',
  LoadFailEntity = '[UserOfficeProject] Load Fail Entity',
  StoreEntity = '[UserOfficeProject] Store Entity',
  StoreSuccessEntity = '[UserOfficeProject] Store Success Entity',
  StoreFailEntity = '[UserOfficeProject] Store Fail Entity',
  UpdateEntity = '[UserOfficeProject] Update Entity',
  UpdateSuccessEntity = '[UserOfficeProject] Update Success Entity',
  UpdateFailEntity = '[UserOfficeProject] Update Fail Entity',
  DestroyEntity = '[UserOfficeProject] Destroy Entity',
  DestroySuccessEntity = '[UserOfficeProject] Destroy Success Entity',
  DestroyFailEntity = '[UserOfficeProject] Destroy Fail Entity',
  PaginateEntity = '[UserOfficeProject] Paginate Entity',
  LoadEntityShared = '[UserOfficeProject] Load Entity Shared',
  ResetSearch = '[UserOfficeProject] Reset Search'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchUserOfficeProject }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationUserOfficeProject }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.UserOfficeProject }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreUserOfficeProject }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.UserOfficeProject }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateUserOfficeProject }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.UserOfficeProject }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyUserOfficeProject }) { }
}

export class DestroyFailEntity implements Action {
  readonly type = EntityActionTypes.DestroyFailEntity;
  constructor(public payload: { error: any }) { }
}

export class PaginateEntity implements Action {
  readonly type = EntityActionTypes.PaginateEntity;
  constructor(public payload: { page: number }) { }
}

export class LoadEntityShared implements Action {
  readonly type = EntityActionTypes.LoadEntityShared;
  constructor(public payload: { search: fromModels.SearchUserOfficeProject }) { }
}

export class ResetSearch implements Action {
  readonly type = EntityActionTypes.ResetSearch;
}

export type EntityActions =
  | LoadEntity
  | LoadSuccessEntity
  | LoadFailEntity
  | StoreEntity
  | StoreSuccessEntity
  | StoreFailEntity
  | UpdateEntity
  | UpdateSuccessEntity
  | UpdateFailEntity
  | DestroyEntity
  | DestroySuccessEntity
  | DestroyFailEntity
  | PaginateEntity
  | LoadEntityShared
  | ResetSearch;
