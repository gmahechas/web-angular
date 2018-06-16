import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

export enum EntityActionTypes {
  LoadEntity = '[Country] Load Entity ',
  LoadSuccessEntity = '[Country] Load Success Entity',
  LoadFailEntity = '[Country] Load Fail Entity',
  StoreEntity = '[Country] Store Entity',
  StoreSuccessEntity = '[Country] Store Success Entity',
  StoreFailEntity = '[Country] Store Fail Entity',
  UpdateEntity = '[Country] Update Entity',
  UpdateSuccessEntity = '[Country] Update Success Entity',
  UpdateFailEntity = '[Country] Update Fail Entity',
  DestroyEntity = '[Country] Destroy Entity',
  DestroySuccessEntity = '[Country] Destroy Success Entity',
  DestroyFailEntity = '[Country] Destroy Fail Entity',
  PaginateEntity = '[Country] Paginate Entity',
  LoadEntityShared = '[Country] Load Entity Shared',
  LoadSuccessEntityShared = '[Country] Load Success Entity Shared',
  LoadFailEntityShared = '[Country] Load Fail Entity Shared'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: fromModels.SearchCountry) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: fromModels.PaginationCountry) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: any) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: fromModels.Country) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: fromModels.StoreCountry) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: any) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: fromModels.Country) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: fromModels.UpdateCountry) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: any) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: fromModels.Country) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: fromModels.DestroyCountry) { }
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
  constructor(public payload: fromModels.SearchCountry) { }
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
