import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import * as fromOfficeDepartmentActions from '@web/app/features/b/office-department/store/actions';

import * as fromModels from '@web/app/features/b/office-department/models';

import { OfficeDepartmentService } from '@web/app/features/b/office-department/services/office-department.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityOfficeDepartmentEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromOfficeDepartmentActions.LoadEntity>(fromOfficeDepartmentActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    switchMap((search: fromModels.SearchOfficeDepartment) => {
      return this.officeDepartmentService.load(search).pipe(
        map(({ data }) => new fromOfficeDepartmentActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromOfficeDepartmentActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromOfficeDepartmentActions.StoreEntity>(fromOfficeDepartmentActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((officeDepartment: fromModels.OfficeDepartment) => {
      return this.officeDepartmentService.store(officeDepartment).pipe(
        map(({ data }) => new fromOfficeDepartmentActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromOfficeDepartmentActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromOfficeDepartmentActions.UpdateEntity>(fromOfficeDepartmentActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((officeDepartment: fromModels.OfficeDepartment) => {
      return this.officeDepartmentService.update(officeDepartment).pipe(
        map(({ data }) => new fromOfficeDepartmentActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromOfficeDepartmentActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromOfficeDepartmentActions.DestroyEntity>(fromOfficeDepartmentActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((officeDepartment: fromModels.OfficeDepartment) => {
      return this.officeDepartmentService.destroy(officeDepartment).pipe(
        map(({ data }) => new fromOfficeDepartmentActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromOfficeDepartmentActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromOfficeDepartmentActions.LoadEntityShared>(fromOfficeDepartmentActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
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
          ofType(fromOfficeDepartmentActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.officeDepartmentService.load({ ...searchOfficeDepartment, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromOfficeDepartmentActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromOfficeDepartmentActions.LoadFailEntity({ error })))
        );

      })
    )

  constructor(
    private actions$: Actions,
    private officeDepartmentService: OfficeDepartmentService
  ) { }
}
