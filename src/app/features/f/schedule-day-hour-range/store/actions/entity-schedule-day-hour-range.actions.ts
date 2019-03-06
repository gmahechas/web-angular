import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/f/schedule-day-hour-range/models';

export enum EntityActionTypes {
  LoadEntity = '[ScheduleDayHourRange] Load Entity ',
  LoadSuccessEntity = '[ScheduleDayHourRange] Load Success Entity',
  LoadFailEntity = '[ScheduleDayHourRange] Load Fail Entity',
  StoreEntity = '[ScheduleDayHourRange] Store Entity',
  StoreSuccessEntity = '[ScheduleDayHourRange] Store Success Entity',
  StoreFailEntity = '[ScheduleDayHourRange] Store Fail Entity',
  UpdateEntity = '[ScheduleDayHourRange] Update Entity',
  UpdateSuccessEntity = '[ScheduleDayHourRange] Update Success Entity',
  UpdateFailEntity = '[ScheduleDayHourRange] Update Fail Entity',
  DestroyEntity = '[ScheduleDayHourRange] Destroy Entity',
  DestroySuccessEntity = '[ScheduleDayHourRange] Destroy Success Entity',
  DestroyFailEntity = '[ScheduleDayHourRange] Destroy Fail Entity',
  PaginateEntity = '[ScheduleDayHourRange] Paginate Entity',
  LoadEntityShared = '[ScheduleDayHourRange] Load Entity Shared',
  Reset = '[ScheduleDayHourRange] Reset',
  SetSelected = '[ScheduleDayHourRange] Set Selected'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchScheduleDayHourRange }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationScheduleDayHourRange }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.ScheduleDayHourRange }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreScheduleDayHourRange }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.ScheduleDayHourRange }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateScheduleDayHourRange }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.ScheduleDayHourRange }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyScheduleDayHourRange }) { }
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
  constructor(public payload: { search: fromModels.SearchScheduleDayHourRange }) { }
}

export class Reset implements Action {
  readonly type = EntityActionTypes.Reset;
  constructor(public payload: { redirect: boolean }) { }
}

export class SetSelected implements Action {
  readonly type = EntityActionTypes.SetSelected;
  constructor(public payload: { selected: fromModels.SelectedScheduleDayHourRange }) { }
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
