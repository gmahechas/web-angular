import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/a/city/store';
import * as fromCore from '@web/app/core/store';

import { City } from '@web/app/features/a/city/models/city.model';

@Component({
  selector: 'app-form-page-city',
  templateUrl: './form-page-city.component.html',
  styles: []
})
export class FormPageCityComponent implements OnInit {

  pending$ = this.store.pipe(select(fromStore.getPending));
  city$ = this.store.pipe(select(fromStore.getSelectedByRouter));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  onStore(city: City) {
    this.store.dispatch(new fromStore.StoreEntity({ entity: city }));
  }

  onUpdate(city: City) {
    this.store.dispatch(new fromStore.UpdateEntity({ entity: city }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['city']
    }));
  }

  onDestroy(city: City) {
    this.store.dispatch(new fromStore.DestroyEntity({ entity: city }));
  }
}
