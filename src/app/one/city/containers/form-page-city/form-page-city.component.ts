import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { City } from './../../models/city.model';

@Component({
  selector: 'app-form-page-city',
  templateUrl: './form-page-city.component.html',
  styles: []
})
export class FormPageCityComponent implements OnInit {

  city$ = this.store.pipe(select(fromStore.getSelectedByRouter));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  onStore(city: City) {
    this.store.dispatch(new fromStore.StoreEntity(city));
  }

  onUpdate(city: City) {
    this.store.dispatch(new fromStore.UpdateEntity(city));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['city']
    }));
  }

  onDestroy(city: City) {
    this.store.dispatch(new fromStore.DestroyEntity(city));
  }
}
