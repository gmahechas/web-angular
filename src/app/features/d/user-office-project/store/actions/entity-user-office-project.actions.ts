import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/d/user-office-project/models';

export enum EntityActionTypes {
  LoadEntity = '[User Office Project] Load Entity ',
  LoadSuccessEntity = '[User Office Project] Load Success Entity',
  LoadFailEntity = '[User Office Project] Load Fail Entity',
  StoreEntity = '[User Office Project] Store Entity',
  StoreSuccessEntity = '[User Office Project] Store Success Entity',
  StoreFailEntity = '[User Office Project] Store Fail Entity',
  UpdateEntity = '[User Office Project] Update Entity',
  UpdateSuccessEntity = '[User Office Project] Update Success Entity',
  UpdateFailEntity = '[User Office Project] Update Fail Entity',
  DestroyEntity = '[User Office Project] Destroy Entity',
  DestroySuccessEntity = '[User Office Project] Destroy Success Entity',
  DestroyFailEntity = '[User Office Project] Destroy Fail Entity',
  PaginateEntity = '[User Office Project] Paginate Entity',
  LoadEntityShared = '[User Office Project] Load Entity Shared',
  Reset = '[User Office Project] Reset',
  SetSelected = '[User Office Project] Set Selected'
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

export class Reset implements Action {
  readonly type = EntityActionTypes.Reset;
  constructor(public payload: { redirect: boolean }) { }
}

export class SetSelected implements Action {
  readonly type = EntityActionTypes.SetSelected;
  constructor(public payload: { selected: fromModels.SelectedUserOfficeProject }) { }
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
  | Reset
  | SetSelected;
