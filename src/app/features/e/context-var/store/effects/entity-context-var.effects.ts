import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromContextVarReducers from '@web/app/features/e/context-var/store/reducers';
import * as fromContextVarSelectors from '@web/app/features/e/context-var/store/selectors';
import * as fromContextVarActions from '@web/app/features/e/context-var/store/actions';

import * as fromModels from '@web/app/features/e/context-var/models';

import { ContextVarService } from '@web/app/features/e/context-var/services/context-var.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityContextVarEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromContextVarActions.LoadEntity>(fromContextVarActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromContextVarSelectors.getPerPage)),
      this.store.pipe(select(fromContextVarSelectors.getCurrentPage))
    ),
    switchMap(([searchContextVar, perPage, currentPage]: [fromModels.SearchContextVar, number, number]) => {
      perPage = (perPage) ? perPage : searchContextVar.limit;
      currentPage = (currentPage) ? currentPage : searchContextVar.page;
      return this.contextVarService.load({ ...searchContextVar, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromContextVarActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromContextVarActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromContextVarActions.LoadEntityShared>(fromContextVarActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchContextVar: fromModels.SearchContextVar) => {
        if (
          searchContextVar.context_var.context_var_id === '' &&
          searchContextVar.context_var.context_var_code === '' &&
          searchContextVar.context_var.context_var_type === '' &&
          searchContextVar.context_var.context_var_description === '' &&
          searchContextVar.context === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromContextVarActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.contextVarService.load({ ...searchContextVar, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromContextVarActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromContextVarActions.LoadFailEntity({ error })))
        );

      })
    )

  constructor(
    private actions$: Actions,
    private contextVarService: ContextVarService,
    private store: Store<fromContextVarReducers.State>
  ) { }
}
