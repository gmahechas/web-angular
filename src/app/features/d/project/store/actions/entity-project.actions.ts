import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/d/project/models';

export const LoadEntity = createAction(
  '[Project] Load Entity',
  props<{ search: fromModels.SearchProject }>()
);

export const LoadSuccessEntity = createAction(
  '[Project] Load Success Entity',
  props<{ entities: fromModels.PaginationProject }>()
);

export const LoadFailEntity = createAction(
  '[Project] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[Project] Store Entity',
  props<{ entity: fromModels.Project }>()
);

export const StoreSuccessEntity = createAction(
  '[Project] Store Success Entity',
  props<{ entity: fromModels.StoreProject }>()
);

export const StoreFailEntity = createAction(
  '[Project] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[Project] Update Entity',
  props<{ entity: fromModels.Project }>()
);

export const UpdateSuccessEntity = createAction(
  '[Project] Update Success Entity',
  props<{ entity: fromModels.UpdateProject }>()
);

export const UpdateFailEntity = createAction(
  '[Project] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[Project] Destroy Entity',
  props<{ entity: fromModels.Project }>()
);

export const DestroySuccessEntity = createAction(
  '[Project] Destroy Success Entity',
  props<{ entity: fromModels.DestroyProject }>()
);

export const DestroyFailEntity = createAction(
  '[Project] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[Project] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[Project] Load Entity Shared',
  props<{ search: fromModels.SearchProject}>()
);

export const Reset = createAction(
  '[Project] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[Project] Set Selected',
  props<{ selected: fromModels.SelectedProject }>()
);
