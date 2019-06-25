import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/f/schedule-day-hour-range/models';

export const LoadEntity = createAction(
  '[ScheduleDayHourRange] Load Entity',
  props<{ search: fromModels.SearchScheduleDayHourRange }>()
);

export const LoadSuccessEntity = createAction(
  '[ScheduleDayHourRange] Load Success Entity',
  props<{ entities: fromModels.PaginationScheduleDayHourRange }>()
);

export const LoadFailEntity = createAction(
  '[ScheduleDayHourRange] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[ScheduleDayHourRange] Store Entity',
  props<{ entity: fromModels.ScheduleDayHourRange }>()
);

export const StoreSuccessEntity = createAction(
  '[ScheduleDayHourRange] Store Success Entity',
  props<{ entity: fromModels.StoreScheduleDayHourRange }>()
);

export const StoreFailEntity = createAction(
  '[ScheduleDayHourRange] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[ScheduleDayHourRange] Update Entity',
  props<{ entity: fromModels.ScheduleDayHourRange }>()
);

export const UpdateSuccessEntity = createAction(
  '[ScheduleDayHourRange] Update Success Entity',
  props<{ entity: fromModels.UpdateScheduleDayHourRange }>()
);

export const UpdateFailEntity = createAction(
  '[ScheduleDayHourRange] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[ScheduleDayHourRange] Destroy Entity',
  props<{ entity: fromModels.ScheduleDayHourRange }>()
);

export const DestroySuccessEntity = createAction(
  '[ScheduleDayHourRange] Destroy Success Entity',
  props<{ entity: fromModels.DestroyScheduleDayHourRange }>()
);

export const DestroyFailEntity = createAction(
  '[ScheduleDayHourRange] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[ScheduleDayHourRange] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[ScheduleDayHourRange] Load Entity Shared',
  props<{ search: fromModels.SearchScheduleDayHourRange}>()
);

export const Reset = createAction(
  '[ScheduleDayHourRange] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[ScheduleDayHourRange] Set Selected',
  props<{ selected: fromModels.SelectedScheduleDayHourRange }>()
);
