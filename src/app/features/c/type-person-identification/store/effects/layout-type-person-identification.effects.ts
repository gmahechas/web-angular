import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromTypePersonIdentificationActions from '@web/app/features/c/type-person-identification/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutTypePersonIdentificationEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromTypePersonIdentificationActions.EntityActionTypes.LoadEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.StoreEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.UpdateEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.DestroyEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.PaginateEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner());
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromTypePersonIdentificationActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromTypePersonIdentificationActions.EntityActionTypes.StoreSuccessEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.UpdateSuccessEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
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
      fromTypePersonIdentificationActions.EntityActionTypes.LoadFailEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.StoreFailEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.UpdateFailEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.DestroyFailEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
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
      fromTypePersonIdentificationActions.EntityActionTypes.LoadEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.StoreSuccessEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.UpdateSuccessEntity,
      fromTypePersonIdentificationActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['type_person_identification'] }));
    })
  );

  @Effect({ dispatch: false })
  reset$ = this.actions$.pipe(
    ofType(fromTypePersonIdentificationActions.EntityActionTypes.Reset),
    map((action: fromTypePersonIdentificationActions.Reset) => action.payload),
    tap(({ redirect }) => {
      if (redirect) {
        this.store.dispatch(new fromCore.Go({ path: ['type_person_identification'] }));
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
