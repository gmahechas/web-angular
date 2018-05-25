import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  StartCreateEntity = '[Country] Start Create Entity',
  StopCreateEntity = '[Country] Stop Create Entity',
}

export class StartCreateEntity implements Action {
  readonly type = LayoutActionTypes.StartCreateEntity;
}

export class StopCreateEntity implements Action {
  readonly type = LayoutActionTypes.StopCreateEntity;
}

export type LayoutActions =
  | StartCreateEntity
  | StopCreateEntity;
