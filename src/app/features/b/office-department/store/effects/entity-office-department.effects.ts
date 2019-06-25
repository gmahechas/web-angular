import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromOfficeDepartmentReducers from '@web/app/features/b/office-department/store/reducers';
import * as fromOfficeDepartmentSelectors from '@web/app/features/b/office-department/store/selectors';
import * as fromOfficeDepartmentActions from '@web/app/features/b/office-department/store/actions';

import * as fromModels from '@web/app/features/b/office-department/models';

import { OfficeDepartmentService } from '@web/app/features/b/office-department/services/office-department.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityOfficeDepartmentEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeDepartmentActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromOfficeDepartmentSelectors.getPerPage)),
        this.store.pipe(select(fromOfficeDepartmentSelectors.getCurrentPage))
      ),
      mergeMap(([searchOfficeDepartment, perPage, currentPage]: [fromModels.SearchOfficeDepartment, number, number]) => {
        perPage = (perPage) ? perPage : searchOfficeDepartment.limit;
        currentPage = (currentPage) ? currentPage : searchOfficeDepartment.page;
        return this.officeDepartmentService.load({ ...searchOfficeDepartment, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromOfficeDepartmentActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromOfficeDepartmentActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeDepartmentActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((officeDepartment: fromModels.OfficeDepartment) => {
        return this.officeDepartmentService.store(officeDepartment).pipe(
          map(({ data }) => fromOfficeDepartmentActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromOfficeDepartmentActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeDepartmentActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((officeDepartment: fromModels.OfficeDepartment) => {
        return this.officeDepartmentService.update(officeDepartment).pipe(
          map(({ data }) => fromOfficeDepartmentActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromOfficeDepartmentActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeDepartmentActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((officeDepartment: fromModels.OfficeDepartment) => {
        return this.officeDepartmentService.destroy(officeDepartment).pipe(
          map(({ data }) => fromOfficeDepartmentActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromOfficeDepartmentActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeDepartmentActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromOfficeDepartmentSelectors.getPerPage)),
        this.store.pipe(select(fromOfficeDepartmentSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchOfficeDepartment]: [number, number, fromModels.SearchOfficeDepartment]) => {
        return from(this.officeDepartmentService.pagination({ ...searchOfficeDepartment, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromOfficeDepartmentActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromOfficeDepartmentActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromOfficeDepartmentActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchOfficeDepartment: fromModels.SearchOfficeDepartment) => {
        if (
          searchOfficeDepartment.office_department.office_department_id === '' &&
          searchOfficeDepartment.office_department.office_department_status === null &&
          searchOfficeDepartment.office === null &&
          searchOfficeDepartment.department === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromOfficeDepartmentActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.officeDepartmentService.load({ ...searchOfficeDepartment, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromOfficeDepartmentActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromOfficeDepartmentActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private officeDepartmentService: OfficeDepartmentService,
    private store: Store<fromOfficeDepartmentReducers.State>
  ) { }
}
