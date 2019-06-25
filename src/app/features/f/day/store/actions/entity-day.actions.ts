import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/f/day/models';

export const LoadEntity = createAction(
  '[Day] Load Entity',
  props<{ search: fromModels.SearchDay }>()
);

export const LoadSuccessEntity = createAction(
  '[Day] Load Success Entity',
  props<{ entities: fromModels.PaginationDay }>()
);

export const LoadFailEntity = createAction(
  '[Day] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[Day] Store Entity',
  props<{ entity: fromModels.Day }>()
);

export const StoreSuccessEntity = createAction(
  '[Day] Store Success Entity',
  props<{ entity: fromModels.StoreDay }>()
);

export const StoreFailEntity = createAction(
  '[Day] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[Day] Update Entity',
  props<{ entity: fromModels.Day }>()
);

export const UpdateSuccessEntity = createAction(
  '[Day] Update Success Entity',
  props<{ entity: fromModels.UpdateDay }>()
);

export const UpdateFailEntity = createAction(
  '[Day] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[Day] Destroy Entity',
  props<{ entity: fromModels.Day }>()
);

export const DestroySuccessEntity = createAction(
  '[Day] Destroy Success Entity',
  props<{ entity: fromModels.DestroyDay }>()
);

export const DestroyFailEntity = createAction(
  '[Day] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[Day] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[Day] Load Entity Shared',
  props<{ search: fromModels.SearchDay}>()
);

export const Reset = createAction(
  '[Day] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[Day] Set Selected',
  props<{ selected: fromModels.SelectedDay }>()
);
