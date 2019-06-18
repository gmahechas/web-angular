import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromContextReducers from '@web/app/features/e/context/store/reducers';
import * as fromContextSelectors from '@web/app/features/e/context/store/selectors';
import * as fromContextActions from '@web/app/features/e/context/store/actions';

import * as fromModels from '@web/app/features/e/context/models';

import { ContextService } from '@web/app/features/e/context/services/context.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityContextEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromContextActions.LoadEntity>(fromContextActions.EntityActionTypes.LoadEntity),
      map(action => action.payload.search),
      withLatestFrom(
        this.store.pipe(select(fromContextSelectors.getPerPage)),
        this.store.pipe(select(fromContextSelectors.getCurrentPage))
      ),
      mergeMap(([searchContext, perPage, currentPage]: [fromModels.SearchContext, number, number]) => {
        perPage = (perPage) ? perPage : searchContext.limit;
        currentPage = (currentPage) ? currentPage : searchContext.page;
        return this.contextService.load({ ...searchContext, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => new fromContextActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromContextActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromContextActions.StoreEntity>(fromContextActions.EntityActionTypes.StoreEntity),
      map(action => action.payload.entity),
      mergeMap((context: fromModels.Context) => {
        return this.contextService.store(context).pipe(
          map(({ data }) => new fromContextActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(new fromContextActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromContextActions.UpdateEntity>(fromContextActions.EntityActionTypes.UpdateEntity),
      map(action => action.payload.entity),
      mergeMap((context: fromModels.Context) => {
        return this.contextService.update(context).pipe(
          map(({ data }) => new fromContextActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(new fromContextActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromContextActions.DestroyEntity>(fromContextActions.EntityActionTypes.DestroyEntity),
      map(action => action.payload.entity),
      mergeMap((context: fromModels.Context) => {
        return this.contextService.destroy(context).pipe(
          map(({ data }) => new fromContextActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(new fromContextActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromContextActions.PaginateEntity>(fromContextActions.EntityActionTypes.PaginateEntity),
      map(action => action.payload.page),
      withLatestFrom(
        this.store.pipe(select(fromContextSelectors.getPerPage)),
        this.store.pipe(select(fromContextSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchContext]: [number, number, fromModels.SearchContext]) => {
        return from(this.contextService.pagination({ ...searchContext, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => new fromContextActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromContextActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromContextActions.LoadEntityShared>(fromContextActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchContext: fromModels.SearchContext) => {
        if (
          searchContext.context.context_id === '' &&
          searchContext.context.context_description === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromContextActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.contextService.load({ ...searchContext, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromContextActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromContextActions.LoadFailEntity({ error })))
        );

      })
    )
  );

  constructor(
    private actions$: Actions,
    private contextService: ContextService,
    private store: Store<fromContextReducers.State>
  ) { }
}
