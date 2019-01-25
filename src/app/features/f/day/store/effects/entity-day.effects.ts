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
          catchError((errors) => {
            return of(new fromDayActions.LoadFailEntity({ error: errors }));
          })
        );

      })
    )

  constructor(
    private actions$: Actions,
    private dayService: DayService,
    private store: Store<fromDayReducers.State>
  ) { }
}
