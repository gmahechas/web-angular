import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSidebar = '[Layout] Open Sidebar',
  CloseSidebar = '[Layout] Close Sidebar',
  BlockedDocument = '[Layout] Blocked Document',
  UnblockedDocument = '[Layout] Unblocked Document',
  ShowSpinner = '[Layout] Open Spinner',
  CloseSpinner = '[Layout] Close Spinner',
  ShowProgressBar = '[Layout] Open Progress Bar',
  CloseProgressBar = '[Layout] Close Progress Bar',
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

export type LayoutActions =
  | OpenSidebar
  | CloseSidebar
  | BlockedDocument
  | UnblockedDocument
  | ShowSpinner
  | CloseSpinner
  | ShowProgressBar
  | CloseProgressBar;
