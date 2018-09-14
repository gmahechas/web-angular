import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

export enum EntityActionTypes {
  LoadEntity = '[Macroproject] Load Entity ',
  LoadSuccessEntity = '[Macroproject] Load Success Entity',
  LoadFailEntity = '[Macroproject] Load Fail Entity',
  StoreEntity = '[Macroproject] Store Entity',
  StoreSuccessEntity = '[Macroproject] Store Success Entity',
  StoreFailEntity = '[Macroproject] Store Fail Entity',
  UpdateEntity = '[Macroproject] Update Entity',
  UpdateSuccessEntity = '[Macroproject] Update Success Entity',
  UpdateFailEntity = '[Macroproject] Update Fail Entity',
  DestroyEntity = '[Macroproject] Destroy Entity',
  DestroySuccessEntity = '[Macroproject] Destroy Success Entity',
  DestroyFailEntity = '[Macroproject] Destroy Fail Entity',
  PaginateEntity = '[Macroproject] Paginate Entity',
  LoadEntityShared = '[Macroproject] Load Entity Shared'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: fromModels.SearchMacroproject) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: fromModels.PaginationMacroproject) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: any) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: fromModels.Macroproject) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: fromModels.StoreMacroproject) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: any) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: fromModels.Macroproject) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: fromModels.UpdateMacroproject) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: any) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: fromModels.Macroproject) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: fromModels.DestroyMacroproject) { }
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
  constructor(public payload: fromModels.SearchMacroproject) { }
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
  