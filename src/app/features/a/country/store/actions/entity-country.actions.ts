import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/a/country/models';

export const LoadEntity = createAction(
  '[Country] Load Entity',
  props<{ search: fromModels.SearchCountry }>()
);

export const LoadSuccessEntity = createAction(
  '[Country] Load Success Entity',
  props<{ entities: fromModels.PaginationCountry }>()
);

export const LoadFailEntity = createAction(
  '[Country] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[Country] Store Entity',
  props<{ entity: fromModels.Country }>()
);

export const StoreSuccessEntity = createAction(
  '[Country] Store Success Entity',
  props<{ entity: fromModels.StoreCountry }>()
);

export const StoreFailEntity = createAction(
  '[Country] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[Country] Update Entity',
  props<{ entity: fromModels.Country }>()
);

export const UpdateSuccessEntity = createAction(
  '[Country] Update Success Entity',
  props<{ entity: fromModels.UpdateCountry }>()
);

export const UpdateFailEntity = createAction(
  '[Country] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[Country] Destroy Entity',
  props<{ entity: fromModels.Country }>()
);

export const DestroySuccessEntity = createAction(
  '[Country] Destroy Success Entity',
  props<{ entity: fromModels.DestroyCountry }>()
);

export const DestroyFailEntity = createAction(
  '[Country] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[Country] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[Country] Load Entity Shared',
  props<{ search: fromModels.SearchCountry }>()
);

export const Reset = createAction(
  '[Country] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[Country] Set Selected',
  props<{ selected: fromModels.SelectedCountry }>()
);
