import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromMacroprojectReducers from '@web/app/features/d/macroproject/store/reducers';
import * as fromMacroprojectSelectors from '@web/app/features/d/macroproject/store/selectors';
import * as fromMacroprojectActions from '@web/app/features/d/macroproject/store/actions';

import * as fromModels from '@web/app/features/d/macroproject/models';

import { MacroprojectService } from '@web/app/features/d/macroproject/services/macroproject.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityMacroprojectEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMacroprojectActions.LoadEntity>(fromMacroprojectActions.EntityActionTypes.LoadEntity),
      map(action => action.payload.search),
      withLatestFrom(
        this.store.pipe(select(fromMacroprojectSelectors.getPerPage)),
        this.store.pipe(select(fromMacroprojectSelectors.getCurrentPage))
      ),
      mergeMap(([searchMacroproject, perPage, currentPage]: [fromModels.SearchMacroproject, number, number]) => {
        perPage = (perPage) ? perPage : searchMacroproject.limit;
        currentPage = (currentPage) ? currentPage : searchMacroproject.page;
        return this.macroprojectService.load({ ...searchMacroproject, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => new fromMacroprojectActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromMacroprojectActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMacroprojectActions.StoreEntity>(fromMacroprojectActions.EntityActionTypes.StoreEntity),
      map(action => action.payload.entity),
      mergeMap((macroproject: fromModels.Macroproject) => {
        return this.macroprojectService.store(macroproject).pipe(
          map(({ data }) => new fromMacroprojectActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(new fromMacroprojectActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMacroprojectActions.UpdateEntity>(fromMacroprojectActions.EntityActionTypes.UpdateEntity),
      map(action => action.payload.entity),
      mergeMap((macroproject: fromModels.Macroproject) => {
        return this.macroprojectService.update(macroproject).pipe(
          map(({ data }) => new fromMacroprojectActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(new fromMacroprojectActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMacroprojectActions.DestroyEntity>(fromMacroprojectActions.EntityActionTypes.DestroyEntity),
      map(action => action.payload.entity),
      mergeMap((macroproject: fromModels.Macroproject) => {
        return this.macroprojectService.destroy(macroproject).pipe(
          map(({ data }) => new fromMacroprojectActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(new fromMacroprojectActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMacroprojectActions.PaginateEntity>(fromMacroprojectActions.EntityActionTypes.PaginateEntity),
      map(action => action.payload.page),
      withLatestFrom(
        this.store.pipe(select(fromMacroprojectSelectors.getPerPage)),
        this.store.pipe(select(fromMacroprojectSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchMacroproject]: [number, number, fromModels.SearchMacroproject]) => {
        return from(this.macroprojectService.pagination({ ...searchMacroproject, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => new fromMacroprojectActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromMacroprojectActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromMacroprojectActions.LoadEntityShared>(fromMacroprojectActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchMacroproject: fromModels.SearchMacroproject) => {
        if (
          searchMacroproject.macroproject.macroproject_id === '' &&
          searchMacroproject.macroproject.macroproject_name === '' &&
          searchMacroproject.city === null &&
          searchMacroproject.office === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromMacroprojectActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.macroprojectService.load({ ...searchMacroproject, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromMacroprojectActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromMacroprojectActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private macroprojectService: MacroprojectService,
    private store: Store<fromMacroprojectReducers.State>
  ) { }
}
