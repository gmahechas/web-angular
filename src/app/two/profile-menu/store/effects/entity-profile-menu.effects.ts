import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from '@app/app/two/profile-menu/store/actions';

import * as fromModels from '@app/app/two/profile-menu/models';

import { ProfileMenuService } from '@app/app/two/profile-menu/services/profile-menu.service';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class EntityProfileMenuEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload),
    switchMap(({ search }: { search: fromModels.SearchProfileMenu }) => {
      return this.profileMenuService.load(search).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((errors) => {
          return of(new fromActions.LoadFailEntity({ error: errors }));
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private profileMenuService: ProfileMenuService
  ) { }

}
