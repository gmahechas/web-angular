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
      ofType<fromDepartmentActions.LoadEntity>(fromDepartmentActions.EntityActionTypes.LoadEntity),
      map(action => action.payload.search),
      withLatestFrom(
        this.store.pipe(select(fromDepartmentSelectors.getPerPage)),
        this.store.pipe(select(fromDepartmentSelectors.getCurrentPage))
      ),
      mergeMap(([searchDepartment, perPage, currentPage]: [fromModels.SearchDepartment, number, number]) => {
        perPage = (perPage) ? perPage : searchDepartment.limit;
        currentPage = (currentPage) ? currentPage : searchDepartment.page;
        return this.departmentService.load({ ...searchDepartment, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => new fromDepartmentActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromDepartmentActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromDepartmentActions.StoreEntity>(fromDepartmentActions.EntityActionTypes.StoreEntity),
      map(action => action.payload.entity),
      mergeMap((department: fromModels.Department) => {
        return this.departmentService.store(department).pipe(
          map(({ data }) => new fromDepartmentActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(new fromDepartmentActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromDepartmentActions.UpdateEntity>(fromDepartmentActions.EntityActionTypes.UpdateEntity),
      map(action => action.payload.entity),
      mergeMap((department: fromModels.Department) => {
        return this.departmentService.update(department).pipe(
          map(({ data }) => new fromDepartmentActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(new fromDepartmentActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromDepartmentActions.DestroyEntity>(fromDepartmentActions.EntityActionTypes.DestroyEntity),
      map(action => action.payload.entity),
      mergeMap((department: fromModels.Department) => {
        return this.departmentService.destroy(department).pipe(
          map(({ data }) => new fromDepartmentActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(new fromDepartmentActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromDepartmentActions.PaginateEntity>(fromDepartmentActions.EntityActionTypes.PaginateEntity),
      map(action => action.payload.page),
      withLatestFrom(
        this.store.pipe(select(fromDepartmentSelectors.getPerPage)),
        this.store.pipe(select(fromDepartmentSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchDepartment]: [number, number, fromModels.SearchDepartment]) => {
        return from(this.departmentService.pagination({ ...searchDepartment, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => new fromDepartmentActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromDepartmentActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromDepartmentActions.LoadEntityShared>(fromDepartmentActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchDepartment: fromModels.SearchDepartment) => {
        if (
          searchDepartment.department.department_id === '' &&
          searchDepartment.department.department_name === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromDepartmentActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.departmentService.load({ ...searchDepartment, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromDepartmentActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromDepartmentActions.LoadFailEntity({ error })))
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
