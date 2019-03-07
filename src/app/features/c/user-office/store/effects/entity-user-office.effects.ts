import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromUserOfficeReducers from '@web/app/features/c/user-office/store/reducers';
import * as fromUserOfficeSelectors from '@web/app/features/c/user-office/store/selectors';
import * as fromUserOfficeActions from '@web/app/features/c/user-office/store/actions';

import * as fromModels from '@web/app/features/c/user-office/models';

import { UserOfficeService } from '@web/app/features/c/user-office/services/user-office.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityUserOfficeEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromUserOfficeActions.LoadEntity>(fromUserOfficeActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromUserOfficeSelectors.getPerPage)),
      this.store.pipe(select(fromUserOfficeSelectors.getCurrentPage))
    ),
    switchMap(([searchUserOffice, perPage, currentPage]: [fromModels.SearchUserOffice, number, number]) => {
      perPage = (perPage) ? perPage : searchUserOffice.limit;
      currentPage = (currentPage) ? currentPage : searchUserOffice.page;
      return this.userOfficeService.load({ ...searchUserOffice, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromUserOfficeActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromUserOfficeActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromUserOfficeActions.StoreEntity>(fromUserOfficeActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((userOffice: fromModels.UserOffice) => {
      return this.userOfficeService.store(userOffice).pipe(
        map(({ data }) => new fromUserOfficeActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromUserOfficeActions.StoreFailEntity({ error })))
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
  paginateEntity$ = this.actions$.pipe(
    ofType<fromUserOfficeActions.PaginateEntity>(fromUserOfficeActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromUserOfficeSelectors.getPerPage)),
      this.store.pipe(select(fromUserOfficeSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchUserOffice]: [number, number, fromModels.SearchUserOffice]) => {
      return from(this.userOfficeService.pagination({ ...searchUserOffice, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromUserOfficeActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromUserOfficeActions.LoadFailEntity({ error })))
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
          searchUserOffice.user_office.user_office_status === null &&
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
    private store: Store<fromUserOfficeReducers.State>
  ) { }
}
