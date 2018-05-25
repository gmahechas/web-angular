import { Action } from '@ngrx/store';

import { Country } from './../../models/country.model';
import { SearchCountry } from './../../models/search-country.model';
import { PaginationCountry } from '../../models/pagination-country.model';
import { StoreCountry } from '../../models/store-country.model';
import { UpdateCountry } from '../../models/update-country.model';
import { DestroyCountry } from './../../models/destroy-country.model';

export enum EntityActionTypes {
  EntityLoad = '[Country] Entity Load',
  EntityLoadSuccess = '[Country] Entity Load Success',
  EntityLoadFail = '[Country] Entity Load Fail',
  EntitySelect = '[Country] Entity Select',
  EntityUnselect = '[Country] Entity Unselect',
  EntityStore = '[Country] Entity Store',
  EntityStoreSuccess = '[Country] Entity Store Success',
  EntityStoreFail = '[Country] Entity Store Fail',
  EntityUpdate = '[Country] Entity Update',
  EntityUpdateSuccess = '[Country] Entity Update Success',
  EntityUpdateFail = '[Country] Entity Update Fail',
  EntityDestroy = '[Country] Entity Destroy',
  EntityDestroySuccess = '[Country] Entity Destroy Success',
  EntityDestroyFail = '[Country] Entity Destroy Fail'
}

export class EntityLoad implements Action {
  readonly type = EntityActionTypes.EntityLoad;
  constructor(public payload: SearchCountry) { }
}

export class EntityLoadSuccess implements Action {
  readonly type = EntityActionTypes.EntityLoadSuccess;
  constructor(public payload: PaginationCountry) { }
}

export class EntityLoadFail implements Action {
  readonly type = EntityActionTypes.EntityLoadFail;
  constructor(public payload: any) { }
}

export class EntitySelect implements Action {
  readonly type = EntityActionTypes.EntitySelect;
  constructor(public payload: string) { }
}

export class EntityUnselect implements Action {
  readonly type = EntityActionTypes.EntityUnselect;
}

export class EntityStore implements Action {
  readonly type = EntityActionTypes.EntityStore;
  constructor(public payload: Country) { }
}

export class EntityStoreSuccess implements Action {
  readonly type = EntityActionTypes.EntityStoreSuccess;
  constructor(public payload: StoreCountry) { }
}

export class EntityStoreFail implements Action {
  readonly type = EntityActionTypes.EntityStoreFail;
  constructor(public payload: any) { }
}

export class EntityUpdate implements Action {
  readonly type = EntityActionTypes.EntityUpdate;
  constructor(public payload: Country) { }
}

export class EntityUpdateSuccess implements Action {
  readonly type = EntityActionTypes.EntityUpdateSuccess;
  constructor(public payload: UpdateCountry) { }
}

export class EntityUpdateFail implements Action {
  readonly type = EntityActionTypes.EntityUpdateFail;
  constructor(public payload: any) { }
}

export class EntityDestroy implements Action {
  readonly type = EntityActionTypes.EntityDestroy;
  constructor(public payload: Country) { }
}

export class EntityDestroySuccess implements Action {
  readonly type = EntityActionTypes.EntityDestroySuccess;
  constructor(public payload: DestroyCountry) { }
}

export class EntityDestroyFail implements Action {
  readonly type = EntityActionTypes.EntityDestroyFail;
  constructor(public payload: any) { }
}

export type EntityActions =
  | EntityLoad
  | EntityLoadSuccess
  | EntityLoadFail
  | EntitySelect
  | EntityUnselect
  | EntityStore
  | EntityStoreSuccess
  | EntityStoreFail
  | EntityUpdate
  | EntityUpdateSuccess
  | EntityUpdateFail
  | EntityDestroy
  | EntityDestroySuccess
  | EntityDestroyFail;
