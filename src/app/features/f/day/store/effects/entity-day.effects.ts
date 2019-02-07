import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromDayReducers from '@web/app/features/f/day/store/reducers';
import * as fromDaySelectors from '@web/app/features/f/day/store/selectors';
import * as fromDayActions from '@web/app/features/f/day/store/actions';

import * as fromModels from '@web/app/features/f/day/models';

import { DayService } from '@web/app/features/f/day/services/day.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityDayEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromDayActions.LoadEntity>(fromDayActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromDaySelectors.getPerPage)),
      this.store.pipe(select(fromDaySelectors.getCurrentPage))
    ),
    switchMap(([searchDay, perPage, currentPage]: [fromModels.SearchDay, number, number]) => {
      perPage = (perPage) ? perPage : searchDay.limit;
      currentPage = (currentPage) ? currentPage : searchDay.page;
      return this.dayService.load({ ...searchDay, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromDayActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromDayActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromDayActions.StoreEntity>(fromDayActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((day: fromModels.Day) => {
      return this.dayService.store(day).pipe(
        map(({ data }) => new fromDayActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromDayActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromDayActions.UpdateEntity>(fromDayActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((day: fromModels.Day) => {
      return this.dayService.update(day).pipe(
        map(({ data }) => new fromDayActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromDayActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromDayActions.DestroyEntity>(fromDayActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((day: fromModels.Day) => {
      return this.dayService.destroy(day).pipe(
        map(({ data }) => new fromDayActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromDayActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromDayActions.PaginateEntity>(fromDayActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromDaySelectors.getPerPage)),
      this.store.pipe(select(fromDaySelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchDay]: [number, number, fromModels.SearchDay]) => {
      return from(this.dayService.pagination({ ...searchDay, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromDayActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromDayActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromDayActions.LoadEntityShared>(fromDayActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchDay: fromModels.SearchDay) => {
        if (
          searchDay.day.day_id === '' &&
          searchDay.day.day_name === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromDayActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.dayService.load({ ...searchDay, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromDayActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromDayActions.LoadFailEntity({ error })))
        );

      })
    )

  constructor(
    private actions$: Actions,
    private dayService: DayService,
    private store: Store<fromDayReducers.State>
  ) { }
}
