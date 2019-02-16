import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/f/schedule-day/models';

export enum EntityActionTypes {
  LoadEntity = '[ScheduleDay] Load Entity ',
  LoadSuccessEntity = '[ScheduleDay] Load Success Entity',
  LoadFailEntity = '[ScheduleDay] Load Fail Entity',
  StoreEntity = '[ScheduleDay] Store Entity',
  StoreSuccessEntity = '[ScheduleDay] Store Success Entity',
  StoreFailEntity = '[ScheduleDay] Store Fail Entity',
  UpdateEntity = '[ScheduleDay] Update Entity',
  UpdateSuccessEntity = '[ScheduleDay] Update Success Entity',
  UpdateFailEntity = '[ScheduleDay] Update Fail Entity',
  DestroyEntity = '[ScheduleDay] Destroy Entity',
  DestroySuccessEntity = '[ScheduleDay] Destroy Success Entity',
  DestroyFailEntity = '[ScheduleDay] Destroy Fail Entity',
  PaginateEntity = '[ScheduleDay] Paginate Entity',
  LoadEntityShared = '[ScheduleDay] Load Entity Shared',
  Reset = '[ScheduleDay] Reset',
  SetSelected = '[ScheduleDay] Set Selected'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchScheduleDay }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationScheduleDay }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.ScheduleDay }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreScheduleDay }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.ScheduleDay }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateScheduleDay }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.ScheduleDay }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyScheduleDay }) { }
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
  constructor(public payload: { search: fromModels.SearchScheduleDay }) { }
}

export class Reset implements Action {
  readonly type = EntityActionTypes.Reset;
}

export class SetSelected implements Action {
  readonly type = EntityActionTypes.SetSelected;
  constructor(public payload: { selected: fromModels.SelectedScheduleDay }) { }
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
