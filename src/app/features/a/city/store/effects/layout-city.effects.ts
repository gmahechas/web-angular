import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromCityActions from '@web/app/features/a/city/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutCityEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromCityActions.EntityActionTypes.LoadEntity,
      fromCityActions.EntityActionTypes.StoreEntity,
      fromCityActions.EntityActionTypes.UpdateEntity,
      fromCityActions.EntityActionTypes.DestroyEntity,
      fromCityActions.EntityActionTypes.PaginateEntity,
      fromCityActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromCityActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromCityActions.EntityActionTypes.StoreSuccessEntity,
      fromCityActions.EntityActionTypes.UpdateSuccessEntity,
      fromCityActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
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
      fromCityActions.EntityActionTypes.LoadFailEntity,
      fromCityActions.EntityActionTypes.StoreFailEntity,
      fromCityActions.EntityActionTypes.UpdateFailEntity,
      fromCityActions.EntityActionTypes.DestroyFailEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
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
      fromCityActions.EntityActionTypes.LoadEntity,
      fromCityActions.EntityActionTypes.StoreSuccessEntity,
      fromCityActions.EntityActionTypes.UpdateSuccessEntity,
      fromCityActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['city'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
