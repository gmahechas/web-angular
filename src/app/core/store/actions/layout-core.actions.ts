import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  SetDefaultLang = '[Layout] Set Default Lang',
  ChangeLang = '[Layout] Get Menu',
  OpenSidebar = '[Layout] Open Sidebar',
  CloseSidebar = '[Layout] Close Sidebar',
  BlockedDocument = '[Layout] Blocked Document',
  UnblockedDocument = '[Layout] Unblocked Document',
  ShowSpinner = '[Layout] Open Spinner',
  CloseSpinner = '[Layout] Close Spinner',
  ShowProgressBar = '[Layout] Open Progress Bar',
  CloseProgressBar = '[Layout] Close Progress Bar',
  SetOffice = '[Layout] Set Office',
  SetProject = '[Layout] Set Project',
  ShowMessages = '[Layout] Show Messages',
  GetMenu = '[Layout] Get Menu'
}

export class SetDefaultLang implements Action {
  readonly type = LayoutActionTypes.SetDefaultLang;
  constructor(public payload: { lang: string }) { }
}

export class ChangeLang implements Action {
  readonly type = LayoutActionTypes.ChangeLang;
  constructor(public payload: { lang: string }) { }
}

export class OpenSidebar implements Action {
  readonly type = LayoutActionTypes.OpenSidebar;
}

export class CloseSidebar implements Action {
  readonly type = LayoutActionTypes.CloseSidebar;
}

export class BlockedDocument implements Action {
  readonly type = LayoutActionTypes.BlockedDocument;
}

export class UnblockedDocument implements Action {
  readonly type = LayoutActionTypes.UnblockedDocument;
}

export class ShowSpinner implements Action {
  readonly type = LayoutActionTypes.ShowSpinner;
}

export class CloseSpinner implements Action {
  readonly type = LayoutActionTypes.CloseSpinner;
}

export class ShowProgressBar implements Action {
  readonly type = LayoutActionTypes.ShowProgressBar;
}

export class CloseProgressBar implements Action {
  readonly type = LayoutActionTypes.CloseProgressBar;
}

export class SetOffice implements Action {
  readonly type = LayoutActionTypes.SetOffice;
  constructor(public payload: { office: any }) { }
}

export class SetProject implements Action {
  readonly type = LayoutActionTypes.SetProject;
  constructor(public payload: { project: any }) { }
}

export class ShowMessages implements Action {
  readonly type = LayoutActionTypes.ShowMessages;
  constructor(public payload: any[]) { }
}

export class GetMenu implements Action {
  readonly type = LayoutActionTypes.ShowMessages;
}

export type LayoutActions =
  | SetDefaultLang
  | ChangeLang
  | OpenSidebar
  | CloseSidebar
  | BlockedDocument
  | UnblockedDocument
  | ShowSpinner
  | CloseSpinner
  | ShowProgressBar
  | CloseProgressBar
  | SetOffice
  | SetProject
  | ShowMessages
  | GetMenu;
