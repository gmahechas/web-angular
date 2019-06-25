import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromDepartmentReducers from '@web/app/features/b/department/store/reducers';
import * as fromDepartmentSelectors from '@web/app/features/b/department/store/selectors';
import * as fromDepartmentActions from '@web/app/features/b/department/store/actions';

import * as fromModels from '@web/app/features/b/department/models';

import { DepartmentService } from '@web/app/features/b/department/services/department.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityDepartmentEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDepartmentActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromDepartmentSelectors.getPerPage)),
        this.store.pipe(select(fromDepartmentSelectors.getCurrentPage))
      ),
      mergeMap(([searchDepartment, perPage, currentPage]: [fromModels.SearchDepartment, number, number]) => {
        perPage = (perPage) ? perPage : searchDepartment.limit;
        currentPage = (currentPage) ? currentPage : searchDepartment.page;
        return this.departmentService.load({ ...searchDepartment, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromDepartmentActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromDepartmentActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDepartmentActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((department: fromModels.Department) => {
        return this.departmentService.store(department).pipe(
          map(({ data }) => fromDepartmentActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromDepartmentActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDepartmentActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((department: fromModels.Department) => {
        return this.departmentService.update(department).pipe(
          map(({ data }) => fromDepartmentActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromDepartmentActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDepartmentActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((department: fromModels.Department) => {
        return this.departmentService.destroy(department).pipe(
          map(({ data }) => fromDepartmentActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromDepartmentActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDepartmentActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromDepartmentSelectors.getPerPage)),
        this.store.pipe(select(fromDepartmentSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchDepartment]: [number, number, fromModels.SearchDepartment]) => {
        return from(this.departmentService.pagination({ ...searchDepartment, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromDepartmentActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromDepartmentActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromDepartmentActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchDepartment: fromModels.SearchDepartment) => {
        if (
          searchDepartment.department.department_id === '' &&
          searchDepartment.department.department_name === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromDepartmentActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.departmentService.load({ ...searchDepartment, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromDepartmentActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromDepartmentActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private departmentService: DepartmentService,
    private store: Store<fromDepartmentReducers.State>
  ) { }
}
