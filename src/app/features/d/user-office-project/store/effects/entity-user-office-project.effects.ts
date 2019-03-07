import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromUserOfficeProjectReducers from '@web/app/features/d/user-office-project/store/reducers';
import * as fromUserOfficeProjectSelectors from '@web/app/features/d/user-office-project/store/selectors';
import * as fromUserOfficeProjectActions from '@web/app/features/d/user-office-project/store/actions';

import * as fromModels from '@web/app/features/d/user-office-project/models';

import { UserOfficeProjectService } from '@web/app/features/d/user-office-project/services/user-office-project.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityUserOfficeProjectEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromUserOfficeProjectActions.LoadEntity>(fromUserOfficeProjectActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromUserOfficeProjectSelectors.getPerPage)),
      this.store.pipe(select(fromUserOfficeProjectSelectors.getCurrentPage))
    ),
    switchMap(([searchUserOfficeProject, perPage, currentPage]: [fromModels.SearchUserOfficeProject, number, number]) => {
      perPage = (perPage) ? perPage : searchUserOfficeProject.limit;
      currentPage = (currentPage) ? currentPage : searchUserOfficeProject.page;
      return this.userOfficeProjectService.load({ ...searchUserOfficeProject, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromUserOfficeProjectActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromUserOfficeProjectActions.LoadFailEntity({ error })))
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
        catchError((error) => of(new fromUserOfficeProjectActions.StoreFailEntity({ error })))
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
        catchError((error) => of(new fromUserOfficeProjectActions.UpdateFailEntity({ error })))
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
        catchError((error) => of(new fromUserOfficeProjectActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromUserOfficeProjectActions.PaginateEntity>(fromUserOfficeProjectActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromUserOfficeProjectSelectors.getPerPage)),
      this.store.pipe(select(fromUserOfficeProjectSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchUserOfficeProject]: [number, number, fromModels.SearchUserOfficeProject]) => {
      return from(this.userOfficeProjectService.pagination({ ...searchUserOfficeProject, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromUserOfficeProjectActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromUserOfficeProjectActions.LoadFailEntity({ error })))
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
          searchUserOfficeProject.user_office_project.user_office_project_status === null &&
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
          catchError((error) => of(new fromUserOfficeProjectActions.LoadFailEntity({ error })))
        );

      })
    )

  constructor(
    private actions$: Actions,
    private userOfficeProjectService: UserOfficeProjectService,
    private store: Store<fromUserOfficeProjectReducers.State>
  ) { }
}
