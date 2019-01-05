import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/c/type-person/models';

export enum EntityActionTypes {
  LoadEntity = '[TypePerson] Load Entity ',
  LoadSuccessEntity = '[TypePerson] Load Success Entity',
  LoadFailEntity = '[TypePerson] Load Fail Entity',
  StoreEntity = '[TypePerson] Store Entity',
  StoreSuccessEntity = '[TypePerson] Store Success Entity',
  StoreFailEntity = '[TypePerson] Store Fail Entity',
  UpdateEntity = '[TypePerson] Update Entity',
  UpdateSuccessEntity = '[TypePerson] Update Success Entity',
  UpdateFailEntity = '[TypePerson] Update Fail Entity',
  DestroyEntity = '[TypePerson] Destroy Entity',
  DestroySuccessEntity = '[TypePerson] Destroy Success Entity',
  DestroyFailEntity = '[TypePerson] Destroy Fail Entity',
  PaginateEntity = '[TypePerson] Paginate Entity',
  LoadEntityShared = '[TypePerson] Load Entity Shared',
  ResetSearch = '[TypePerson] Reset Search',
  SelectEntity = '[TypePerson] Select Entity'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchTypePerson }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationTypePerson }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.TypePerson }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreTypePerson }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.TypePerson }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateTypePerson }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.TypePerson }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyTypePerson }) { }
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
  constructor(public payload: { search: fromModels.SearchTypePerson }) { }
}

export class ResetSearch implements Action {
  readonly type = EntityActionTypes.ResetSearch;
}

export class SelectEntity implements Action {
  readonly type = EntityActionTypes.SelectEntity;
  constructor(public payload: { entity: fromModels.TypePerson }) { }
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
  | SelectEntity;
