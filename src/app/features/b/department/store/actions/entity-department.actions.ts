import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/b/department/models';

export enum EntityActionTypes {
  LoadEntity = '[Department] Load Entity ',
  LoadSuccessEntity = '[Department] Load Success Entity',
  LoadFailEntity = '[Department] Load Fail Entity',
  StoreEntity = '[Department] Store Entity',
  StoreSuccessEntity = '[Department] Store Success Entity',
  StoreFailEntity = '[Department] Store Fail Entity',
  UpdateEntity = '[Department] Update Entity',
  UpdateSuccessEntity = '[Department] Update Success Entity',
  UpdateFailEntity = '[Department] Update Fail Entity',
  DestroyEntity = '[Department] Destroy Entity',
  DestroySuccessEntity = '[Department] Destroy Success Entity',
  DestroyFailEntity = '[Department] Destroy Fail Entity',
  PaginateEntity = '[Department] Paginate Entity',
  LoadEntityShared = '[Department] Load Entity Shared',
  Reset = '[Department] Reset',
  SetSelected = '[Department] Set Selected'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchDepartment }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationDepartment }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.Department }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreDepartment }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.Department }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateDepartment }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.Department }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyDepartment }) { }
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
  constructor(public payload: { search: fromModels.SearchDepartment }) { }
}

export class Reset implements Action {
  readonly type = EntityActionTypes.Reset;
  constructor(public payload: { redirect: boolean }) { }
}

export class SetSelected implements Action {
  readonly type = EntityActionTypes.SetSelected;
  constructor(public payload: { selected: fromModels.SelectedDepartment }) { }
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
