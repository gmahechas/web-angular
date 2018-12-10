import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/c/type-person-identification/models';

export enum EntityActionTypes {
  LoadEntity = '[TypePersonIdentification] Load Entity ',
  LoadSuccessEntity = '[TypePersonIdentification] Load Success Entity',
  LoadFailEntity = '[TypePersonIdentification] Load Fail Entity',
  StoreEntity = '[TypePersonIdentification] Store Entity',
  StoreSuccessEntity = '[TypePersonIdentification] Store Success Entity',
  StoreFailEntity = '[TypePersonIdentification] Store Fail Entity',
  UpdateEntity = '[TypePersonIdentification] Update Entity',
  UpdateSuccessEntity = '[TypePersonIdentification] Update Success Entity',
  UpdateFailEntity = '[TypePersonIdentification] Update Fail Entity',
  DestroyEntity = '[TypePersonIdentification] Destroy Entity',
  DestroySuccessEntity = '[TypePersonIdentification] Destroy Success Entity',
  DestroyFailEntity = '[TypePersonIdentification] Destroy Fail Entity',
  PaginateEntity = '[TypePersonIdentification] Paginate Entity',
  LoadEntityShared = '[TypePersonIdentification] Load Entity Shared',
  ResetSearch = '[TypePersonIdentification] Reset Search'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchTypePersonIdentification }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationTypePersonIdentification }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.TypePersonIdentification }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreTypePersonIdentification }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.TypePersonIdentification }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateTypePersonIdentification }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.TypePersonIdentification }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyTypePersonIdentification }) { }
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
  constructor(public payload: { search: fromModels.SearchTypePersonIdentification }) { }
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
