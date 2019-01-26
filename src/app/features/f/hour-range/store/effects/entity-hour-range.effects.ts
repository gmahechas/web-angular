import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromHourRangeReducers from '@web/app/features/f/hour-range/store/reducers';
import * as fromHourRangeSelectors from '@web/app/features/f/hour-range/store/selectors';
import * as fromHourRangeActions from '@web/app/features/f/hour-range/store/actions';

import * as fromModels from '@web/app/features/f/hour-range/models';

import { HourRangeService } from '@web/app/features/f/hour-range/services/hour-range.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityHourRangeEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromHourRangeActions.LoadEntity>(fromHourRangeActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromHourRangeSelectors.getPerPage)),
      this.store.pipe(select(fromHourRangeSelectors.getCurrentPage))
    ),
    switchMap(([searchHourRange, perPage, currentPage]: [fromModels.SearchHourRange, number, number]) => {
      perPage = (perPage) ? perPage : searchHourRange.limit;
      currentPage = (currentPage) ? currentPage : searchHourRange.page;
      return this.hourRangeService.load({ ...searchHourRange, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromHourRangeActions.LoadSuccessEntity({ entities: data })),
        catchError((errors) => of(new fromHourRangeActions.LoadFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromHourRangeActions.StoreEntity>(fromHourRangeActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((hourRange: fromModels.HourRange) => {
      return this.hourRangeService.store(hourRange).pipe(
        map(({ data }) => new fromHourRangeActions.StoreSuccessEntity({ entity: data })),
        catchError((errors) => of(new fromHourRangeActions.StoreFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromHourRangeActions.UpdateEntity>(fromHourRangeActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((hourRange: fromModels.HourRange) => {
      return this.hourRangeService.update(hourRange).pipe(
        map(({ data }) => new fromHourRangeActions.UpdateSuccessEntity({ entity: data })),
        catchError((errors) => of(new fromHourRangeActions.UpdateFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromHourRangeActions.DestroyEntity>(fromHourRangeActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((hourRange: fromModels.HourRange) => {
      return this.hourRangeService.destroy(hourRange).pipe(
        map(({ data }) => new fromHourRangeActions.DestroySuccessEntity({ entity: data })),
        catchError((errors) => of(new fromHourRangeActions.DestroyFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromHourRangeActions.PaginateEntity>(fromHourRangeActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromHourRangeSelectors.getPerPage)),
      this.store.pipe(select(fromHourRangeSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchHourRange]: [number, number, fromModels.SearchHourRange]) => {
      return from(this.hourRangeService.pagination({ ...searchHourRange, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromHourRangeActions.LoadSuccessEntity({ entities: data })),
        catchError((errors) => of(new fromHourRangeActions.LoadFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromHourRangeActions.LoadEntityShared>(fromHourRangeActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchHourRange: fromModels.SearchHourRange) => {
        if (
          searchHourRange.hour_range.hour_range_id === '' &&
          searchHourRange.hour_range.hour_range_name === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromHourRangeActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.hourRangeService.load({ ...searchHourRange, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromHourRangeActions.LoadSuccessEntity({ entities: data })),
          catchError((errors) => {
            return of(new fromHourRangeActions.LoadFailEntity({ error: errors }));
          })
        );

      })
    )

  constructor(
    private actions$: Actions,
    private hourRangeService: HourRangeService,
    private store: Store<fromHourRangeReducers.State>
  ) { }
}
