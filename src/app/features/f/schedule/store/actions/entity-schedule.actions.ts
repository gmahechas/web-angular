import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/f/schedule/models';

export const LoadEntity = createAction(
  '[Schedule] Load Entity',
  props<{ search: fromModels.SearchSchedule }>()
);

export const LoadSuccessEntity = createAction(
  '[Schedule] Load Success Entity',
  props<{ entities: fromModels.PaginationSchedule }>()
);

export const LoadFailEntity = createAction(
  '[Schedule] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[Schedule] Store Entity',
  props<{ entity: fromModels.Schedule }>()
);

export const StoreSuccessEntity = createAction(
  '[Schedule] Store Success Entity',
  props<{ entity: fromModels.StoreSchedule }>()
);

export const StoreFailEntity = createAction(
  '[Schedule] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[Schedule] Update Entity',
  props<{ entity: fromModels.Schedule }>()
);

export const UpdateSuccessEntity = createAction(
  '[Schedule] Update Success Entity',
  props<{ entity: fromModels.UpdateSchedule }>()
);

export const UpdateFailEntity = createAction(
  '[Schedule] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[Schedule] Destroy Entity',
  props<{ entity: fromModels.Schedule }>()
);

export const DestroySuccessEntity = createAction(
  '[Schedule] Destroy Success Entity',
  props<{ entity: fromModels.DestroySchedule }>()
);

export const DestroyFailEntity = createAction(
  '[Schedule] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[Schedule] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[Schedule] Load Entity Shared',
  props<{ search: fromModels.SearchSchedule}>()
);

export const Reset = createAction(
  '[Schedule] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[Schedule] Set Selected',
  props<{ selected: fromModels.SelectedSchedule }>()
);
