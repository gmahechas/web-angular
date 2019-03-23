import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromMacroprojectActions from '@web/app/features/d/macroproject/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutMacroprojectEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromMacroprojectActions.EntityActionTypes.LoadEntity,
      fromMacroprojectActions.EntityActionTypes.StoreEntity,
      fromMacroprojectActions.EntityActionTypes.UpdateEntity,
      fromMacroprojectActions.EntityActionTypes.DestroyEntity,
      fromMacroprojectActions.EntityActionTypes.PaginateEntity,
      fromMacroprojectActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner({ toggle: true }));
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromMacroprojectActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromMacroprojectActions.EntityActionTypes.StoreSuccessEntity,
      fromMacroprojectActions.EntityActionTypes.UpdateSuccessEntity,
      fromMacroprojectActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
      this.store.dispatch(new fromCore.ShowMessages({
        messages: [
          { severity: 'success', summary: 'Exito', detail: 'Se llevo a cabo', key: 'toast' }
        ]
      }));
    })
  );

  @Effect({ dispatch: false })
  fail$ = this.actions$.pipe(
    ofType(
      fromMacroprojectActions.EntityActionTypes.LoadFailEntity,
      fromMacroprojectActions.EntityActionTypes.StoreFailEntity,
      fromMacroprojectActions.EntityActionTypes.UpdateFailEntity,
      fromMacroprojectActions.EntityActionTypes.DestroyFailEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
      this.store.dispatch(new fromCore.ShowMessages({
        messages: [
          { severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error.', key: 'toast' }
        ]
      }));
    })
  );

  // Redirects
  @Effect({ dispatch: false })
  successRedirect$ = this.actions$.pipe(
    ofType(
      fromMacroprojectActions.EntityActionTypes.LoadEntity,
      fromMacroprojectActions.EntityActionTypes.StoreSuccessEntity,
      fromMacroprojectActions.EntityActionTypes.UpdateSuccessEntity,
      fromMacroprojectActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['macroproject'] }));
    })
  );

  @Effect({ dispatch: false })
  reset$ = this.actions$.pipe(
    ofType(fromMacroprojectActions.EntityActionTypes.Reset),
    map((action: fromMacroprojectActions.Reset) => action.payload),
    tap(({ redirect }) => {
      if (redirect) {
        this.store.dispatch(new fromCore.Go({ path: ['macroproject'] }));
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
