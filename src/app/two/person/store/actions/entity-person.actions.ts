import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

export enum EntityActionTypes {
  LoadEntity = '[Person] Load Entity ',
  LoadSuccessEntity = '[Person] Load Success Entity',
  LoadFailEntity = '[Person] Load Fail Entity',
  StoreEntity = '[Person] Store Entity',
  StoreSuccessEntity = '[Person] Store Success Entity',
  StoreFailEntity = '[Person] Store Fail Entity',
  UpdateEntity = '[Person] Update Entity',
  UpdateSuccessEntity = '[Person] Update Success Entity',
  UpdateFailEntity = '[Person] Update Fail Entity',
  DestroyEntity = '[Person] Destroy Entity',
  DestroySuccessEntity = '[Person] Destroy Success Entity',
  DestroyFailEntity = '[Person] Destroy Fail Entity',
  PaginateEntity = '[Person] Paginate Entity',
  LoadEntityShared = '[Person] Load Entity Shared',
  ResetSearch = '[Person] Reset Search'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchPerson }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationPerson }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.Person }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StorePerson }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.Person }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdatePerson }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.Person }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyPerson }) { }
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
  constructor(public payload: { search: fromModels.SearchPerson }) { }
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
