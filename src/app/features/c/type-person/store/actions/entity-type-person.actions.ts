import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/c/type-person/models';

export const LoadEntity = createAction(
  '[TypePerson] Load Entity',
  props<{ search: fromModels.SearchTypePerson }>()
);

export const LoadSuccessEntity = createAction(
  '[TypePerson] Load Success Entity',
  props<{ entities: fromModels.PaginationTypePerson }>()
);

export const LoadFailEntity = createAction(
  '[TypePerson] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[TypePerson] Store Entity',
  props<{ entity: fromModels.TypePerson }>()
);

export const StoreSuccessEntity = createAction(
  '[TypePerson] Store Success Entity',
  props<{ entity: fromModels.StoreTypePerson }>()
);

export const StoreFailEntity = createAction(
  '[TypePerson] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[TypePerson] Update Entity',
  props<{ entity: fromModels.TypePerson }>()
);

export const UpdateSuccessEntity = createAction(
  '[TypePerson] Update Success Entity',
  props<{ entity: fromModels.UpdateTypePerson }>()
);

export const UpdateFailEntity = createAction(
  '[TypePerson] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[TypePerson] Destroy Entity',
  props<{ entity: fromModels.TypePerson }>()
);

export const DestroySuccessEntity = createAction(
  '[TypePerson] Destroy Success Entity',
  props<{ entity: fromModels.DestroyTypePerson }>()
);

export const DestroyFailEntity = createAction(
  '[TypePerson] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[TypePerson] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[TypePerson] Load Entity Shared',
  props<{ search: fromModels.SearchTypePerson}>()
);

export const Reset = createAction(
  '[TypePerson] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[TypePerson] Set Selected',
  props<{ selected: fromModels.SelectedTypePerson }>()
);
