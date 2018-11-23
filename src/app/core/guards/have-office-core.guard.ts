import { Injectable } from '@angular/core';
import { CanLoad, CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HaveOfficeCoreGuard implements CanLoad, CanActivate {

  constructor(
    private store: Store<fromCore.State>
  ) { }

  canLoad(): Observable<boolean> {
    return this.store.pipe(select(fromCore.getOffice),
      map(office => {
        if (office !== null) {
          this.store.dispatch(new fromCore.Go({ path: ['user-office', 'select'] }));
          return false;
        }
        return true;
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(fromCore.getOffice),
      map(office => {
        if (office !== null) {
          this.store.dispatch(new fromCore.Go({ path: ['user-office', 'select'] }));
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
