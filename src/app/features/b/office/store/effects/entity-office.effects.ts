import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromOfficeReducers from '@web/app/features/b/office/store/reducers';
import * as fromOfficeSelectors from '@web/app/features/b/office/store/selectors';
import * as fromOfficeActions from '@web/app/features/b/office/store/actions';

import * as fromModels from '@web/app/features/b/office/models';

import { OfficeService } from '@web/app/features/b/office/services/office.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityOfficeEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromOfficeSelectors.getPerPage)),
        this.store.pipe(select(fromOfficeSelectors.getCurrentPage))
      ),
      mergeMap(([searchOffice, perPage, currentPage]: [fromModels.SearchOffice, number, number]) => {
        perPage = (perPage) ? perPage : searchOffice.limit;
        currentPage = (currentPage) ? currentPage : searchOffice.page;
        return this.officeService.load({ ...searchOffice, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromOfficeActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromOfficeActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((office: fromModels.Office) => {
        return this.officeService.store(office).pipe(
          map(({ data }) => fromOfficeActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromOfficeActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((office: fromModels.Office) => {
        return this.officeService.update(office).pipe(
          map(({ data }) => fromOfficeActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromOfficeActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((office: fromModels.Office) => {
        return this.officeService.destroy(office).pipe(
          map(({ data }) => fromOfficeActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromOfficeActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromOfficeSelectors.getPerPage)),
        this.store.pipe(select(fromOfficeSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchOffice]: [number, number, fromModels.SearchOffice]) => {
        return from(this.officeService.pagination({ ...searchOffice, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromOfficeActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromOfficeActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromOfficeActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchOffice: fromModels.SearchOffice) => {
        if (
          searchOffice.office.office_id === '' &&
          searchOffice.office.office_name === '' &&
          searchOffice.city === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromOfficeActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.officeService.load({ ...searchOffice, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromOfficeActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromOfficeActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private officeService: OfficeService,
    private store: Store<fromOfficeReducers.State>
  ) { }
}
