import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from '@web/app/two/user-office/store/actions';

import * as fromModels from '@web/app/two/user-office/models';

import { UserOfficeService } from '@web/app/two/user-office/services/user-office.service';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class EntityUserOfficeEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload),
    switchMap(({ search }: { search: fromModels.SearchUserOffice }) => {
      return this.userOfficeService.load(search).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromActions.UpdateEntity>(fromActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((userOffice: fromModels.UserOffice) => {
      return this.userOfficeService.update(userOffice).pipe(
        map(({ data }) => new fromActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromActions.DestroyEntity>(fromActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((userOffice: fromModels.UserOffice) => {
      return this.userOfficeService.destroy(userOffice).pipe(
        map(({ data }) => new fromActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromActions.DestroyFailEntity({ error })))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userOfficeService: UserOfficeService,
  ) { }

}
