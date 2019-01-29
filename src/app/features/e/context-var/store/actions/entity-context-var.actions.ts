import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/e/context-var/models';

export enum EntityActionTypes {
  LoadEntity = '[ContextVar] Load Entity ',
  LoadSuccessEntity = '[ContextVar] Load Success Entity',
  LoadFailEntity = '[ContextVar] Load Fail Entity',
  StoreEntity = '[ContextVar] Store Entity',
  StoreSuccessEntity = '[ContextVar] Store Success Entity',
  StoreFailEntity = '[ContextVar] Store Fail Entity',
  UpdateEntity = '[ContextVar] Update Entity',
  UpdateSuccessEntity = '[ContextVar] Update Success Entity',
  UpdateFailEntity = '[ContextVar] Update Fail Entity',
  DestroyEntity = '[ContextVar] Destroy Entity',
  DestroySuccessEntity = '[ContextVar] Destroy Success Entity',
  DestroyFailEntity = '[ContextVar] Destroy Fail Entity',
  PaginateEntity = '[ContextVar] Paginate Entity',
  LoadEntityShared = '[ContextVar] Load Entity Shared',
  ResetSearch = '[ContextVar] Reset Search',
  SetSelected = '[ContextVar] Set Selected'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchContextVar }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationContextVar }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.ContextVar }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreContextVar }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.ContextVar }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateContextVar }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.ContextVar }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyContextVar }) { }
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
  constructor(public payload: { search: fromModels.SearchContextVar }) { }
}

export class ResetSearch implements Action {
  readonly type = EntityActionTypes.ResetSearch;
}

export class SetSelected implements Action {
  readonly type = EntityActionTypes.SetSelected;
  constructor(public payload: { selected: fromModels.SelectedContextVar }) { }
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
  | ResetSearch
  | SetSelected;
