import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromHourRangeReducers from '@web/app/features/f/hour-range/store/reducers';
import * as fromHourRangeSelectors from '@web/app/features/f/hour-range/store/selectors';
import * as fromHourRangeActions from '@web/app/features/f/hour-range/store/actions';

import * as fromModels from '@web/app/features/f/hour-range/models';

import { HourRangeService } from '@web/app/features/f/hour-range/services/hour-range.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityHourRangeEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromHourRangeActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromHourRangeSelectors.getPerPage)),
        this.store.pipe(select(fromHourRangeSelectors.getCurrentPage))
      ),
      mergeMap(([searchHourRange, perPage, currentPage]: [fromModels.SearchHourRange, number, number]) => {
        perPage = (perPage) ? perPage : searchHourRange.limit;
        currentPage = (currentPage) ? currentPage : searchHourRange.page;
        return this.hourRangeService.load({ ...searchHourRange, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromHourRangeActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromHourRangeActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromHourRangeActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((hourRange: fromModels.HourRange) => {
        return this.hourRangeService.store(hourRange).pipe(
          map(({ data }) => fromHourRangeActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromHourRangeActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromHourRangeActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((hourRange: fromModels.HourRange) => {
        return this.hourRangeService.update(hourRange).pipe(
          map(({ data }) => fromHourRangeActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromHourRangeActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromHourRangeActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((hourRange: fromModels.HourRange) => {
        return this.hourRangeService.destroy(hourRange).pipe(
          map(({ data }) => fromHourRangeActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromHourRangeActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromHourRangeActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromHourRangeSelectors.getPerPage)),
        this.store.pipe(select(fromHourRangeSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchHourRange]: [number, number, fromModels.SearchHourRange]) => {
        return from(this.hourRangeService.pagination({ ...searchHourRange, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromHourRangeActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromHourRangeActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromHourRangeActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchHourRange: fromModels.SearchHourRange) => {
        if (
          searchHourRange.hour_range.hour_range_id === '' &&
          searchHourRange.hour_range.hour_range_name === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromHourRangeActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.hourRangeService.load({ ...searchHourRange, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromHourRangeActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromHourRangeActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private hourRangeService: HourRangeService,
    private store: Store<fromHourRangeReducers.State>
  ) { }
}
