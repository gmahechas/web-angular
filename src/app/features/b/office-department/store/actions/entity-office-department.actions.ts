import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/b/office-department/models';

export const LoadEntity = createAction(
  '[OfficeDepartment] Load Entity',
  props<{ search: fromModels.SearchOfficeDepartment }>()
);

export const LoadSuccessEntity = createAction(
  '[OfficeDepartment] Load Success Entity',
  props<{ entities: fromModels.PaginationOfficeDepartment }>()
);

export const LoadFailEntity = createAction(
  '[OfficeDepartment] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[OfficeDepartment] Store Entity',
  props<{ entity: fromModels.OfficeDepartment }>()
);

export const StoreSuccessEntity = createAction(
  '[OfficeDepartment] Store Success Entity',
  props<{ entity: fromModels.StoreOfficeDepartment }>()
);

export const StoreFailEntity = createAction(
  '[OfficeDepartment] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[OfficeDepartment] Update Entity',
  props<{ entity: fromModels.OfficeDepartment }>()
);

export const UpdateSuccessEntity = createAction(
  '[OfficeDepartment] Update Success Entity',
  props<{ entity: fromModels.UpdateOfficeDepartment }>()
);

export const UpdateFailEntity = createAction(
  '[OfficeDepartment] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[OfficeDepartment] Destroy Entity',
  props<{ entity: fromModels.OfficeDepartment }>()
);

export const DestroySuccessEntity = createAction(
  '[OfficeDepartment] Destroy Success Entity',
  props<{ entity: fromModels.DestroyOfficeDepartment }>()
);

export const DestroyFailEntity = createAction(
  '[OfficeDepartment] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[OfficeDepartment] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[OfficeDepartment] Load Entity Shared',
  props<{ search: fromModels.SearchOfficeDepartment}>()
);

export const Reset = createAction(
  '[OfficeDepartment] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[OfficeDepartment] Set Selected',
  props<{ selected: fromModels.SelectedOfficeDepartment }>()
);
