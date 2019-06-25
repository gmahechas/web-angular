import { createAction, props } from '@ngrx/store';

import { Confirm } from '@web/app/core/models/confirm.model';

export const SetDefaultLang = createAction(
  '[Layout Core] Set Default Lang',
  props<{ lang: string }>()
);

export const ChangeLang = createAction(
  '[Layout Core] Change Lang',
  props<{ lang: string }>()
);

export const ShowSidebar = createAction(
  '[Layout Core] Show Sidebar',
  props<{ toggle: boolean }>()
);

export const BlockedDocument = createAction(
  '[Layout Core] Blocked Document',
  props<{ toggle: boolean }>()
);

export const ShowSpinner = createAction(
  '[Layout Core] Show Spinner',
  props<{ toggle: boolean }>()
);

export const ShowProgressBar = createAction(
  '[Layout Core] Show Progress Bar',
  props<{ toggle: boolean }>()
);

export const SetUserOffice = createAction(
  '[Layout Core] Set User Office',
  props<{ userOffice: any, redirect: boolean }>()
);

export const SetUserOfficeProject = createAction(
  '[Layout Core] Set User Office Project',
  props<{ userOfficeProject: any, redirect: boolean }>()
);

export const AddSelectedMenu = createAction(
  '[Layout Core] Add Selected Menu',
  props<{ profile_menu: any }>()
);

export const ChangeSelectedMenu = createAction(
  '[Layout Core] Change Selected Menu',
  props<{ profile_menu: any }>()
);

export const RemoveSelectedMenu = createAction(
  '[Layout Core] Remove Selected Menu',
  props<{ index: number }>()
);

export const ShowMessages = createAction(
  '[Layout Core] Show Messages',
  props<{ messages: any[] }>()
);

export const ConfirmDialog = createAction(
  '[Layout Core] Confirm Dialog',
  props<{ confirm: Confirm }>()
);
