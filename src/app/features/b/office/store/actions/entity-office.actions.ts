import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/b/office/models';

export const LoadEntity = createAction(
  '[Office] Load Entity',
  props<{ search: fromModels.SearchOffice }>()
);

export const LoadSuccessEntity = createAction(
  '[Office] Load Success Entity',
  props<{ entities: fromModels.PaginationOffice }>()
);

export const LoadFailEntity = createAction(
  '[Office] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[Office] Store Entity',
  props<{ entity: fromModels.Office }>()
);

export const StoreSuccessEntity = createAction(
  '[Office] Store Success Entity',
  props<{ entity: fromModels.StoreOffice }>()
);

export const StoreFailEntity = createAction(
  '[Office] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[Office] Update Entity',
  props<{ entity: fromModels.Office }>()
);

export const UpdateSuccessEntity = createAction(
  '[Office] Update Success Entity',
  props<{ entity: fromModels.UpdateOffice }>()
);

export const UpdateFailEntity = createAction(
  '[Office] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[Office] Destroy Entity',
  props<{ entity: fromModels.Office }>()
);

export const DestroySuccessEntity = createAction(
  '[Office] Destroy Success Entity',
  props<{ entity: fromModels.DestroyOffice }>()
);

export const DestroyFailEntity = createAction(
  '[Office] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[Office] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[Office] Load Entity Shared',
  props<{ search: fromModels.SearchOffice}>()
);

export const Reset = createAction(
  '[Office] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[Office] Set Selected',
  props<{ selected: fromModels.SelectedOffice }>()
);
