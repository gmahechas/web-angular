import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/b/office/models';

export enum EntityActionTypes {
  LoadEntity = '[Office] Load Entity ',
  LoadSuccessEntity = '[Office] Load Success Entity',
  LoadFailEntity = '[Office] Load Fail Entity',
  StoreEntity = '[Office] Store Entity',
  StoreSuccessEntity = '[Office] Store Success Entity',
  StoreFailEntity = '[Office] Store Fail Entity',
  SelectEntity = '[Office] Select Entity',
  UpdateEntity = '[Office] Update Entity',
  UpdateSuccessEntity = '[Office] Update Success Entity',
  UpdateFailEntity = '[Office] Update Fail Entity',
  DestroyEntity = '[Office] Destroy Entity',
  DestroySuccessEntity = '[Office] Destroy Success Entity',
  DestroyFailEntity = '[Office] Destroy Fail Entity',
  PaginateEntity = '[Office] Paginate Entity',
  LoadEntityShared = '[Office] Load Entity Shared',
  ResetSearch = '[Office] Reset Search'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchOffice }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationOffice }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.Office }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreOffice }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class SelectEntity implements Action {
  readonly type = EntityActionTypes.SelectEntity;
  constructor(public payload: { entity: fromModels.Office }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.Office }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateOffice }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.Office }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyOffice }) { }
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
  constructor(public payload: { search: fromModels.SearchOffice }) { }
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
