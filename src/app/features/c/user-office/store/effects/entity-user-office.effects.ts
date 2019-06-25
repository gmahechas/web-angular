import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromUserOfficeReducers from '@web/app/features/c/user-office/store/reducers';
import * as fromUserOfficeSelectors from '@web/app/features/c/user-office/store/selectors';
import * as fromUserOfficeActions from '@web/app/features/c/user-office/store/actions';

import * as fromModels from '@web/app/features/c/user-office/models';

import { UserOfficeService } from '@web/app/features/c/user-office/services/user-office.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityUserOfficeEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromUserOfficeSelectors.getPerPage)),
        this.store.pipe(select(fromUserOfficeSelectors.getCurrentPage))
      ),
      mergeMap(([searchUserOffice, perPage, currentPage]: [fromModels.SearchUserOffice, number, number]) => {
        perPage = (perPage) ? perPage : searchUserOffice.limit;
        currentPage = (currentPage) ? currentPage : searchUserOffice.page;
        return this.userOfficeService.load({ ...searchUserOffice, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromUserOfficeActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromUserOfficeActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((userOffice: fromModels.UserOffice) => {
        return this.userOfficeService.store(userOffice).pipe(
          map(({ data }) => fromUserOfficeActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromUserOfficeActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((userOffice: fromModels.UserOffice) => {
        return this.userOfficeService.update(userOffice).pipe(
          map(({ data }) => fromUserOfficeActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromUserOfficeActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((userOffice: fromModels.UserOffice) => {
        return this.userOfficeService.destroy(userOffice).pipe(
          map(({ data }) => fromUserOfficeActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromUserOfficeActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromUserOfficeSelectors.getPerPage)),
        this.store.pipe(select(fromUserOfficeSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchUserOffice]: [number, number, fromModels.SearchUserOffice]) => {
        return from(this.userOfficeService.pagination({ ...searchUserOffice, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromUserOfficeActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromUserOfficeActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromUserOfficeActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
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
          ofType(fromUserOfficeActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.userOfficeService.load({ ...searchUserOffice, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromUserOfficeActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromUserOfficeActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userOfficeService: UserOfficeService,
    private store: Store<fromUserOfficeReducers.State>
  ) { }
}
