import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from '@app/app/two/user-office/store/actions';

import * as fromModels from '@app/app/two/user-office/models';

import { UserOfficeService } from '@app/app/two/user-office/services/user-office.service';

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
        catchError((errors) => {
          return of(new fromActions.LoadFailEntity({ error: errors }));
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userOfficeService: UserOfficeService,
  ) { }

}
