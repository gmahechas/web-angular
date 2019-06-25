import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/features/d/macroproject/models';

export const LoadEntity = createAction(
  '[Macroproject] Load Entity',
  props<{ search: fromModels.SearchMacroproject }>()
);

export const LoadSuccessEntity = createAction(
  '[Macroproject] Load Success Entity',
  props<{ entities: fromModels.PaginationMacroproject }>()
);

export const LoadFailEntity = createAction(
  '[Macroproject] Load Fail Entity',
  props<{ error: any }>()
);

export const StoreEntity = createAction(
  '[Macroproject] Store Entity',
  props<{ entity: fromModels.Macroproject }>()
);

export const StoreSuccessEntity = createAction(
  '[Macroproject] Store Success Entity',
  props<{ entity: fromModels.StoreMacroproject }>()
);

export const StoreFailEntity = createAction(
  '[Macroproject] Store Fail Entity',
  props<{ error: any }>()
);

export const UpdateEntity = createAction(
  '[Macroproject] Update Entity',
  props<{ entity: fromModels.Macroproject }>()
);

export const UpdateSuccessEntity = createAction(
  '[Macroproject] Update Success Entity',
  props<{ entity: fromModels.UpdateMacroproject }>()
);

export const UpdateFailEntity = createAction(
  '[Macroproject] Update Fail Entity',
  props<{ error: any }>()
);

export const DestroyEntity = createAction(
  '[Macroproject] Destroy Entity',
  props<{ entity: fromModels.Macroproject }>()
);

export const DestroySuccessEntity = createAction(
  '[Macroproject] Destroy Success Entity',
  props<{ entity: fromModels.DestroyMacroproject }>()
);

export const DestroyFailEntity = createAction(
  '[Macroproject] Destroy Fail Entity',
  props<{ error: any }>()
);

export const PaginateEntity = createAction(
  '[Macroproject] Paginate Entity',
  props<{ page: number }>()
);

export const LoadEntityShared = createAction(
  '[Macroproject] Load Entity Shared',
  props<{ search: fromModels.SearchMacroproject}>()
);

export const Reset = createAction(
  '[Macroproject] Reset',
  props<{ redirect: boolean }>()
);

export const SetSelected = createAction(
  '[Macroproject] Set Selected',
  props<{ selected: fromModels.SelectedMacroproject }>()
);
