import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/a/estate/models';

export const LoadEntity = createAction(
  '[Estate] Load Entity',
  props<{ search: fromModels.SearchEstate }>()
);

export const LoadSuccessEntity = createAction(
  '[Estate] Load Success Entity',
  props<{ entities: fromModels.PaginationEstate }>()
);

export const LoadFailEntity = createAction(
  '[Estate] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[Estate] Store Entity',
  props<{ entity: fromModels.Estate }>()
);

export const StoreSuccessEntity = createAction(
  '[Estate] Store Success Entity',
  props<{ entity: fromModels.StoreEstate }>()
);

export const StoreFailEntity = createAction(
  '[Estate] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[Estate] Update Entity',
  props<{ entity: fromModels.Estate }>()
);

export const UpdateSuccessEntity = createAction(
  '[Estate] Update Success Entity',
  props<{ entity: fromModels.UpdateEstate }>()
);

export const UpdateFailEntity = createAction(
  '[Estate] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[Estate] Destroy Entity',
  props<{ entity: fromModels.Estate }>()
);

export const DestroySuccessEntity = createAction(
  '[Estate] Destroy Success Entity',
  props<{ entity: fromModels.DestroyEstate }>()
);

export const DestroyFailEntity = createAction(
  '[Estate] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[Estate] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[Estate] Load Entity Shared',
  props<{ search: fromModels.SearchEstate}>()
);

export const Reset = createAction(
  '[Estate] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[Estate] Set Selected',
  props<{ selected: fromModels.SelectedEstate }>()
);
