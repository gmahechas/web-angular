import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/e/workflow/models';

export const LoadEntity = createAction(
  '[Workflow] Load Entity',
  props<{ search: fromModels.SearchWorkflow }>()
);

export const LoadSuccessEntity = createAction(
  '[Workflow] Load Success Entity',
  props<{ entities: fromModels.PaginationWorkflow }>()
);

export const LoadFailEntity = createAction(
  '[Workflow] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[Workflow] Store Entity',
  props<{ entity: fromModels.Workflow }>()
);

export const StoreSuccessEntity = createAction(
  '[Workflow] Store Success Entity',
  props<{ entity: fromModels.StoreWorkflow }>()
);

export const StoreFailEntity = createAction(
  '[Workflow] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[Workflow] Update Entity',
  props<{ entity: fromModels.Workflow }>()
);

export const UpdateSuccessEntity = createAction(
  '[Workflow] Update Success Entity',
  props<{ entity: fromModels.UpdateWorkflow }>()
);

export const UpdateFailEntity = createAction(
  '[Workflow] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[Workflow] Destroy Entity',
  props<{ entity: fromModels.Workflow }>()
);

export const DestroySuccessEntity = createAction(
  '[Workflow] Destroy Success Entity',
  props<{ entity: fromModels.DestroyWorkflow }>()
);

export const DestroyFailEntity = createAction(
  '[Workflow] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[Workflow] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[Workflow] Load Entity Shared',
  props<{ search: fromModels.SearchWorkflow}>()
);

export const Reset = createAction(
  '[Workflow] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[Workflow] Set Selected',
  props<{ selected: fromModels.SelectedWorkflow }>()
);
