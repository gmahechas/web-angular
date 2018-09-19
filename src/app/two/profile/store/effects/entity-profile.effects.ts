import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromReducers from './../reducers';
import * as fromSelectors from '../selectors';
import * as fromActions from '../actions';

import * as fromModels from './../../models';

import { ProfileService } from '../../services/profile.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityProfileEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getCurrentPage))
    ),
    switchMap(([searchProfile, perPage, currentPage]: [fromModels.SearchProfile, number, number]) => {
      perPage = (perPage) ? perPage : searchProfile.limit;
      currentPage = (currentPage) ? currentPage : searchProfile.page;
      return this.profileService.load({ ...searchProfile, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity(data)),
        catchError((errors) => {
          return of(new fromActions.LoadFailEntity(errors));
        })
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromActions.StoreEntity>(fromActions.EntityActionTypes.StoreEntity),
    map(action => action.payload),
    switchMap((profile: fromModels.Profile) => {
      return this.profileService.store(profile).pipe(
        map(({ data }) => new fromActions.StoreSuccessEntity(data)),
        catchError((errors) => of(new fromActions.StoreFailEntity(errors)))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromActions.UpdateEntity>(fromActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload),
    switchMap((profile: fromModels.Profile) => {
      return this.profileService.update(profile).pipe(
        map(({ data }) => new fromActions.UpdateSuccessEntity(data)),
        catchError((errors) => of(new fromActions.UpdateFailEntity(errors)))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromActions.DestroyEntity>(fromActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload),
    switchMap((profile: fromModels.Profile) => {
      return this.profileService.destroy(profile).pipe(
        map(({ data }) => new fromActions.DestroySuccessEntity(data)),
        catchError((errors) => of(new fromActions.DestroyFailEntity(errors)))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromActions.PaginateEntity>(fromActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchProfile]: [number, number, fromModels.SearchProfile]) => {
      return from(this.profileService.pagination({ ...searchProfile, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity(data)),
        catchError((errors) => of(new fromActions.LoadFailEntity(errors)))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromActions.LoadEntityShared>(fromActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload),
      switchMap((searchProfile: fromModels.SearchProfile) => {
        if (searchProfile === '') {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.profileService.load({ ...searchProfile, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromActions.LoadSuccessEntity(data)),
          catchError((errors) => {
            return of(new fromActions.LoadFailEntity(errors));
          })
        );

      })
    )

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store<fromReducers.State>
  ) { }
}
