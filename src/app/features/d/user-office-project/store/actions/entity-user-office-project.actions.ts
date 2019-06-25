import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/d/user-office-project/models';

export const LoadEntity = createAction(
  '[UserOfficeProject] Load Entity',
  props<{ search: fromModels.SearchUserOfficeProject }>()
);

export const LoadSuccessEntity = createAction(
  '[UserOfficeProject] Load Success Entity',
  props<{ entities: fromModels.PaginationUserOfficeProject }>()
);

export const LoadFailEntity = createAction(
  '[UserOfficeProject] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[UserOfficeProject] Store Entity',
  props<{ entity: fromModels.UserOfficeProject }>()
);

export const StoreSuccessEntity = createAction(
  '[UserOfficeProject] Store Success Entity',
  props<{ entity: fromModels.StoreUserOfficeProject }>()
);

export const StoreFailEntity = createAction(
  '[UserOfficeProject] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[UserOfficeProject] Update Entity',
  props<{ entity: fromModels.UserOfficeProject }>()
);

export const UpdateSuccessEntity = createAction(
  '[UserOfficeProject] Update Success Entity',
  props<{ entity: fromModels.UpdateUserOfficeProject }>()
);

export const UpdateFailEntity = createAction(
  '[UserOfficeProject] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[UserOfficeProject] Destroy Entity',
  props<{ entity: fromModels.UserOfficeProject }>()
);

export const DestroySuccessEntity = createAction(
  '[UserOfficeProject] Destroy Success Entity',
  props<{ entity: fromModels.DestroyUserOfficeProject }>()
);

export const DestroyFailEntity = createAction(
  '[UserOfficeProject] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[UserOfficeProject] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[UserOfficeProject] Load Entity Shared',
  props<{ search: fromModels.SearchUserOfficeProject}>()
);

export const Reset = createAction(
  '[UserOfficeProject] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[UserOfficeProject] Set Selected',
  props<{ selected: fromModels.SelectedUserOfficeProject }>()
);
