import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/f/hour-range/models';

export enum EntityActionTypes {
  LoadEntity = '[HourRange] Load Entity ',
  LoadSuccessEntity = '[HourRange] Load Success Entity',
  LoadFailEntity = '[HourRange] Load Fail Entity',
  StoreEntity = '[HourRange] Store Entity',
  StoreSuccessEntity = '[HourRange] Store Success Entity',
  StoreFailEntity = '[HourRange] Store Fail Entity',
  SelectEntity = '[HourRange] Select Entity',
  UpdateEntity = '[HourRange] Update Entity',
  UpdateSuccessEntity = '[HourRange] Update Success Entity',
  UpdateFailEntity = '[HourRange] Update Fail Entity',
  DestroyEntity = '[HourRange] Destroy Entity',
  DestroySuccessEntity = '[HourRange] Destroy Success Entity',
  DestroyFailEntity = '[HourRange] Destroy Fail Entity',
  PaginateEntity = '[HourRange] Paginate Entity',
  LoadEntityShared = '[HourRange] Load Entity Shared',
  ResetSearch = '[HourRange] Reset Search',
  SetSelected = '[HourRange] Set Selected'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchHourRange }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationHourRange }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.HourRange }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreHourRange }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class SelectEntity implements Action {
  readonly type = EntityActionTypes.SelectEntity;
  constructor(public payload: { entity: fromModels.HourRange }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.HourRange }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateHourRange }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.HourRange }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyHourRange }) { }
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
  constructor(public payload: { search: fromModels.SearchHourRange }) { }
}

export class ResetSearch implements Action {
  readonly type = EntityActionTypes.ResetSearch;
}

export class SetSelected implements Action {
  readonly type = EntityActionTypes.SetSelected;
  constructor(public payload: { selected: fromModels.SelectedHourRange }) { }
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
  | ResetSearch
  | SetSelected;
