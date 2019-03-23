import { Action } from '@ngrx/store';

import { Confirm } from '@web/app/core/models/confirm.model';

export enum LayoutActionTypes {
  SetDefaultLang = '[Layout Core] Set Default Lang',
  ChangeLang = '[Layout Core] Get Menu',
  OpenCloseSidebar = '[Layout Core] Open Close Sidebar',
  BlockedDocument = '[Layout Core] Blocked Document',
  ShowSpinner = '[Layout Core] Open Spinner',
  ShowProgressBar = '[Layout Core] Open Progress Bar',
  CloseProgressBar = '[Layout Core] Close Progress Bar',
  SetUserOffice = '[Layout Core] Set User Office',
  SetUserOfficeProject = '[Layout Core] Set User Office Project',
  AddSelectedMenu = '[Layout Core] Add Selected Menu',
  ChangeSelectedMenu = '[Layout Core] Change Selected Menu',
  RemoveSelectedMenu = '[Layout Core] Remove Selected Menu',
  ShowMessages = '[Layout Core] Show Messages',
  ConfirmDialog = '[Layout Core] Confirm Dialog'
}

export class SetDefaultLang implements Action {
  readonly type = LayoutActionTypes.SetDefaultLang;
  constructor(public payload: { lang: string }) { }
}

export class ChangeLang implements Action {
  readonly type = LayoutActionTypes.ChangeLang;
  constructor(public payload: { lang: string }) { }
}

export class OpenCloseSidebar implements Action {
  readonly type = LayoutActionTypes.OpenCloseSidebar;
  constructor(public payload: { showSidebar: boolean }) { }
}

export class BlockedDocument implements Action {
  readonly type = LayoutActionTypes.BlockedDocument;
  constructor(public payload: { toggle: boolean }) { }
}

export class ShowSpinner implements Action {
  readonly type = LayoutActionTypes.ShowSpinner;
  constructor(public payload: { toggle: boolean }) { }
}

export class ShowProgressBar implements Action {
  readonly type = LayoutActionTypes.ShowProgressBar;
}

export class CloseProgressBar implements Action {
  readonly type = LayoutActionTypes.CloseProgressBar;
}

export class SetUserOffice implements Action {
  readonly type = LayoutActionTypes.SetUserOffice;
  constructor(public payload: { userOffice: any }) { }
}

export class SetUserOfficeProject implements Action {
  readonly type = LayoutActionTypes.SetUserOfficeProject;
  constructor(public payload: { userOfficeProject: any }) { }
}

export class AddSelectedMenu implements Action {
  readonly type = LayoutActionTypes.AddSelectedMenu;
  constructor(public payload: { profile_menu: any }) { }
}

export class ChangeSelectedMenu implements Action {
  readonly type = LayoutActionTypes.ChangeSelectedMenu;
  constructor(public payload: { profile_menu: any }) { }
}

export class RemoveSelectedMenu implements Action {
  readonly type = LayoutActionTypes.RemoveSelectedMenu;
  constructor(public payload: { index: number }) { }
}

export class ShowMessages implements Action {
  readonly type = LayoutActionTypes.ShowMessages;
  constructor(public payload: { messages: any[] }) { }
}

export class ConfirmDialog implements Action {
  readonly type = LayoutActionTypes.ConfirmDialog;
  constructor(public payload: { confirm: Confirm }) { }
}

export type LayoutActions =
  | SetDefaultLang
  | ChangeLang
  | OpenCloseSidebar
  | BlockedDocument
  | ShowSpinner
  | ShowProgressBar
  | CloseProgressBar
  | SetUserOffice
  | SetUserOfficeProject
  | AddSelectedMenu
  | ChangeSelectedMenu
  | RemoveSelectedMenu
  | ShowMessages
  | ConfirmDialog;
