import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromScheduleDayHourRangeReducers from '@web/app/features/f/schedule-day-hour-range/store/reducers';
import * as fromScheduleDayHourRangeSelectors from '@web/app/features/f/schedule-day-hour-range/store/selectors';
import * as fromScheduleDayHourRangeActions from '@web/app/features/f/schedule-day-hour-range/store/actions';

import * as fromModels from '@web/app/features/f/schedule-day-hour-range/models';

import { ScheduleDayHourRangeService } from '@web/app/features/f/schedule-day-hour-range/services/schedule-day-hour-range.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityScheduleDayHourRangeEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayHourRangeActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromScheduleDayHourRangeSelectors.getPerPage)),
        this.store.pipe(select(fromScheduleDayHourRangeSelectors.getCurrentPage))
      ),
      mergeMap(([searchScheduleDayHourRange, perPage, currentPage]: [fromModels.SearchScheduleDayHourRange, number, number]) => {
        perPage = (perPage) ? perPage : searchScheduleDayHourRange.limit;
        currentPage = (currentPage) ? currentPage : searchScheduleDayHourRange.page;
        return this.scheduleDayHourRangeService.load({ ...searchScheduleDayHourRange, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromScheduleDayHourRangeActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromScheduleDayHourRangeActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayHourRangeActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((scheduleDayHourRange: fromModels.ScheduleDayHourRange) => {
        return this.scheduleDayHourRangeService.store(scheduleDayHourRange).pipe(
          map(({ data }) => fromScheduleDayHourRangeActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromScheduleDayHourRangeActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayHourRangeActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((scheduleDayHourRange: fromModels.ScheduleDayHourRange) => {
        return this.scheduleDayHourRangeService.update(scheduleDayHourRange).pipe(
          map(({ data }) => fromScheduleDayHourRangeActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromScheduleDayHourRangeActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayHourRangeActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((scheduleDayHourRange: fromModels.ScheduleDayHourRange) => {
        return this.scheduleDayHourRangeService.destroy(scheduleDayHourRange).pipe(
          map(({ data }) => fromScheduleDayHourRangeActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromScheduleDayHourRangeActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayHourRangeActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromScheduleDayHourRangeSelectors.getPerPage)),
        this.store.pipe(select(fromScheduleDayHourRangeSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchScheduleDayHourRange]: [number, number, fromModels.SearchScheduleDayHourRange]) => {
        return from(this.scheduleDayHourRangeService.pagination({ ...searchScheduleDayHourRange, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromScheduleDayHourRangeActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromScheduleDayHourRangeActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromScheduleDayHourRangeActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchScheduleDayHourRange: fromModels.SearchScheduleDayHourRange) => {
        if (
          searchScheduleDayHourRange.schedule_day_hour_range.schedule_day_hour_range_id === '' &&
          searchScheduleDayHourRange.schedule_day_hour_range.schedule_day_hour_range_status === null &&
          searchScheduleDayHourRange.schedule_day === null &&
          searchScheduleDayHourRange.hour_range === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromScheduleDayHourRangeActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.scheduleDayHourRangeService.load({ ...searchScheduleDayHourRange, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromScheduleDayHourRangeActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromScheduleDayHourRangeActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private scheduleDayHourRangeService: ScheduleDayHourRangeService,
    private store: Store<fromScheduleDayHourRangeReducers.State>
  ) { }
}
