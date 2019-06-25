import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromScheduleDayReducers from '@web/app/features/f/schedule-day/store/reducers';
import * as fromScheduleDaySelectors from '@web/app/features/f/schedule-day/store/selectors';
import * as fromScheduleDayActions from '@web/app/features/f/schedule-day/store/actions';

import * as fromModels from '@web/app/features/f/schedule-day/models';

import { ScheduleDayService } from '@web/app/features/f/schedule-day/services/schedule-day.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityScheduleDayEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromScheduleDaySelectors.getPerPage)),
        this.store.pipe(select(fromScheduleDaySelectors.getCurrentPage))
      ),
      mergeMap(([searchScheduleDay, perPage, currentPage]: [fromModels.SearchScheduleDay, number, number]) => {
        perPage = (perPage) ? perPage : searchScheduleDay.limit;
        currentPage = (currentPage) ? currentPage : searchScheduleDay.page;
        return this.scheduleDayService.load({ ...searchScheduleDay, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromScheduleDayActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromScheduleDayActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((scheduleDay: fromModels.ScheduleDay) => {
        return this.scheduleDayService.store(scheduleDay).pipe(
          map(({ data }) => fromScheduleDayActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromScheduleDayActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((scheduleDay: fromModels.ScheduleDay) => {
        return this.scheduleDayService.update(scheduleDay).pipe(
          map(({ data }) => fromScheduleDayActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromScheduleDayActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((scheduleDay: fromModels.ScheduleDay) => {
        return this.scheduleDayService.destroy(scheduleDay).pipe(
          map(({ data }) => fromScheduleDayActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromScheduleDayActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromScheduleDaySelectors.getPerPage)),
        this.store.pipe(select(fromScheduleDaySelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchScheduleDay]: [number, number, fromModels.SearchScheduleDay]) => {
        return from(this.scheduleDayService.pagination({ ...searchScheduleDay, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromScheduleDayActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromScheduleDayActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromScheduleDayActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchScheduleDay: fromModels.SearchScheduleDay) => {
        if (
          searchScheduleDay.schedule_day.schedule_day_id === '' &&
          searchScheduleDay.schedule_day.schedule_day_status === null &&
          searchScheduleDay.schedule === null &&
          searchScheduleDay.day === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromScheduleDayActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.scheduleDayService.load({ ...searchScheduleDay, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromScheduleDayActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromScheduleDayActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private scheduleDayService: ScheduleDayService,
    private store: Store<fromScheduleDayReducers.State>
  ) { }
}
