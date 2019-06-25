import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/c/person/models';

export const LoadEntity = createAction(
  '[Person] Load Entity',
  props<{ search: fromModels.SearchPerson }>()
);

export const LoadSuccessEntity = createAction(
  '[Person] Load Success Entity',
  props<{ entities: fromModels.PaginationPerson }>()
);

export const LoadFailEntity = createAction(
  '[Person] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[Person] Store Entity',
  props<{ entity: fromModels.Person }>()
);

export const StoreSuccessEntity = createAction(
  '[Person] Store Success Entity',
  props<{ entity: fromModels.StorePerson }>()
);

export const StoreFailEntity = createAction(
  '[Person] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[Person] Update Entity',
  props<{ entity: fromModels.Person }>()
);

export const UpdateSuccessEntity = createAction(
  '[Person] Update Success Entity',
  props<{ entity: fromModels.UpdatePerson }>()
);

export const UpdateFailEntity = createAction(
  '[Person] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[Person] Destroy Entity',
  props<{ entity: fromModels.Person }>()
);

export const DestroySuccessEntity = createAction(
  '[Person] Destroy Success Entity',
  props<{ entity: fromModels.DestroyPerson }>()
);

export const DestroyFailEntity = createAction(
  '[Person] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[Person] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[Person] Load Entity Shared',
  props<{ search: fromModels.SearchPerson}>()
);

export const Reset = createAction(
  '[Person] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[Person] Set Selected',
  props<{ selected: fromModels.SelectedPerson }>()
);
