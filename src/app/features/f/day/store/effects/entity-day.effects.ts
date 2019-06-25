import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromDayReducers from '@web/app/features/f/day/store/reducers';
import * as fromDaySelectors from '@web/app/features/f/day/store/selectors';
import * as fromDayActions from '@web/app/features/f/day/store/actions';

import * as fromModels from '@web/app/features/f/day/models';

import { DayService } from '@web/app/features/f/day/services/day.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityDayEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDayActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromDaySelectors.getPerPage)),
        this.store.pipe(select(fromDaySelectors.getCurrentPage))
      ),
      mergeMap(([searchDay, perPage, currentPage]: [fromModels.SearchDay, number, number]) => {
        perPage = (perPage) ? perPage : searchDay.limit;
        currentPage = (currentPage) ? currentPage : searchDay.page;
        return this.dayService.load({ ...searchDay, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromDayActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromDayActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDayActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((day: fromModels.Day) => {
        return this.dayService.store(day).pipe(
          map(({ data }) => fromDayActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromDayActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDayActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((day: fromModels.Day) => {
        return this.dayService.update(day).pipe(
          map(({ data }) => fromDayActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromDayActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDayActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((day: fromModels.Day) => {
        return this.dayService.destroy(day).pipe(
          map(({ data }) => fromDayActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromDayActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDayActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromDaySelectors.getPerPage)),
        this.store.pipe(select(fromDaySelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchDay]: [number, number, fromModels.SearchDay]) => {
        return from(this.dayService.pagination({ ...searchDay, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromDayActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromDayActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromDayActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchDay: fromModels.SearchDay) => {
        if (
          searchDay.day.day_id === '' &&
          searchDay.day.day_name === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromDayActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.dayService.load({ ...searchDay, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromDayActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromDayActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dayService: DayService,
    private store: Store<fromDayReducers.State>
  ) { }
}
