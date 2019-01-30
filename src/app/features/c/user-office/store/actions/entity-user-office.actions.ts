import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/c/user-office/models';

export enum EntityActionTypes {
  LoadEntity = '[User Office] Load Entity ',
  LoadSuccessEntity = '[User Office] Load Success Entity',
  LoadFailEntity = '[User Office] Load Fail Entity',
  StoreEntity = '[User Office] Store Entity',
  StoreSuccessEntity = '[User Office] Store Success Entity',
  StoreFailEntity = '[User Office] Store Fail Entity',
  UpdateEntity = '[User Office] Update Entity',
  UpdateSuccessEntity = '[User Office] Update Success Entity',
  UpdateFailEntity = '[User Office] Update Fail Entity',
  DestroyEntity = '[User Office] Destroy Entity',
  DestroySuccessEntity = '[User Office] Destroy Success Entity',
  DestroyFailEntity = '[User Office] Destroy Fail Entity',
  PaginateEntity = '[User Office] Paginate Entity',
  LoadEntityShared = '[User Office] Load Entity Shared',
  Reset = '[User Office] Reset',
  SetSelected = '[User Office] Set Selected'
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

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.UserOffice }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreUserOffice }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.UserOffice }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateUserOffice }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.UserOffice }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyUserOffice }) { }
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
  constructor(public payload: { search: fromModels.SearchUserOffice }) { }
}

export class Reset implements Action {
  readonly type = EntityActionTypes.Reset;
}

export class SetSelected implements Action {
  readonly type = EntityActionTypes.SetSelected;
  constructor(public payload: { selected: fromModels.SelectedUserOffice }) { }
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
