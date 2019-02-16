import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromScheduleDayReducers from '@web/app/features/f/schedule-day/store/reducers';
import * as fromScheduleDaySelectors from '@web/app/features/f/schedule-day/store/selectors';
import * as fromScheduleDayActions from '@web/app/features/f/schedule-day/store/actions';

import * as fromModels from '@web/app/features/f/schedule-day/models';

import { ScheduleDayService } from '@web/app/features/f/schedule-day/services/schedule-day.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityScheduleDayEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromScheduleDayActions.LoadEntity>(fromScheduleDayActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromScheduleDaySelectors.getPerPage)),
      this.store.pipe(select(fromScheduleDaySelectors.getCurrentPage))
    ),
    switchMap(([searchScheduleDay, perPage, currentPage]: [fromModels.SearchScheduleDay, number, number]) => {
      perPage = (perPage) ? perPage : searchScheduleDay.limit;
      currentPage = (currentPage) ? currentPage : searchScheduleDay.page;
      return this.scheduleDayService.load({ ...searchScheduleDay, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromScheduleDayActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromScheduleDayActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromScheduleDayActions.StoreEntity>(fromScheduleDayActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((scheduleDay: fromModels.ScheduleDay) => {
      return this.scheduleDayService.store(scheduleDay).pipe(
        map(({ data }) => new fromScheduleDayActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromScheduleDayActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromScheduleDayActions.UpdateEntity>(fromScheduleDayActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((scheduleDay: fromModels.ScheduleDay) => {
      return this.scheduleDayService.update(scheduleDay).pipe(
        map(({ data }) => new fromScheduleDayActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromScheduleDayActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromScheduleDayActions.DestroyEntity>(fromScheduleDayActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((scheduleDay: fromModels.ScheduleDay) => {
      return this.scheduleDayService.destroy(scheduleDay).pipe(
        map(({ data }) => new fromScheduleDayActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromScheduleDayActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromScheduleDayActions.PaginateEntity>(fromScheduleDayActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromScheduleDaySelectors.getPerPage)),
      this.store.pipe(select(fromScheduleDaySelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchScheduleDay]: [number, number, fromModels.SearchScheduleDay]) => {
      return from(this.scheduleDayService.pagination({ ...searchScheduleDay, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromScheduleDayActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromScheduleDayActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromScheduleDayActions.LoadEntityShared>(fromScheduleDayActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
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
          ofType(fromScheduleDayActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.scheduleDayService.load({ ...searchScheduleDay, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromScheduleDayActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromScheduleDayActions.LoadFailEntity({ error })))
        );

      })
    )

  constructor(
    private actions$: Actions,
    private scheduleDayService: ScheduleDayService,
    private store: Store<fromScheduleDayReducers.State>
  ) { }
}
