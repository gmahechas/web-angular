import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/features/c/profile-menu/models';

export enum EntityActionTypes {
  LoadEntity = '[ProfileMenu] Load Entity ',
  LoadSuccessEntity = '[ProfileMenu] Load Success Entity',
  LoadFailEntity = '[ProfileMenu] Load Fail Entity',
  StoreEntity = '[ProfileMenu] Store Entity',
  StoreSuccessEntity = '[ProfileMenu] Store Success Entity',
  StoreFailEntity = '[ProfileMenu] Store Fail Entity',
  UpdateEntity = '[ProfileMenu] Update Entity',
  UpdateSuccessEntity = '[ProfileMenu] Update Success Entity',
  UpdateFailEntity = '[ProfileMenu] Update Fail Entity',
  DestroyEntity = '[ProfileMenu] Destroy Entity',
  DestroySuccessEntity = '[ProfileMenu] Destroy Success Entity',
  DestroyFailEntity = '[ProfileMenu] Destroy Fail Entity',
  PaginateEntity = '[ProfileMenu] Paginate Entity',
  LoadEntityShared = '[ProfileMenu] Load Entity Shared',
  Reset = '[ProfileMenu] Reset',
  SetSelected = '[ProfileMenu] Set Selected'
}

export class LoadEntity implements Action {
  readonly type = EntityActionTypes.LoadEntity;
  constructor(public payload: { search: fromModels.SearchProfileMenu }) { }
}

export class LoadSuccessEntity implements Action {
  readonly type = EntityActionTypes.LoadSuccessEntity;
  constructor(public payload: { entities: fromModels.PaginationProfileMenu }) { }
}

export class LoadFailEntity implements Action {
  readonly type = EntityActionTypes.LoadFailEntity;
  constructor(public payload: { error: any }) { }
}

export class StoreEntity implements Action {
  readonly type = EntityActionTypes.StoreEntity;
  constructor(public payload: { entity: fromModels.ProfileMenu }) { }
}

export class StoreSuccessEntity implements Action {
  readonly type = EntityActionTypes.StoreSuccessEntity;
  constructor(public payload: { entity: fromModels.StoreProfileMenu }) { }
}

export class StoreFailEntity implements Action {
  readonly type = EntityActionTypes.StoreFailEntity;
  constructor(public payload: { error: any }) { }
}

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: fromModels.ProfileMenu }) { }
}

export class UpdateSuccessEntity implements Action {
  readonly type = EntityActionTypes.UpdateSuccessEntity;
  constructor(public payload: { entity: fromModels.UpdateProfileMenu }) { }
}

export class UpdateFailEntity implements Action {
  readonly type = EntityActionTypes.UpdateFailEntity;
  constructor(public payload: { error: any }) { }
}

export class DestroyEntity implements Action {
  readonly type = EntityActionTypes.DestroyEntity;
  constructor(public payload: { entity: fromModels.ProfileMenu }) { }
}

export class DestroySuccessEntity implements Action {
  readonly type = EntityActionTypes.DestroySuccessEntity;
  constructor(public payload: { entity: fromModels.DestroyProfileMenu }) { }
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
  constructor(public payload: { search: fromModels.SearchProfileMenu }) { }
}

export class Reset implements Action {
  readonly type = EntityActionTypes.Reset;
  constructor(public payload: { redirect: boolean }) { }
}

export class SetSelected implements Action {
  readonly type = EntityActionTypes.SetSelected;
  constructor(public payload: { selected: fromModels.SelectedProfileMenu }) { }
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
