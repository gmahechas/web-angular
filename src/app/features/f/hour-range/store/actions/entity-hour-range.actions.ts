import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/f/hour-range/models';

export const LoadEntity = createAction(
  '[HourRange] Load Entity',
  props<{ search: fromModels.SearchHourRange }>()
);

export const LoadSuccessEntity = createAction(
  '[HourRange] Load Success Entity',
  props<{ entities: fromModels.PaginationHourRange }>()
);

export const LoadFailEntity = createAction(
  '[HourRange] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[HourRange] Store Entity',
  props<{ entity: fromModels.HourRange }>()
);

export const StoreSuccessEntity = createAction(
  '[HourRange] Store Success Entity',
  props<{ entity: fromModels.StoreHourRange }>()
);

export const StoreFailEntity = createAction(
  '[HourRange] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[HourRange] Update Entity',
  props<{ entity: fromModels.HourRange }>()
);

export const UpdateSuccessEntity = createAction(
  '[HourRange] Update Success Entity',
  props<{ entity: fromModels.UpdateHourRange }>()
);

export const UpdateFailEntity = createAction(
  '[HourRange] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[HourRange] Destroy Entity',
  props<{ entity: fromModels.HourRange }>()
);

export const DestroySuccessEntity = createAction(
  '[HourRange] Destroy Success Entity',
  props<{ entity: fromModels.DestroyHourRange }>()
);

export const DestroyFailEntity = createAction(
  '[HourRange] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[HourRange] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[HourRange] Load Entity Shared',
  props<{ search: fromModels.SearchHourRange}>()
);

export const Reset = createAction(
  '[HourRange] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[HourRange] Set Selected',
  props<{ selected: fromModels.SelectedHourRange }>()
);
