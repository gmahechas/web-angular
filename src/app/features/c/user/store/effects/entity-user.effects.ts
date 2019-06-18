import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromUserReducers from '@web/app/features/c/user/store/reducers';
import * as fromUserSelectors from '@web/app/features/c/user/store/selectors';
import * as fromUserActions from '@web/app/features/c/user/store/actions';

import * as fromModels from '@web/app/features/c/user/models';

import { UserService } from '@web/app/features/c/user/services/user.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityUserEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromUserActions.LoadEntity>(fromUserActions.EntityActionTypes.LoadEntity),
      map(action => action.payload.search),
      withLatestFrom(
        this.store.pipe(select(fromUserSelectors.getPerPage)),
        this.store.pipe(select(fromUserSelectors.getCurrentPage))
      ),
      mergeMap(([searchUser, perPage, currentPage]: [fromModels.SearchUser, number, number]) => {
        perPage = (perPage) ? perPage : searchUser.limit;
        currentPage = (currentPage) ? currentPage : searchUser.page;
        return this.userService.load({ ...searchUser, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => new fromUserActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromUserActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromUserActions.StoreEntity>(fromUserActions.EntityActionTypes.StoreEntity),
      map(action => action.payload.entity),
      mergeMap((user: fromModels.User) => {
        return this.userService.store(user).pipe(
          map(({ data }) => new fromUserActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(new fromUserActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromUserActions.UpdateEntity>(fromUserActions.EntityActionTypes.UpdateEntity),
      map(action => action.payload.entity),
      mergeMap((user: fromModels.User) => {
        return this.userService.update(user).pipe(
          map(({ data }) => new fromUserActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(new fromUserActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromUserActions.DestroyEntity>(fromUserActions.EntityActionTypes.DestroyEntity),
      map(action => action.payload.entity),
      mergeMap((user: fromModels.User) => {
        return this.userService.destroy(user).pipe(
          map(({ data }) => new fromUserActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(new fromUserActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromUserActions.PaginateEntity>(fromUserActions.EntityActionTypes.PaginateEntity),
      map(action => action.payload.page),
      withLatestFrom(
        this.store.pipe(select(fromUserSelectors.getPerPage)),
        this.store.pipe(select(fromUserSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchUser]: [number, number, fromModels.SearchUser]) => {
        return from(this.userService.pagination({ ...searchUser, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => new fromUserActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromUserActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromUserActions.LoadEntityShared>(fromUserActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchUser: fromModels.SearchUser) => {
        if (
          searchUser.user.user_id === '' &&
          searchUser.user.username === '' &&
          searchUser.person === null &&
          searchUser.profile === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromUserActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.userService.load({ ...searchUser, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromUserActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromUserActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<fromUserReducers.State>
  ) { }
}
