import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromScheduleDayHourRangeReducers from '@web/app/features/f/schedule-day-hour-range/store/reducers';
import * as fromScheduleDayHourRangeSelectors from '@web/app/features/f/schedule-day-hour-range/store/selectors';
import * as fromScheduleDayHourRangeActions from '@web/app/features/f/schedule-day-hour-range/store/actions';

import * as fromModels from '@web/app/features/f/schedule-day-hour-range/models';

import { ScheduleDayHourRangeService } from '@web/app/features/f/schedule-day-hour-range/services/schedule-day-hour-range.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityScheduleDayHourRangeEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromScheduleDayHourRangeActions.LoadEntity>(fromScheduleDayHourRangeActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromScheduleDayHourRangeSelectors.getPerPage)),
      this.store.pipe(select(fromScheduleDayHourRangeSelectors.getCurrentPage))
    ),
    switchMap(([searchScheduleDayHourRange, perPage, currentPage]: [fromModels.SearchScheduleDayHourRange, number, number]) => {
      perPage = (perPage) ? perPage : searchScheduleDayHourRange.limit;
      currentPage = (currentPage) ? currentPage : searchScheduleDayHourRange.page;
      return this.scheduleDayHourRangeService.load({ ...searchScheduleDayHourRange, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromScheduleDayHourRangeActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromScheduleDayHourRangeActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromScheduleDayHourRangeActions.StoreEntity>(fromScheduleDayHourRangeActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((scheduleDayHourRange: fromModels.ScheduleDayHourRange) => {
      return this.scheduleDayHourRangeService.store(scheduleDayHourRange).pipe(
        map(({ data }) => new fromScheduleDayHourRangeActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromScheduleDayHourRangeActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromScheduleDayHourRangeActions.UpdateEntity>(fromScheduleDayHourRangeActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((scheduleDayHourRange: fromModels.ScheduleDayHourRange) => {
      return this.scheduleDayHourRangeService.update(scheduleDayHourRange).pipe(
        map(({ data }) => new fromScheduleDayHourRangeActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromScheduleDayHourRangeActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromScheduleDayHourRangeActions.DestroyEntity>(fromScheduleDayHourRangeActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((scheduleDayHourRange: fromModels.ScheduleDayHourRange) => {
      return this.scheduleDayHourRangeService.destroy(scheduleDayHourRange).pipe(
        map(({ data }) => new fromScheduleDayHourRangeActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromScheduleDayHourRangeActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromScheduleDayHourRangeActions.PaginateEntity>(fromScheduleDayHourRangeActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromScheduleDayHourRangeSelectors.getPerPage)),
      this.store.pipe(select(fromScheduleDayHourRangeSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchScheduleDayHourRange]: [number, number, fromModels.SearchScheduleDayHourRange]) => {
      return from(this.scheduleDayHourRangeService.pagination({ ...searchScheduleDayHourRange, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromScheduleDayHourRangeActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromScheduleDayHourRangeActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromScheduleDayHourRangeActions.LoadEntityShared>(fromScheduleDayHourRangeActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
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
          ofType(fromScheduleDayHourRangeActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.scheduleDayHourRangeService.load({ ...searchScheduleDayHourRange, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromScheduleDayHourRangeActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromScheduleDayHourRangeActions.LoadFailEntity({ error })))
        );

      })
    )

  constructor(
    private actions$: Actions,
    private scheduleDayHourRangeService: ScheduleDayHourRangeService,
    private store: Store<fromScheduleDayHourRangeReducers.State>
  ) { }
}
