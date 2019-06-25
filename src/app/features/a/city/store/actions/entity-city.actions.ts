import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/a/city/models';

export const LoadEntity = createAction(
  '[City] Load Entity',
  props<{ search: fromModels.SearchCity }>()
);

export const LoadSuccessEntity = createAction(
  '[City] Load Success Entity',
  props<{ entities: fromModels.PaginationCity }>()
);

export const LoadFailEntity = createAction(
  '[City] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[City] Store Entity',
  props<{ entity: fromModels.City }>()
);

export const StoreSuccessEntity = createAction(
  '[City] Store Success Entity',
  props<{ entity: fromModels.StoreCity }>()
);

export const StoreFailEntity = createAction(
  '[City] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[City] Update Entity',
  props<{ entity: fromModels.City }>()
);

export const UpdateSuccessEntity = createAction(
  '[City] Update Success Entity',
  props<{ entity: fromModels.UpdateCity }>()
);

export const UpdateFailEntity = createAction(
  '[City] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[City] Destroy Entity',
  props<{ entity: fromModels.City }>()
);

export const DestroySuccessEntity = createAction(
  '[City] Destroy Success Entity',
  props<{ entity: fromModels.DestroyCity }>()
);

export const DestroyFailEntity = createAction(
  '[City] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[City] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[City] Load Entity Shared',
  props<{ search: fromModels.SearchCity}>()
);

export const Reset = createAction(
  '[City] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[City] Set Selected',
  props<{ selected: fromModels.SelectedCity }>()
);
