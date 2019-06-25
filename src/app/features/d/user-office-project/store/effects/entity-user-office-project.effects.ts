import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromUserOfficeProjectReducers from '@web/app/features/d/user-office-project/store/reducers';
import * as fromUserOfficeProjectSelectors from '@web/app/features/d/user-office-project/store/selectors';
import * as fromUserOfficeProjectActions from '@web/app/features/d/user-office-project/store/actions';

import * as fromModels from '@web/app/features/d/user-office-project/models';

import { UserOfficeProjectService } from '@web/app/features/d/user-office-project/services/user-office-project.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityUserOfficeProjectEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeProjectActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromUserOfficeProjectSelectors.getPerPage)),
        this.store.pipe(select(fromUserOfficeProjectSelectors.getCurrentPage))
      ),
      mergeMap(([searchUserOfficeProject, perPage, currentPage]: [fromModels.SearchUserOfficeProject, number, number]) => {
        perPage = (perPage) ? perPage : searchUserOfficeProject.limit;
        currentPage = (currentPage) ? currentPage : searchUserOfficeProject.page;
        return this.userOfficeProjectService.load({ ...searchUserOfficeProject, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromUserOfficeProjectActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromUserOfficeProjectActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeProjectActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((userOfficeProject: fromModels.UserOfficeProject) => {
        return this.userOfficeProjectService.store(userOfficeProject).pipe(
          map(({ data }) => fromUserOfficeProjectActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromUserOfficeProjectActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeProjectActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((userOfficeProject: fromModels.UserOfficeProject) => {
        return this.userOfficeProjectService.update(userOfficeProject).pipe(
          map(({ data }) => fromUserOfficeProjectActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromUserOfficeProjectActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeProjectActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((userOfficeProject: fromModels.UserOfficeProject) => {
        return this.userOfficeProjectService.destroy(userOfficeProject).pipe(
          map(({ data }) => fromUserOfficeProjectActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromUserOfficeProjectActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeProjectActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromUserOfficeProjectSelectors.getPerPage)),
        this.store.pipe(select(fromUserOfficeProjectSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchUserOfficeProject]: [number, number, fromModels.SearchUserOfficeProject]) => {
        return from(this.userOfficeProjectService.pagination({ ...searchUserOfficeProject, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromUserOfficeProjectActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromUserOfficeProjectActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromUserOfficeProjectActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchUserOfficeProject: fromModels.SearchUserOfficeProject) => {
        if (
          searchUserOfficeProject.user_office_project.user_office_project_id === '' &&
          searchUserOfficeProject.user_office_project.user_office_project_status === null &&
          searchUserOfficeProject.user_office === null &&
          searchUserOfficeProject.project === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromUserOfficeProjectActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.userOfficeProjectService.load({ ...searchUserOfficeProject, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromUserOfficeProjectActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromUserOfficeProjectActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userOfficeProjectService: UserOfficeProjectService,
    private store: Store<fromUserOfficeProjectReducers.State>
  ) { }
}
