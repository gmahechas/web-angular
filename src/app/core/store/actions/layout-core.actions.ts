import { Action } from '@ngrx/store';

import { Confirm } from '@web/app/core/models/confirm.model';

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
  SetUserOffice = '[Layout] Set User Office',
  SetUserOfficeProject = '[Layout] Set User Office Project',
  AddSelectedMenu = '[Layout] Add Selected Menu',
  ChangeSelectedMenu = '[Layout] Change Selected Menu',
  RemoveSelectedMenu = '[Layout] Remove Selected Menu',
  ShowMessages = '[Layout] Show Messages',
  ConfirmDialog = '[Layout] Confirm Dialog'
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
  | OpenSidebar
  | CloseSidebar
  | BlockedDocument
  | UnblockedDocument
  | ShowSpinner
  | CloseSpinner
  | ShowProgressBar
  | CloseProgressBar
  | SetUserOffice
  | SetUserOfficeProject
  | AddSelectedMenu
  | ChangeSelectedMenu
  | RemoveSelectedMenu
  | ShowMessages
  | ConfirmDialog;
