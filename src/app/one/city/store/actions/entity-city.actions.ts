import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

export enum EntityActionTypes {
  LoadEntity = '[City] Load Entity ',
  LoadSuccessEntity = '[City] Load Success Entity',
  LoadFailEntity = '[City] Load Fail Entity',
  StoreEntity = '[City] Store Entity',
  StoreSuccessEntity = '[City] Store Success Entity',
  StoreFailEntity = '[City] Store Fail Entity',
  UpdateEntity = '[City] Update Entity',
  UpdateSuccessEntity = '[City] Update Success Entity',
  UpdateFailEntity = '[City] Update Fail Entity',
  DestroyEntity = '[City] Destroy Entity',
  DestroySuccessEntity = '[City] Destroy Success Entity',
  DestroyFailEntity = '[City] Destroy Fail Entity',
  PaginateEntity = '[City] Paginate Entity',
  LoadEntityShared = '[City] Load Entity Shared'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: fromModels.SearchCity) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: fromModels.PaginationCity) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: any) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: fromModels.City) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: fromModels.StoreCity) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: any) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: fromModels.City) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: fromModels.UpdateCity) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: any) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: fromModels.City) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: fromModels.DestroyCity) { }
}

export class DestroyFailEntity implements Action {
  readonly type = EntityActionTypes.DestroyFailEntity;
  constructor(public payload: any) { }
}

export class PaginateEntity implements Action {
  readonly type = EntityActionTypes.PaginateEntity;
  constructor(public payload: number) { }
}

export class LoadEntityShared implements Action {
  readonly type = EntityActionTypes.LoadEntityShared;
  constructor(public payload: fromModels.SearchCity) { }
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
  | LoadEntityShared;
