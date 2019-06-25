import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/f/schedule-day/models';

export const LoadEntity = createAction(
  '[ScheduleDay] Load Entity',
  props<{ search: fromModels.SearchScheduleDay }>()
);

export const LoadSuccessEntity = createAction(
  '[ScheduleDay] Load Success Entity',
  props<{ entities: fromModels.PaginationScheduleDay }>()
);

export const LoadFailEntity = createAction(
  '[ScheduleDay] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[ScheduleDay] Store Entity',
  props<{ entity: fromModels.ScheduleDay }>()
);

export const StoreSuccessEntity = createAction(
  '[ScheduleDay] Store Success Entity',
  props<{ entity: fromModels.StoreScheduleDay }>()
);

export const StoreFailEntity = createAction(
  '[ScheduleDay] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[ScheduleDay] Update Entity',
  props<{ entity: fromModels.ScheduleDay }>()
);

export const UpdateSuccessEntity = createAction(
  '[ScheduleDay] Update Success Entity',
  props<{ entity: fromModels.UpdateScheduleDay }>()
);

export const UpdateFailEntity = createAction(
  '[ScheduleDay] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[ScheduleDay] Destroy Entity',
  props<{ entity: fromModels.ScheduleDay }>()
);

export const DestroySuccessEntity = createAction(
  '[ScheduleDay] Destroy Success Entity',
  props<{ entity: fromModels.DestroyScheduleDay }>()
);

export const DestroyFailEntity = createAction(
  '[ScheduleDay] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[ScheduleDay] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[ScheduleDay] Load Entity Shared',
  props<{ search: fromModels.SearchScheduleDay}>()
);

export const Reset = createAction(
  '[ScheduleDay] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[ScheduleDay] Set Selected',
  props<{ selected: fromModels.SelectedScheduleDay }>()
);
