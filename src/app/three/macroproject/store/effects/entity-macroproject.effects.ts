import { Injectable, Optional, Inject, InjectionToken } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select } from '@ngrx/store';
import * as fromReducers from './../reducers';
import * as fromSelectors from '../selectors';
import * as fromActions from '../actions';

import * as fromModels from './../../models';

import { MacroprojectService } from '../../services/macroproject.service';

import { of, from, Scheduler, asyncScheduler, empty } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>('Search Scheduler');

@Injectable()
export class EntityMacroprojectEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getCurrentPage))
    ),
    switchMap(([searchMacroproject, perPage, currentPage]: [fromModels.SearchMacroproject, number, number]) => {
      perPage = (perPage) ? perPage : searchMacroproject.limit;
      currentPage = (currentPage) ? currentPage : searchMacroproject.page;
      return this.macroprojectService.load({ ...searchMacroproject, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity(data)),
        catchError((errors) => {
          return of(new fromActions.LoadFailEntity(errors));
        })
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromActions.StoreEntity>(fromActions.EntityActionTypes.StoreEntity),
    map(action => action.payload),
    switchMap((macroproject: fromModels.Macroproject) => {
      return this.macroprojectService.store(macroproject).pipe(
        map(({ data }) => new fromActions.StoreSuccessEntity(data)),
        catchError((errors) => of(new fromActions.StoreFailEntity(errors)))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromActions.UpdateEntity>(fromActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload),
    switchMap((macroproject: fromModels.Macroproject) => {
      return this.macroprojectService.update(macroproject).pipe(
        map(({ data }) => new fromActions.UpdateSuccessEntity(data)),
        catchError((errors) => of(new fromActions.UpdateFailEntity(errors)))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromActions.DestroyEntity>(fromActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload),
    switchMap((macroproject: fromModels.Macroproject) => {
      return this.macroprojectService.destroy(macroproject).pipe(
        map(({ data }) => new fromActions.DestroySuccessEntity(data)),
        catchError((errors) => of(new fromActions.DestroyFailEntity(errors)))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromActions.PaginateEntity>(fromActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchMacroproject]: [number, number, fromModels.SearchMacroproject]) => {
      return from(this.macroprojectService.pagination({ ...searchMacroproject, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity(data)),
        catchError((errors) => of(new fromActions.LoadFailEntity(errors)))
      );
    })
  );

  @Effect()
  loadEntityShared$ = this.actions$.pipe(
    ofType<fromActions.LoadEntityShared>(fromActions.EntityActionTypes.LoadEntityShared),
    debounceTime(this.debounce || 600, this.scheduler || asyncScheduler),
    map(action => action.payload),
    switchMap((searchMacroproject: fromModels.SearchMacroproject) => {
      if (searchMacroproject === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.pipe(
        ofType(fromActions.EntityActionTypes.LoadEntityShared),
        skip(1)
      );

      return this.macroprojectService.load({ ...searchMacroproject, limit: 20, page: 1 }).pipe(
        takeUntil(nextSearch$),
        map(({ data }) => new fromActions.LoadSuccessEntity(data)),
        catchError((errors) => {
          return of(new fromActions.LoadFailEntity(errors));
        })
      );

    })
  );

  constructor(
    private actions$: Actions,
    private macroprojectService: MacroprojectService,
    private store: Store<fromReducers.State>,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number,
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
  ) { }
}
