import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/b/office-department/models';

export enum EntityActionTypes {
  LoadEntity = '[OfficeDepartment] Load Entity ',
  LoadSuccessEntity = '[OfficeDepartment] Load Success Entity',
  LoadFailEntity = '[OfficeDepartment] Load Fail Entity',
  StoreEntity = '[OfficeDepartment] Store Entity',
  StoreSuccessEntity = '[OfficeDepartment] Store Success Entity',
  StoreFailEntity = '[OfficeDepartment] Store Fail Entity',
  UpdateEntity = '[OfficeDepartment] Update Entity',
  UpdateSuccessEntity = '[OfficeDepartment] Update Success Entity',
  UpdateFailEntity = '[OfficeDepartment] Update Fail Entity',
  DestroyEntity = '[OfficeDepartment] Destroy Entity',
  DestroySuccessEntity = '[OfficeDepartment] Destroy Success Entity',
  DestroyFailEntity = '[OfficeDepartment] Destroy Fail Entity',
  PaginateEntity = '[OfficeDepartment] Paginate Entity',
  LoadEntityShared = '[OfficeDepartment] Load Entity Shared',
  ResetSearch = '[OfficeDepartment] Reset Search',
  SetSelected = '[OfficeDepartment] Set Selected'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchOfficeDepartment }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationOfficeDepartment }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.OfficeDepartment }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreOfficeDepartment }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.OfficeDepartment }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateOfficeDepartment }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.OfficeDepartment }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyOfficeDepartment }) { }
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
  constructor(public payload: { search: fromModels.SearchOfficeDepartment }) { }
}

export class ResetSearch implements Action {
  readonly type = EntityActionTypes.ResetSearch;
}

export class SetSelected implements Action {
  readonly type = EntityActionTypes.SetSelected;
  constructor(public payload: { selected: fromModels.SelectedOfficeDepartment }) { }
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
