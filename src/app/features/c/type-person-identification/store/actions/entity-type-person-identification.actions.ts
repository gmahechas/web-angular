import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/c/type-person-identification/models';

export const LoadEntity = createAction(
  '[TypePersonIdentification] Load Entity',
  props<{ search: fromModels.SearchTypePersonIdentification }>()
);

export const LoadSuccessEntity = createAction(
  '[TypePersonIdentification] Load Success Entity',
  props<{ entities: fromModels.PaginationTypePersonIdentification }>()
);

export const LoadFailEntity = createAction(
  '[TypePersonIdentification] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[TypePersonIdentification] Store Entity',
  props<{ entity: fromModels.TypePersonIdentification }>()
);

export const StoreSuccessEntity = createAction(
  '[TypePersonIdentification] Store Success Entity',
  props<{ entity: fromModels.StoreTypePersonIdentification }>()
);

export const StoreFailEntity = createAction(
  '[TypePersonIdentification] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[TypePersonIdentification] Update Entity',
  props<{ entity: fromModels.TypePersonIdentification }>()
);

export const UpdateSuccessEntity = createAction(
  '[TypePersonIdentification] Update Success Entity',
  props<{ entity: fromModels.UpdateTypePersonIdentification }>()
);

export const UpdateFailEntity = createAction(
  '[TypePersonIdentification] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[TypePersonIdentification] Destroy Entity',
  props<{ entity: fromModels.TypePersonIdentification }>()
);

export const DestroySuccessEntity = createAction(
  '[TypePersonIdentification] Destroy Success Entity',
  props<{ entity: fromModels.DestroyTypePersonIdentification }>()
);

export const DestroyFailEntity = createAction(
  '[TypePersonIdentification] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[TypePersonIdentification] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[TypePersonIdentification] Load Entity Shared',
  props<{ search: fromModels.SearchTypePersonIdentification}>()
);

export const Reset = createAction(
  '[TypePersonIdentification] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[TypePersonIdentification] Set Selected',
  props<{ selected: fromModels.SelectedTypePersonIdentification }>()
);
