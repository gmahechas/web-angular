import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/c/user-office/models';

export const LoadEntity = createAction(
  '[UserOffice] Load Entity',
  props<{ search: fromModels.SearchUserOffice }>()
);

export const LoadSuccessEntity = createAction(
  '[UserOffice] Load Success Entity',
  props<{ entities: fromModels.PaginationUserOffice }>()
);

export const LoadFailEntity = createAction(
  '[UserOffice] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[UserOffice] Store Entity',
  props<{ entity: fromModels.UserOffice }>()
);

export const StoreSuccessEntity = createAction(
  '[UserOffice] Store Success Entity',
  props<{ entity: fromModels.StoreUserOffice }>()
);

export const StoreFailEntity = createAction(
  '[UserOffice] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[UserOffice] Update Entity',
  props<{ entity: fromModels.UserOffice }>()
);

export const UpdateSuccessEntity = createAction(
  '[UserOffice] Update Success Entity',
  props<{ entity: fromModels.UpdateUserOffice }>()
);

export const UpdateFailEntity = createAction(
  '[UserOffice] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[UserOffice] Destroy Entity',
  props<{ entity: fromModels.UserOffice }>()
);

export const DestroySuccessEntity = createAction(
  '[UserOffice] Destroy Success Entity',
  props<{ entity: fromModels.DestroyUserOffice }>()
);

export const DestroyFailEntity = createAction(
  '[UserOffice] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[UserOffice] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[UserOffice] Load Entity Shared',
  props<{ search: fromModels.SearchUserOffice}>()
);

export const Reset = createAction(
  '[UserOffice] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[UserOffice] Set Selected',
  props<{ selected: fromModels.SelectedUserOffice }>()
);
