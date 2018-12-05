import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import * as fromUserOfficeProjectActions from '@web/app/features/d/user-office-project/store/actions';

import * as fromModels from '@web/app/features/d/user-office-project/models';

import { UserOfficeProjectService } from '@web/app/features/d/user-office-project/services/user-office-project.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityUserOfficeProjectEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromUserOfficeProjectActions.LoadEntity>(fromUserOfficeProjectActions.EntityActionTypes.LoadEntity),
    map(action => action.payload),
    switchMap(({ search }: { search: fromModels.SearchUserOfficeProject }) => {
      return this.userOfficeProjectService.load(search).pipe(
        map(({ data }) => new fromUserOfficeProjectActions.LoadSuccessEntity({ entities: data })),
        catchError((errors) => of(new fromUserOfficeProjectActions.LoadFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromUserOfficeProjectActions.StoreEntity>(fromUserOfficeProjectActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((userOfficeProject: fromModels.UserOfficeProject) => {
      return this.userOfficeProjectService.store(userOfficeProject).pipe(
        map(({ data }) => new fromUserOfficeProjectActions.StoreSuccessEntity({ entity: data })),
        catchError((errors) => of(new fromUserOfficeProjectActions.StoreFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromUserOfficeProjectActions.UpdateEntity>(fromUserOfficeProjectActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((userOfficeProject: fromModels.UserOfficeProject) => {
      return this.userOfficeProjectService.update(userOfficeProject).pipe(
        map(({ data }) => new fromUserOfficeProjectActions.UpdateSuccessEntity({ entity: data })),
        catchError((errors) => of(new fromUserOfficeProjectActions.UpdateFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromUserOfficeProjectActions.DestroyEntity>(fromUserOfficeProjectActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((userOfficeProject: fromModels.UserOfficeProject) => {
      return this.userOfficeProjectService.destroy(userOfficeProject).pipe(
        map(({ data }) => new fromUserOfficeProjectActions.DestroySuccessEntity({ entity: data })),
        catchError((errors) => of(new fromUserOfficeProjectActions.DestroyFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromUserOfficeProjectActions.LoadEntityShared>(fromUserOfficeProjectActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchUserOfficeProject: fromModels.SearchUserOfficeProject) => {
        if (
          searchUserOfficeProject.user_office_project.user_office_project_id === '' &&
          searchUserOfficeProject.user_office_project.user_office_project_status === '' &&
          searchUserOfficeProject.user_office === '' &&
          searchUserOfficeProject.project === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromUserOfficeProjectActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.userOfficeProjectService.load({ ...searchUserOfficeProject, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromUserOfficeProjectActions.LoadSuccessEntity({ entities: data })),
          catchError((errors) => {
            return of(new fromUserOfficeProjectActions.LoadFailEntity({ error: errors }));
          })
        );

      })
    )

  constructor(
    private actions$: Actions,
    private userOfficeProjectService: UserOfficeProjectService
  ) { }
}
