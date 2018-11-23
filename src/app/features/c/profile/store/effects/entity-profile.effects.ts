import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromProfileReducers from '@web/app/features/c/profile/store/reducers';
import * as fromProfileSelectors from '@web/app/features/c/profile/store/selectors';
import * as fromProfileActions from '@web/app/features/c/profile/store/actions';

import * as fromModels from '@web/app/features/c/profile/models';

import { ProfileService } from '@web/app/features/c/profile/services/profile.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityProfileEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromProfileActions.LoadEntity>(fromProfileActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromProfileSelectors.getPerPage)),
      this.store.pipe(select(fromProfileSelectors.getCurrentPage))
    ),
    switchMap(([searchProfile, perPage, currentPage]: [fromModels.SearchProfile, number, number]) => {
      perPage = (perPage) ? perPage : searchProfile.limit;
      currentPage = (currentPage) ? currentPage : searchProfile.page;
      return this.profileService.load({ ...searchProfile, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromProfileActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromProfileActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromProfileActions.StoreEntity>(fromProfileActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((profile: fromModels.Profile) => {
      return this.profileService.store(profile).pipe(
        map(({ data }) => new fromProfileActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromProfileActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromProfileActions.UpdateEntity>(fromProfileActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((profile: fromModels.Profile) => {
      return this.profileService.update(profile).pipe(
        map(({ data }) => new fromProfileActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromProfileActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromProfileActions.DestroyEntity>(fromProfileActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((profile: fromModels.Profile) => {
      return this.profileService.destroy(profile).pipe(
        map(({ data }) => new fromProfileActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromProfileActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromProfileActions.PaginateEntity>(fromProfileActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromProfileSelectors.getPerPage)),
      this.store.pipe(select(fromProfileSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchProfile]: [number, number, fromModels.SearchProfile]) => {
      return from(this.profileService.pagination({ ...searchProfile, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromProfileActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromProfileActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromProfileActions.LoadEntityShared>(fromProfileActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchProfile: fromModels.SearchProfile) => {
        if (
          searchProfile.profile.profile_id === '' &&
          searchProfile.profile.profile_name === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromProfileActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.profileService.load({ ...searchProfile, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromProfileActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromProfileActions.LoadFailEntity({ error })))
        );
      })
    )

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store<fromProfileReducers.State>
  ) { }
}
