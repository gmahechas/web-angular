import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromProfileReducers from '@web/app/features/c/profile/store/reducers';
import * as fromProfileSelectors from '@web/app/features/c/profile/store/selectors';
import * as fromProfileActions from '@web/app/features/c/profile/store/actions';

import * as fromModels from '@web/app/features/c/profile/models';

import { ProfileService } from '@web/app/features/c/profile/services/profile.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityProfileEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromProfileSelectors.getPerPage)),
        this.store.pipe(select(fromProfileSelectors.getCurrentPage))
      ),
      mergeMap(([searchProfile, perPage, currentPage]: [fromModels.SearchProfile, number, number]) => {
        perPage = (perPage) ? perPage : searchProfile.limit;
        currentPage = (currentPage) ? currentPage : searchProfile.page;
        return this.profileService.load({ ...searchProfile, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromProfileActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromProfileActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((profile: fromModels.Profile) => {
        return this.profileService.store(profile).pipe(
          map(({ data }) => fromProfileActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromProfileActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((profile: fromModels.Profile) => {
        return this.profileService.update(profile).pipe(
          map(({ data }) => fromProfileActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromProfileActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((profile: fromModels.Profile) => {
        return this.profileService.destroy(profile).pipe(
          map(({ data }) => fromProfileActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromProfileActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromProfileSelectors.getPerPage)),
        this.store.pipe(select(fromProfileSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchProfile]: [number, number, fromModels.SearchProfile]) => {
        return from(this.profileService.pagination({ ...searchProfile, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromProfileActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromProfileActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromProfileActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchProfile: fromModels.SearchProfile) => {
        if (
          searchProfile.profile.profile_id === '' &&
          searchProfile.profile.profile_name === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromProfileActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.profileService.load({ ...searchProfile, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromProfileActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromProfileActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store<fromProfileReducers.State>
  ) { }
}
