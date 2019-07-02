import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromProfileMenuReducers from '@web/app/features/c/profile-menu/store/reducers';
import * as fromProfileMenuSelectors from '@web/app/features/c/profile-menu/store/selectors';
import * as fromProfileMenuActions from '@web/app/features/c/profile-menu/store/actions';

import * as fromModels from '@web/app/features/c/profile-menu/models';

import { ProfileMenuService } from '@web/app/features/c/profile-menu/services/profile-menu.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityProfileMenuEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileMenuActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromProfileMenuSelectors.getPerPage)),
        this.store.pipe(select(fromProfileMenuSelectors.getCurrentPage))
      ),
      mergeMap(([searchProfileMenu, perPage, currentPage]: [fromModels.SearchProfileMenu, number, number]) => {
        perPage = (perPage) ? perPage : searchProfileMenu.limit;
        currentPage = (currentPage) ? currentPage : searchProfileMenu.page;
        return this.profileMenuService.load({ ...searchProfileMenu, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromProfileMenuActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromProfileMenuActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileMenuActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((profileMenu: fromModels.ProfileMenu) => {
        return this.profileMenuService.store(profileMenu).pipe(
          map(({ data }) => fromProfileMenuActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromProfileMenuActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileMenuActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((profileMenu: fromModels.ProfileMenu) => {
        return this.profileMenuService.update(profileMenu).pipe(
          map(({ data }) => fromProfileMenuActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromProfileMenuActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileMenuActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((profileMenu: fromModels.ProfileMenu) => {
        return this.profileMenuService.destroy(profileMenu).pipe(
          map(({ data }) => fromProfileMenuActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromProfileMenuActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileMenuActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromProfileMenuSelectors.getPerPage)),
        this.store.pipe(select(fromProfileMenuSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchProfileMenu]: [number, number, fromModels.SearchProfileMenu]) => {
        return from(this.profileMenuService.pagination({ ...searchProfileMenu, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromProfileMenuActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromProfileMenuActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromProfileMenuActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchProfileMenu: fromModels.SearchProfileMenu) => {
        if (
          searchProfileMenu.profile_menu.profile_menu_id === '' &&
          searchProfileMenu.profile_menu.profile_menu_status === null &&
          searchProfileMenu.profile === null &&
          searchProfileMenu.menu === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromProfileMenuActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.profileMenuService.load({ ...searchProfileMenu, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromProfileMenuActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromProfileMenuActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private profileMenuService: ProfileMenuService,
    private store: Store<fromProfileMenuReducers.State>
  ) { }
}
