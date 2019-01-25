import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromScheduleReducers from '@web/app/features/f/schedule/store/reducers';
import * as fromScheduleSelectors from '@web/app/features/f/schedule/store/selectors';
import * as fromScheduleActions from '@web/app/features/f/schedule/store/actions';

import * as fromModels from '@web/app/features/f/schedule/models';

import { ScheduleService } from '@web/app/features/f/schedule/services/schedule.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityScheduleEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromScheduleActions.LoadEntity>(fromScheduleActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromScheduleSelectors.getPerPage)),
      this.store.pipe(select(fromScheduleSelectors.getCurrentPage))
    ),
    switchMap(([searchSchedule, perPage, currentPage]: [fromModels.SearchSchedule, number, number]) => {
      perPage = (perPage) ? perPage : searchSchedule.limit;
      currentPage = (currentPage) ? currentPage : searchSchedule.page;
      return this.scheduleService.load({ ...searchSchedule, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromScheduleActions.LoadSuccessEntity({ entities: data })),
        catchError((errors) => of(new fromScheduleActions.LoadFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromScheduleActions.StoreEntity>(fromScheduleActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((schedule: fromModels.Schedule) => {
      return this.scheduleService.store(schedule).pipe(
        map(({ data }) => new fromScheduleActions.StoreSuccessEntity({ entity: data })),
        catchError((errors) => of(new fromScheduleActions.StoreFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromScheduleActions.UpdateEntity>(fromScheduleActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((schedule: fromModels.Schedule) => {
      return this.scheduleService.update(schedule).pipe(
        map(({ data }) => new fromScheduleActions.UpdateSuccessEntity({ entity: data })),
        catchError((errors) => of(new fromScheduleActions.UpdateFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromScheduleActions.DestroyEntity>(fromScheduleActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((schedule: fromModels.Schedule) => {
      return this.scheduleService.destroy(schedule).pipe(
        map(({ data }) => new fromScheduleActions.DestroySuccessEntity({ entity: data })),
        catchError((errors) => of(new fromScheduleActions.DestroyFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromScheduleActions.PaginateEntity>(fromScheduleActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromScheduleSelectors.getPerPage)),
      this.store.pipe(select(fromScheduleSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchSchedule]: [number, number, fromModels.SearchSchedule]) => {
      return from(this.scheduleService.pagination({ ...searchSchedule, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromScheduleActions.LoadSuccessEntity({ entities: data })),
        catchError((errors) => of(new fromScheduleActions.LoadFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromScheduleActions.LoadEntityShared>(fromScheduleActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchSchedule: fromModels.SearchSchedule) => {
        if (
          searchSchedule.schedule.schedule_id === '' &&
          searchSchedule.schedule.schedule_name === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromScheduleActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.scheduleService.load({ ...searchSchedule, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromScheduleActions.LoadSuccessEntity({ entities: data })),
          catchError((errors) => {
            return of(new fromScheduleActions.LoadFailEntity({ error: errors }));
          })
        );

      })
    )

  constructor(
    private actions$: Actions,
    private scheduleService: ScheduleService,
    private store: Store<fromScheduleReducers.State>
  ) { }
}
