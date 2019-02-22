import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/f/schedule/models';

export enum EntityActionTypes {
  LoadEntity = '[Schedule] Load Entity ',
  LoadSuccessEntity = '[Schedule] Load Success Entity',
  LoadFailEntity = '[Schedule] Load Fail Entity',
  StoreEntity = '[Schedule] Store Entity',
  StoreSuccessEntity = '[Schedule] Store Success Entity',
  StoreFailEntity = '[Schedule] Store Fail Entity',
  UpdateEntity = '[Schedule] Update Entity',
  UpdateSuccessEntity = '[Schedule] Update Success Entity',
  UpdateFailEntity = '[Schedule] Update Fail Entity',
  DestroyEntity = '[Schedule] Destroy Entity',
  DestroySuccessEntity = '[Schedule] Destroy Success Entity',
  DestroyFailEntity = '[Schedule] Destroy Fail Entity',
  PaginateEntity = '[Schedule] Paginate Entity',
  LoadEntityShared = '[Schedule] Load Entity Shared',
  Reset = '[Schedule] Reset',
  SetSelected = '[Schedule] Set Selected'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchSchedule }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationSchedule }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.Schedule }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreSchedule }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.Schedule }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateSchedule }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.Schedule }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroySchedule }) { }
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
  constructor(public payload: { search: fromModels.SearchSchedule }) { }
}

export class Reset implements Action {
  readonly type = EntityActionTypes.Reset;
  constructor(public payload: { redirect: boolean }) { }
}

export class SetSelected implements Action {
  readonly type = EntityActionTypes.SetSelected;
  constructor(public payload: { selected: fromModels.SelectedSchedule }) { }
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
