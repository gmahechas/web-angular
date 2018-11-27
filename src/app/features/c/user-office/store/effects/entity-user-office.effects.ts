import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import * as fromUserOfficeActions from '@web/app/features/c/user-office/store/actions';

import * as fromModels from '@web/app/features/c/user-office/models';

import { UserOfficeService } from '@web/app/features/c/user-office/services/user-office.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityUserOfficeEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromUserOfficeActions.LoadEntity>(fromUserOfficeActions.EntityActionTypes.LoadEntity),
    map(action => action.payload),
    switchMap(({ search }: { search: fromModels.SearchUserOffice }) => {
      return this.userOfficeService.load(search).pipe(
        map(({ data }) => new fromUserOfficeActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromUserOfficeActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromUserOfficeActions.UpdateEntity>(fromUserOfficeActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((userOffice: fromModels.UserOffice) => {
      return this.userOfficeService.update(userOffice).pipe(
        map(({ data }) => new fromUserOfficeActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromUserOfficeActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromUserOfficeActions.DestroyEntity>(fromUserOfficeActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((userOffice: fromModels.UserOffice) => {
      return this.userOfficeService.destroy(userOffice).pipe(
        map(({ data }) => new fromUserOfficeActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromUserOfficeActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromUserOfficeActions.LoadEntityShared>(fromUserOfficeActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchUserOffice: fromModels.SearchUserOffice) => {
        if (
          searchUserOffice.user_office.user_office_id === '' &&
          searchUserOffice.user_office.user_office_status === '' &&
          searchUserOffice.user === null &&
          searchUserOffice.office === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromUserOfficeActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.userOfficeService.load({ ...searchUserOffice, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromUserOfficeActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromUserOfficeActions.LoadFailEntity({ error })))
        );
      })
    )

  constructor(
    private actions$: Actions,
    private userOfficeService: UserOfficeService,
  ) { }

}
