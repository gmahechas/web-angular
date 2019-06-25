import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/b/department/models';

export const LoadEntity = createAction(
  '[Department] Load Entity',
  props<{ search: fromModels.SearchDepartment }>()
);

export const LoadSuccessEntity = createAction(
  '[Department] Load Success Entity',
  props<{ entities: fromModels.PaginationDepartment }>()
);

export const LoadFailEntity = createAction(
  '[Department] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[Department] Store Entity',
  props<{ entity: fromModels.Department }>()
);

export const StoreSuccessEntity = createAction(
  '[Department] Store Success Entity',
  props<{ entity: fromModels.StoreDepartment }>()
);

export const StoreFailEntity = createAction(
  '[Department] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[Department] Update Entity',
  props<{ entity: fromModels.Department }>()
);

export const UpdateSuccessEntity = createAction(
  '[Department] Update Success Entity',
  props<{ entity: fromModels.UpdateDepartment }>()
);

export const UpdateFailEntity = createAction(
  '[Department] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[Department] Destroy Entity',
  props<{ entity: fromModels.Department }>()
);

export const DestroySuccessEntity = createAction(
  '[Department] Destroy Success Entity',
  props<{ entity: fromModels.DestroyDepartment }>()
);

export const DestroyFailEntity = createAction(
  '[Department] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[Department] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[Department] Load Entity Shared',
  props<{ search: fromModels.SearchDepartment}>()
);

export const Reset = createAction(
  '[Department] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[Department] Set Selected',
  props<{ selected: fromModels.SelectedDepartment }>()
);
