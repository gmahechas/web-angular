import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/c/profile/models';

export enum EntityActionTypes {
  LoadEntity = '[Profile] Load Entity ',
  LoadSuccessEntity = '[Profile] Load Success Entity',
  LoadFailEntity = '[Profile] Load Fail Entity',
  StoreEntity = '[Profile] Store Entity',
  StoreSuccessEntity = '[Profile] Store Success Entity',
  StoreFailEntity = '[Profile] Store Fail Entity',
  SelectEntity = '[Estate] Select Entity',
  UpdateEntity = '[Profile] Update Entity',
  UpdateSuccessEntity = '[Profile] Update Success Entity',
  UpdateFailEntity = '[Profile] Update Fail Entity',
  DestroyEntity = '[Profile] Destroy Entity',
  DestroySuccessEntity = '[Profile] Destroy Success Entity',
  DestroyFailEntity = '[Profile] Destroy Fail Entity',
  PaginateEntity = '[Profile] Paginate Entity',
  LoadEntityShared = '[Profile] Load Entity Shared',
  ResetSearch = '[Profile] Reset Search'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchProfile }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationProfile }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.Profile }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreProfile }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class SelectEntity implements Action {
  readonly type = EntityActionTypes.SelectEntity;
  constructor(public payload: { entity: fromModels.Profile }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.Profile }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateProfile }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.Profile }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyProfile }) { }
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
  constructor(public payload: { search: fromModels.SearchProfile }) { }
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
  | SelectEntity
  | UpdateEntity
  | UpdateSuccessEntity
  | UpdateFailEntity
  | DestroyEntity
  | DestroySuccessEntity
  | DestroyFailEntity
  | PaginateEntity
  | LoadEntityShared
  | ResetSearch;
