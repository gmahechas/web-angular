import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/c/user/models';

export const LoadEntity = createAction(
  '[User] Load Entity',
  props<{ search: fromModels.SearchUser }>()
);

export const LoadSuccessEntity = createAction(
  '[User] Load Success Entity',
  props<{ entities: fromModels.PaginationUser }>()
);

export const LoadFailEntity = createAction(
  '[User] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[User] Store Entity',
  props<{ entity: fromModels.User }>()
);

export const StoreSuccessEntity = createAction(
  '[User] Store Success Entity',
  props<{ entity: fromModels.StoreUser }>()
);

export const StoreFailEntity = createAction(
  '[User] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[User] Update Entity',
  props<{ entity: fromModels.User }>()
);

export const UpdateSuccessEntity = createAction(
  '[User] Update Success Entity',
  props<{ entity: fromModels.UpdateUser }>()
);

export const UpdateFailEntity = createAction(
  '[User] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[User] Destroy Entity',
  props<{ entity: fromModels.User }>()
);

export const DestroySuccessEntity = createAction(
  '[User] Destroy Success Entity',
  props<{ entity: fromModels.DestroyUser }>()
);

export const DestroyFailEntity = createAction(
  '[User] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[User] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[User] Load Entity Shared',
  props<{ search: fromModels.SearchUser}>()
);

export const Reset = createAction(
  '[User] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[User] Set Selected',
  props<{ selected: fromModels.SelectedUser }>()
);
