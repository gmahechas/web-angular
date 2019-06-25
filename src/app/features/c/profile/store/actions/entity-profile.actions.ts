import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/c/profile/models';

export const LoadEntity = createAction(
  '[Profile] Load Entity',
  props<{ search: fromModels.SearchProfile }>()
);

export const LoadSuccessEntity = createAction(
  '[Profile] Load Success Entity',
  props<{ entities: fromModels.PaginationProfile }>()
);

export const LoadFailEntity = createAction(
  '[Profile] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[Profile] Store Entity',
  props<{ entity: fromModels.Profile }>()
);

export const StoreSuccessEntity = createAction(
  '[Profile] Store Success Entity',
  props<{ entity: fromModels.StoreProfile }>()
);

export const StoreFailEntity = createAction(
  '[Profile] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[Profile] Update Entity',
  props<{ entity: fromModels.Profile }>()
);

export const UpdateSuccessEntity = createAction(
  '[Profile] Update Success Entity',
  props<{ entity: fromModels.UpdateProfile }>()
);

export const UpdateFailEntity = createAction(
  '[Profile] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[Profile] Destroy Entity',
  props<{ entity: fromModels.Profile }>()
);

export const DestroySuccessEntity = createAction(
  '[Profile] Destroy Success Entity',
  props<{ entity: fromModels.DestroyProfile }>()
);

export const DestroyFailEntity = createAction(
  '[Profile] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[Profile] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[Profile] Load Entity Shared',
  props<{ search: fromModels.SearchProfile}>()
);

export const Reset = createAction(
  '[Profile] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[Profile] Set Selected',
  props<{ selected: fromModels.SelectedProfile }>()
);
