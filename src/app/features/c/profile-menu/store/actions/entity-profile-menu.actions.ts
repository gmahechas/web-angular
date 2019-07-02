import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/c/profile-menu/models';

export const LoadEntity = createAction(
  '[ProfileMenu] Load Entity',
  props<{ search: fromModels.SearchProfileMenu }>()
);

export const LoadSuccessEntity = createAction(
  '[ProfileMenu] Load Success Entity',
  props<{ entities: fromModels.PaginationProfileMenu }>()
);

export const LoadFailEntity = createAction(
  '[ProfileMenu] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[ProfileMenu] Store Entity',
  props<{ entity: fromModels.ProfileMenu }>()
);

export const StoreSuccessEntity = createAction(
  '[ProfileMenu] Store Success Entity',
  props<{ entity: fromModels.StoreProfileMenu }>()
);

export const StoreFailEntity = createAction(
  '[ProfileMenu] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[ProfileMenu] Update Entity',
  props<{ entity: fromModels.ProfileMenu }>()
);

export const UpdateSuccessEntity = createAction(
  '[ProfileMenu] Update Success Entity',
  props<{ entity: fromModels.UpdateProfileMenu }>()
);

export const UpdateFailEntity = createAction(
  '[ProfileMenu] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[ProfileMenu] Destroy Entity',
  props<{ entity: fromModels.ProfileMenu }>()
);

export const DestroySuccessEntity = createAction(
  '[ProfileMenu] Destroy Success Entity',
  props<{ entity: fromModels.DestroyProfileMenu }>()
);

export const DestroyFailEntity = createAction(
  '[ProfileMenu] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[ProfileMenu] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[ProfileMenu] Load Entity Shared',
  props<{ search: fromModels.SearchProfileMenu}>()
);

export const Reset = createAction(
  '[ProfileMenu] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[ProfileMenu] Set Selected',
  props<{ selected: fromModels.SelectedProfileMenu }>()
);
