import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RouterActionTypes {
  Go = '[Router Core] Go',
  Back = '[Router Core] Back',
  Forward = '[Router Core] Forward',
}

export class Go implements Action {
  readonly type = RouterActionTypes.Go;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) { }
}

export class Back implements Action {
  readonly type = RouterActionTypes.Back;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.Forward;
}

export type RouterActions =
  | Go
  | Back
  | Forward;
